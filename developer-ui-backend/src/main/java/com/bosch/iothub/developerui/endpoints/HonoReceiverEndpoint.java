/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui.endpoints;

import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.bridge.BridgeEventType;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.PermittedOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;
import io.vertx.proton.ProtonClientOptions;
import io.vertx.proton.ProtonConnection;
import org.apache.qpid.proton.amqp.messaging.AmqpValue;
import org.apache.qpid.proton.amqp.messaging.Data;
import org.apache.qpid.proton.amqp.messaging.Section;
import org.apache.qpid.proton.message.Message;
import org.eclipse.hono.client.HonoClient;
import org.eclipse.hono.client.MessageConsumer;
import org.eclipse.hono.client.impl.HonoClientImpl;
import org.eclipse.hono.config.ClientConfigProperties;
import com.bosch.iothub.developerui.config.DevUiProperties;
import org.eclipse.hono.util.MessageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class HonoReceiverEndpoint implements HttpEndpoint {

    private static final Logger LOG = LoggerFactory.getLogger(HonoReceiverEndpoint.class);
    private static final int DEFAULT_CONNECT_TIMEOUT_MILLIS = 200;
    private static final String ENDPOINT_PATH = "/eventbus";

    @Autowired
    private DevUiProperties config;

    @Autowired()
    private ClientConfigProperties honoClientConfig;

    @Autowired
    protected Vertx vertx;

    protected HonoClient client;

    @PostConstruct
    protected void init() {
        LOG.info("Going to start connect to Hono...");

        this.client = new HonoClientImpl(vertx, honoClientConfig);

        Future<HonoClient> connectedResult = client.connect(getClientOptions(), this::onDisconnect);

        connectedResult.setHandler(connected -> {
            if (connected.succeeded()) {
                onConnectionEstablished();
            } else {
                LOG.error("Can't connect with Hono.", connected.cause());
            }
        });
    }

    private SockJSHandler eventBusHandler() {
        BridgeOptions options = new BridgeOptions()
                .addOutboundPermitted(new PermittedOptions().setAddressRegex("device\\..+"))
                .addOutboundPermitted(new PermittedOptions().setAddressRegex("status\\..+"));
        SockJSHandler sockHandler = SockJSHandler.create(vertx).bridge(options, event -> {
            event.complete(true);

            if (event.type() == BridgeEventType.SOCKET_CREATED) {
                LOG.info("A socket was created");
            } else if (event.type() == BridgeEventType.REGISTER) {
                LOG.debug("Eventbus registered");
                //Send update asynchronously due to https://github.com/vert-x3/vertx-web/issues/822
                vertx.setTimer(2_000, handler -> pushHonoConnectionStateChange());
            }
        });
        return sockHandler;
    }

    private void onConnectionEstablished() {
        LOG.info("Creating Telemetry Consumer for tenant: {}", config.getTenant());
        pushHonoConnectionStateChange();

        Future<MessageConsumer> telemetryConsumer = client.createTelemetryConsumer(config.getTenant(), msg -> handleMessage("telemetry", msg), closeHandler -> LOG.info("Telemetry consumer closed"));

        telemetryConsumer.setHandler(result -> {
            if (result.succeeded()) {
                LOG.info("Created Telemetry Consumer successfully");
            } else {
                LOG.error("Error while creating Telemetry Consumer", result.cause());
            }
        });

        LOG.info("Creating Event Consumer for tenant: {}", config.getTenant());
        Future<MessageConsumer> eventConsumer = client.createEventConsumer(config.getTenant(), msg -> handleMessage("event", msg), closeHandler -> LOG.info("Event consumer closed"));

        eventConsumer.setHandler(result -> {
            if (result.succeeded()) {
                LOG.info("Created Event Consumer successfully");
            } else {
                LOG.error("Error while creating Event Consumer", result.cause());
            }
        });
    }

    private void onDisconnect(final ProtonConnection con) {
        pushHonoConnectionStateChange();
        vertx.setTimer(DEFAULT_CONNECT_TIMEOUT_MILLIS, reconnect -> {
            LOG.info("attempting to re-connect to Hono ...");
            client.connect(getClientOptions(), this::onDisconnect);
        });
    }

    private void pushHonoConnectionStateChange() {
        Future<Void> isConnected = client.isConnected();
            isConnected.setHandler(connected -> {
                if (connected.succeeded()) {
                    vertx.eventBus().publish("status.hubConnection", "connected");
                } else {
                    vertx.eventBus().publish("status.hubConnection", "disconnected");
                }
                LOG.info("pushed status.hubConnection: {}", connected.succeeded());
            });
    }

    private void handleMessage(final String endpoint, final Message msg) {
        LOG.info("Handling message for endpoint: {}", endpoint);
        final String deviceId = MessageHelper.getDeviceId(msg);
        final Section body = msg.getBody();
        String content = null;
        if (body instanceof Data) {
            content = new String(((Data) msg.getBody()).getValue().getArray());
        } else if (body instanceof AmqpValue) {
            content = ((AmqpValue) msg.getBody()).getValue().toString();
        }
        JsonObject ebResponse = new JsonObject().put("type", endpoint).put("deviceId", deviceId)
                .put("contentType", msg.getContentType()).put("content", content);
        LOG.info("received {} message [device: {}, content-type: {}]: {}", endpoint, deviceId, msg.getContentType(),
                content);

        if (msg.getApplicationProperties() != null) {
            ebResponse.put("applicationProperties", msg.getApplicationProperties().getValue());
            LOG.info("... with application properties: {}", msg.getApplicationProperties().getValue());
        }

        vertx.eventBus().publish("device." + deviceId, ebResponse.toString());
    }

    protected final ProtonClientOptions getClientOptions() {
        return new ProtonClientOptions().setConnectTimeout(DEFAULT_CONNECT_TIMEOUT_MILLIS).setReconnectAttempts(-1);
    }

    @Override
    public void addRoutes(Router router) {
        router.route(config.getApiRoot() + ENDPOINT_PATH + "/*").handler(eventBusHandler());
    }
}
