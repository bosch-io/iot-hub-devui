/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui.servers;

import com.bosch.iothub.developerui.endpoints.HttpEndpoint;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.CorsHandler;

import com.bosch.iothub.developerui.config.DevUiProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class DevUiHttpServer {

    private static final Logger LOG = LoggerFactory.getLogger(DevUiHttpServer.class);

    @Autowired
    private DevUiProperties config;

    @Autowired
    private Set<HttpEndpoint> endpoints;

    @Autowired
    private Vertx vertx;

    @Value("${spring.profiles.active:}")
    private String profiles;

    private HttpServer server;

    @PostConstruct
    public void init() {
        LOG.info("Creating http server with {} endpoints. Listening on {}:{}",
                endpoints.size(), config.getBindAddress(), config.getPort());
        server = vertx.createHttpServer();

        Router router = Router.router(vertx);

        router.route()
        .handler(CorsHandler.create("*").allowedMethod(HttpMethod.GET).allowedMethod(HttpMethod.POST).allowedMethod(HttpMethod.PUT)
                .allowedMethod(HttpMethod.PATCH).allowedMethod(HttpMethod.OPTIONS).allowedMethod(HttpMethod.DELETE).allowedHeader("X-PINGARUNER")
                .allowedHeader("Content-Type"));
        
        for (HttpEndpoint current : endpoints) {
            current.addRoutes(router);
        }

        server.requestHandler(router::accept);
        server.listen(config.getPort(), config.getBindAddress());
    }

}
