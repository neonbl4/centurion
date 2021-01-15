import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable} from '@angular/core';
import { AuthService } from './auth.service';
import { LocalstorageService } from './localstorage.service';
import { SharedEventsServices } from './sharedevents.service';

@Injectable()
export class AuthGuard implements CanActivate {

  /*
   * constructor
   * http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
   */

  constructor( private authService: AuthService, private router: Router,  private cacheFactory: LocalstorageService,
               private sharedEvents: SharedEventsServices ) {}

  /*
   * canActivate
   */

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //just for test
    return this.authService.is_authenticated;

    if (this.cacheFactory.getItem('auth_user')) {
      this.authService.is_authenticated = true;

      /*
      let cacheObject =  this.cacheFactory.getObjectFromStorage('sessionStorage', 'auth_user');
      console.log("cacheObject=", cacheObject);
      const decrypt_object = this.authService.decryptUsingAES256(cacheObject['sessionToken']);
      console.log("decrypt_object=", JSON.parse(decrypt_object));
      this.sharedEvents.onSuccesLogin.emit(JSON.parse(decrypt_object));

       */

    } else {
      this.authService.is_authenticated = false;
      this.router.navigate(['/']);
    }

    return this.authService.is_authenticated;


    /*
    return this.authService.isAuthenticated()
      .then(
      (authenticated : boolean) => {

        if(authenticated) {
          return true;

        } else {
          this.router.navigate(['/']);
        }

      }
    );
    */

  }
}
