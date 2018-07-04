/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui;

import org.eclipse.hono.config.ClientConfigProperties;
import com.bosch.iothub.developerui.config.DevUiProperties;
import com.bosch.iothub.developerui.config.DeviceRegistryClientProperties;
import org.eclipse.hono.util.Constants;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;

/**
 * Spring Boot configuration for the Device Registry application.
 *
 */
@Configuration
public class ApplicationConfig {

    /**
     * Exposes a Vert.x instance as a Spring bean.
     * 
     * @return The Vert.x instance.
     */
    @Bean
    public Vertx vertx() {
        final VertxOptions options = new VertxOptions();
        return Vertx.vertx(options);
    }

    /**
     * Gets properties for configuring the HTTP Server of the hub example application endpoint.
     * 
     * @return The properties.
     */
    @Qualifier(Constants.QUALIFIER_REST)
    @Bean
    @ConfigurationProperties(prefix = "devui")
    public DevUiProperties restProperties() {
        return new DevUiProperties();
    }

    /**
     * Exposes a hono client configuration properties.
     * 
     * @return The properties.
     */
    @ConfigurationProperties(prefix = "hub.client")
    @Bean
    public ClientConfigProperties honoClientConfig() {
        return new ClientConfigProperties();
    }

    /**
     * Exposes a hono client configuration properties.
     *
     * @return The properties.
     */
    @ConfigurationProperties(prefix = "hub.deviceregistry")
    @Bean
    public DeviceRegistryClientProperties deviceRegistryConfig() {
        return new DeviceRegistryClientProperties();
    }
}
