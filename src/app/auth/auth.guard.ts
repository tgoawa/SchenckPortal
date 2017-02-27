import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Cookie } from 'ng2-cookies';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private router: Router) {}

    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        if (Cookie.check('user') === false) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
