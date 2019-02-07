/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui.endpoints;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bosch.iothub.developerui.Application;
import com.bosch.iothub.developerui.config.DevUiProperties;

import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

/**
 * An {@code HttpEndpoint} for querying data for the developer ui.
 */
@Component
public final class RestApiEndpoint implements HttpEndpoint {
	private static final Logger LOG = LoggerFactory.getLogger(RestApiEndpoint.class);
	private static final String ENDPOINT_PATH = "/api";

	@Autowired
	private DevUiProperties config;
	
	@Autowired
	private HonoReceiverEndpoint honoReceiverEndpoint;

	@Override
	public void addRoutes(final Router router) {
		router.get(config.getApiRoot() + ENDPOINT_PATH + "/tenant").handler(this::handleGetTenantId);
		router.get(config.getApiRoot() + ENDPOINT_PATH + "/connect").handler(this::handleConnectHonoClient);
		router.get(config.getApiRoot() + ENDPOINT_PATH + "/disconnect").handler(this::handleDisconnectHonoClient);
	}

	private void handleGetTenantId(RoutingContext routingContext) {
		LOG.debug("Returning tenant id: {}", config.getTenant());
		HttpServerResponse response = routingContext.response();
		response.putHeader("content-type", "text/plain");
		response.end(config.getTenant());
	}

	private void handleConnectHonoClient(RoutingContext routingContext) {
		LOG.info("Connect hono client");
		honoReceiverEndpoint.connect();
		routingContext.response().setStatusCode(200);
		routingContext.response().end();
	}

	private void handleDisconnectHonoClient(RoutingContext routingContext) {
		LOG.info("Disconnect hono client");
		honoReceiverEndpoint.disconnect();
		routingContext.response().setStatusCode(200);
		routingContext.response().end();
	}

}
