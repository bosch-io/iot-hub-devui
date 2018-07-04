/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
package com.bosch.iothub.developerui.config;

public class DevUiProperties {

    private String tenant;
    private int port;
    private String bindAddress;
    private String htmlRoot;
    private String apiRoot;

    public String getTenant() {
        return tenant;
    }

    public void setTenant(String tenant) {
        this.tenant = tenant;
    }

    public String getBindAddress() {
        return bindAddress;
    }

    public void setBindAddress(String bindAddress) {
        this.bindAddress = bindAddress;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getHtmlRoot() {
        return htmlRoot;
    }

    public void setHtmlRoot(String htmlRoot) {
        this.htmlRoot = htmlRoot;
    }

    public String getApiRoot() {
        return apiRoot;
    }

    public void setApiRoot(String apiRoot) {
        this.apiRoot = apiRoot;
    }
}
