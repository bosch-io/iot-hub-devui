/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

/**
 * A Spring Boot application exposing an AMQP based endpoint that implements Hono's device registry.
 * <p>
 * The application implements Hono's <a href="https://www.eclipse.org/hono/api/Device-Registration-API/">Device
 * Registration API</a> and <a href="https://www.eclipse.org/hono/api/Credentials-API/">Credentials API</a>.
 * </p>
 */
@ComponentScan(basePackages = {"com.bosch.iothub.developerui"})
@Configuration
@EnableAutoConfiguration
public class Application  {

    private static final Logger LOG = LoggerFactory.getLogger(Application.class);

    /**
     * Starts the Developer UI Server.
     *
     * @param args command line arguments to pass to the server.
     */
    public static void main(final String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @PostConstruct
    public void init() {
        LOG.info("Launching developer UI complete!");
    }
}
