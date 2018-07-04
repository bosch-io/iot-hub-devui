/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui.endpoints;

import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.Router;
import com.bosch.iothub.developerui.config.DevUiProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * An {@code HttpEndpoint} for querying data for the developer ui.
 */
@Component
public final class RestApiEndpoint implements HttpEndpoint {
    private static final String ENDPOINT_PATH = "/api";

    @Autowired
    private DevUiProperties config;

    @Override
    public void addRoutes(final Router router) {
        router.get(config.getApiRoot() + ENDPOINT_PATH + "/tenant").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();
            response.putHeader("content-type", "text/plain");
            response.end(config.getTenant());
        });
    }
}
