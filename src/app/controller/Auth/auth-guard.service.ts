import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = this.authenticationService.isAuth;
    if (isAuth) {
      // logged in so return true
      console.log(this.authenticationService.AuthenticatedUser)
      return true;
    }

    // not logged in so redirect to login page with the return url
    Swal.fire({
      position: 'top-end',
      padding:'0.6rem',
      html:"<span style='color: white; font-weight: bold'> &nbsp;Veuillez vous connecter</span>",
      toast:true,
      type: "error",
      background:"#343a40",
      customContainerClass:"loginSwal",
      customClass:"cModal",

      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate([''], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
