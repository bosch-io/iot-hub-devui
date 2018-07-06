/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui.endpoints;

import com.bosch.iothub.developerui.config.DevUiProperties;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * An {@code HttpEndpoint} for querying data for the developer ui.
 */
@Component
@Profile("production")
public final class StaticFilesHttpEndpoint implements HttpEndpoint {

    private static final Logger LOG = LoggerFactory.getLogger(StaticFilesHttpEndpoint.class);

    @Autowired
    private DevUiProperties config;

    @Override
    public void addRoutes(final Router router) {
        StaticHandler staticHandler = StaticHandler.create();
        staticHandler.setDefaultContentEncoding("UTF-8");

        router.route(config.getHtmlRoot()).handler(staticHandler);
        router.route(config.getHtmlRoot() + "/*").handler(staticHandler);

        // Redirect push state urls (defined as containing not a dot as in /pic.jpg) to index page
        router.routeWithRegex(config.getHtmlRoot() + "/[^.]*").handler(this::fallbackServeIndexHtmlHandler);

        LOG.info("Serving developer ui at http://localhost:{}{}",config.getPort(), config.getHtmlRoot());
    }

    private void fallbackServeIndexHtmlHandler(RoutingContext event) {
        event.response().headers().add("Location", config.getHtmlRoot() + "/");
        event.response().setStatusCode(HttpResponseStatus.SEE_OTHER.code());
        event.response().end();
    }
}
