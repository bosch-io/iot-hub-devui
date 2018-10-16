/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui.endpoints;

import com.bosch.iothub.developerui.config.DevUiProperties;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.net.ProxyOptions;
import io.vertx.core.net.ProxyType;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.client.HttpRequest;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;
import com.bosch.iothub.developerui.config.DeviceRegistryClientProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.util.Base64;

/**
 * An {@code HttpEndpoint} which will proxy requests to the Hub UI.
 */
@Component
public final class ApiProxyEndpoint implements HttpEndpoint {
    private static final Logger LOG = LoggerFactory.getLogger(ApiProxyEndpoint.class);
    private static final String ENDPOINT_PATH = "/api";

    @Autowired
    private Vertx vertx;

    @Autowired
    private DevUiProperties config;

    @Autowired
    private DeviceRegistryClientProperties deviceRegistryConfig;

    private WebClient client;

    @PostConstruct
    private void init() {
        WebClientOptions options = new WebClientOptions();

        ProxyOptions proxyOptions = getProxyOptions();
        if(proxyOptions != null) {
            options.setProxyOptions(proxyOptions);
            options.setVerifyHost(deviceRegistryConfig.isHostnameVerificationRequired());
        }
        client = WebClient.create(vertx, options);
    }

    @Override
    public void addRoutes(final Router router) {
        router.route(config.getApiRoot() + ENDPOINT_PATH + "/registration/*").handler(this::proxyForwardRequestToApi);
        router.route(config.getApiRoot() + ENDPOINT_PATH + "/credentials/*").handler(this::proxyForwardRequestToApi);
    }

    private void proxyForwardRequestToApi(RoutingContext routingContext) {
        HttpMethod requestMethod = routingContext.request().method();
        String requestPath = routingContext.request().uri().replace(config.getApiRoot() + ENDPOINT_PATH, "");

        String absoluteApiRequestPath = deviceRegistryConfig.getUrl() + requestPath;
        LOG.info("Forwarding {} request to Hub: {} with Body {}", requestMethod, absoluteApiRequestPath, routingContext.request());

        HttpRequest<Buffer> request = client.requestAbs(requestMethod, absoluteApiRequestPath);

        String basicAuthValue = "Basic " + Base64.getEncoder().encodeToString((deviceRegistryConfig.getUsername() + ":" +
                deviceRegistryConfig.getPassword()).getBytes());
        request.putHeader(HttpHeaders.AUTHORIZATION.toString(), basicAuthValue);

        routingContext.request().bodyHandler(buffer -> mapRequestAndResponse(routingContext, buffer, request));
    }

    private void mapRequestAndResponse(RoutingContext context, Buffer requestBody, HttpRequest<Buffer> remoteRequest) {
        remoteRequest.queryParams().clear();
        remoteRequest.queryParams().addAll(context.request().params());

        remoteRequest.headers().add(HttpHeaders.CONTENT_TYPE, "application/json");

        remoteRequest.sendBuffer(requestBody, proxyResponse -> {
            if (proxyResponse.succeeded()) {
                LOG.info("Request succeeded. Received {} from api.",
                        proxyResponse.result().statusCode());

                context.response().setStatusCode(proxyResponse.result().statusCode());
                context.response().headers().addAll(proxyResponse.result().headers());

                if (proxyResponse.result().body() != null) {
                    context.response().write(proxyResponse.result().body());
                }

                context.response().end();
            } else {
                context.response().setStatusCode(HttpResponseStatus.INTERNAL_SERVER_ERROR.code());
                LOG.error("Failed to forward response", proxyResponse.cause());
                context.response().end();
            }
        });
    }

    private ProxyOptions getProxyOptions() {
        String proxyHost = System.getProperty("https.proxyHost");
        String proxyPort = System.getProperty("https.proxyPort");
        String proxyUser = System.getProperty("https.proxyUser");
        String proxyPassword = System.getProperty("https.proxyPassword");

        ProxyOptions proxyOpts = new ProxyOptions();
        proxyOpts.setType(ProxyType.HTTP);

        if (!StringUtils.isEmpty(proxyPort)) {
            proxyOpts.setPort(Integer.valueOf(proxyPort));
        }

        if (!StringUtils.isEmpty(proxyHost)) {
            proxyOpts.setUsername(proxyUser);
        }

        if (!StringUtils.isEmpty(proxyPassword)) {
            proxyOpts.setPassword(proxyPassword);
        }

        if (!StringUtils.isEmpty(proxyHost)) {
            proxyOpts.setHost(proxyHost);
            LOG.debug("HTTP Proxy configuration: host={},port={},user={},pwd is configured={}",
                    proxyHost,
                    proxyPort,
                    proxyUser,
                    proxyPassword != null);

            return proxyOpts;
        }
        return null;
    }
}
