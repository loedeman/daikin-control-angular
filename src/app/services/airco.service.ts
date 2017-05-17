import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { AircoStatus } from '../models/airco-status';

import { ConfigurationService } from './configuration.service';

@Injectable()
export class AircoService {
    // URLs
    private __apiUrl = '/api.php';

    private __headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private $http: Http, private __configurationService: ConfigurationService) { 
    }

    getStatus(): Promise<AircoStatus> {
        // TODO (micro) caching
        return this.$http.get(`this.__apiUrl?uri=/aircon/get_control_info`)
            .toPromise()
            .then(response => this.parseControlInfoResponse(response))
            .catch(this.handleError);
    }

    private parseControlInfoResponse(response: Response): AircoStatus {
        return {
            rawResponse: response.toString()
        };
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
