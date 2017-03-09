import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ClientTierAnalysisService } from '../services/';

@Injectable()
export class ClientTierResolver implements Resolve<any> {
    constructor(private analysisService: ClientTierAnalysisService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.analysisService.getParentValues(route.params['id']);
    
    }
}