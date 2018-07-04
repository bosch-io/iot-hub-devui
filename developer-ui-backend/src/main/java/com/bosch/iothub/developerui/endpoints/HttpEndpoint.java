/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui.endpoints;

import io.vertx.ext.web.Router;

public interface HttpEndpoint {
    void addRoutes(Router var1);
}
