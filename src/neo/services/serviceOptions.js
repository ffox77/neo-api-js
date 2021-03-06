import { getProtocolClient } from '../registry.js';

export function serviceOptions(service, serviceName, initObj) {

    if (typeof initObj === 'string') {
        initObj = { baseUrl: initObj };
    }
    else if (typeof initObj !== 'object') {
        initObj = {};
    }

    service.stopPolling = false;
    service.serviceLatency = 0;
    service.serviceLatencyStartTime = 0;
    service.serviceLastConnectedTime = Date.now();
    service.serviceName = serviceName;
    service.serviceBaseUrl = initObj.baseUrl || '';
    service.servicePollInterval = initObj.poll;
    service.serviceMonitorLatency = initObj.monitorLatency;

    service.baseUrl = baseUrl;
    service.protocolClient = protocolClient;
    service.poll = poll;
    service.monitorLatency = monitorLatency;
    service.startLatencyTimer = startLatencyTimer;
    service.stopLatencyTimer = stopLatencyTimer;
    service.latency = latency;
    service.lastConnectedTime = lastConnectedTime;


    function startLatencyTimer () {
        service.serviceLatencyStartTime = Date.now();
    }

    function stopLatencyTimer (hasError) {

        if (hasError) {
            service.serviceLatency = 0;
        }
        else {
            service.serviceLastConnectedTime = Date.now();
            service.serviceLatency = service.serviceLastConnectedTime - service.serviceLatencyStartTime;
        }
    }

    function baseUrl (val) {

        if (!val) {
            return this.serviceBaseUrl;
        }

        this.serviceBaseUrl = val;

        return this;
    }

    function protocolClient (val) {

        if (!val) {
            return this.serviceProtocolClient || getProtocolClient();
        }

        this.serviceProtocolClient = val;

        return this;
    }

    function poll (val) {

        if (!val) {
            return this.servicePollInterval;
        }

        this.servicePollInterval = val;

        return this;
    }

    function monitorLatency (val) {

        if (!val) {
            return this.serviceMonitorLatency;
        }

        this.serviceMonitorLatency = val;

        return this;
    }

    function latency (val) {

        if (!val) {
            return this.serviceLatency;
        }

        //read-only
        //this.serviceLatency = val;

        return this;
    }

    function lastConnectedTime (val) {

        if (!val) {
            return this.serviceLastConnectedTime;
        }

        //read-only
        //this.serviceLastConnectedTime = val;

        return this;
    }
}