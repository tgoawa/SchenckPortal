import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private router: Router) {}

    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        let user = localStorage.getItem('user');
        if (user === null) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
