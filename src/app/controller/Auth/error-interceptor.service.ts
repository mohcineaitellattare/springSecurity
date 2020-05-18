import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  private authenticationService: AuthenticationService;

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.clear();
        location.reload(true);
      } else if(err.status === 403) {
        Swal.fire({
          position: 'top-end',
          padding:'0.6rem',
          html:"<span style='color: white; font-weight: bold'> &nbsp;Informations incorrectes</span>",
          toast:true,
          backdrop:false,
          type: "info",
          background:"#343a40",
          customContainerClass:"loginSwal",
          customClass:"cModal",

          showConfirmButton: false,
          timer: 1500
        })
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
