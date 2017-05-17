import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { AircoStatus } from '../models/airco-status';

import { ConfigurationService } from './configuration.service';

@Injectable()
export class AircoService {
    private __headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private $http: Http, private __configurationService: ConfigurationService) {
    }

    getStatus(): Promise<AircoStatus> {
        // TODO (micro) caching
        return this.$http.get(`${this.__configurationService.apiUrl}?ip=${this.__configurationService.aircoIpAddress}&uri=/aircon/get_control_info`)
            .toPromise()
            .then(response => this.parseControlInfoResponse(response))
            .catch(this.handleError);
    }

    setStatus(status: AircoStatus): Promise<AircoStatus> {
        // TODO (micro) caching
        return this.$http.post(`${this.__configurationService.apiUrl}?ip=${this.__configurationService.aircoIpAddress}`, status)
            .toPromise()
            .then(response => this.parseControlInfoResponse(response))
            .catch(this.handleError);
    }

    private parseControlInfoResponse(response: Response): AircoStatus {
        var responseJson = response.json();
        console.log(responseJson);

        return {
            power: parseInt(responseJson.pow),
            humidity: parseInt(responseJson.shum),
            mode: responseJson.mode,
            targetTemperature: parseFloat(responseJson.stemp),
            fanRate: responseJson.f_rate,
            fanDirection: responseJson.f_dir,

            rawResponse: response.json()
        };
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
