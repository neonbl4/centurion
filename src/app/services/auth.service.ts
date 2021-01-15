import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
// import { User } from '../modules/user.module';
import { SharedEventsServices } from './sharedevents.service';
import { Router } from '@angular/router';
import { environment }  from '../../environments/environment';

import * as CryptoJS from 'crypto-js';
import {PopupInfo} from '../modules/popupinfo.module';

const key = environment.encrypt_token;
const iv =  environment.encrypt_token;

@Injectable()
export class AuthService {

  LoggedUser;

  is_authenticated = false;
  // token = null;

  /*
   * constructor
   */

  constructor( private cacheFactory: LocalstorageService, private sharedEvents: SharedEventsServices, private router: Router) {

    if (this.cacheFactory.getItem('auth_user')) {
      this.is_authenticated = true;
    } else {
      this.is_authenticated = false;
    }

    console.log('this.is_authenticated= ', this.is_authenticated);

  }

  /*
   * logOut
   */

  logOut () {
      const popupInfo = new PopupInfo(true, 'LOGOUT', 'Wollen Sie sich ausloggen?', 'info_popup', true);
      popupInfo.callbackButtonOK = (callBackValue => {
          this.is_authenticated = false;
          this.LoggedUser = null;

          this.sharedEvents.onSuccesLogout.emit(null);

          this.cacheFactory.removeItem('event_booking_session');
          this.cacheFactory.removeItem('auth_user');

          this.router.navigate(['/']);

      });

      this.sharedEvents.openPopupInfo.emit(popupInfo);

      return;
  }

  /*
   * logIn
   */

  logIn ( UserObject: any ) {
    this.is_authenticated = true;
    this.LoggedUser = UserObject;

    this.cacheFactory.setItem( 'auth_user', JSON.stringify(UserObject) );

    const decrypt_object = this.decryptUsingAES256(UserObject.sessionToken);
    //console.log("decrypt_object=", JSON.parse(decrypt_object));
    this.sharedEvents.onSuccesLogin.emit(JSON.parse(decrypt_object));

      setTimeout(()=> {
          this.router.navigate(['/account']);
      }, 100);
  }

  /*
 * encryptUsingAES256
 */
  encryptUsingAES256( object: any ) {
    let _key = CryptoJS.enc.Utf8.parse(key);
    let _iv = CryptoJS.enc.Utf8.parse(iv);
    let encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(object), _key, {
          keySize: 16,
          iv: _iv,
          mode: CryptoJS.mode.CTR,
          padding: CryptoJS.pad.Pkcs7
        });
    const encrypted_result = encrypted.toString();
    //console.log('encrypted result= ', encrypted_result);
    return encrypted_result;
  }

  /*
   * decryptUsingAES256
   */
  decryptUsingAES256( object: any ) {
    let _key = CryptoJS.enc.Utf8.parse(key);
    let _iv = CryptoJS.enc.Utf8.parse(iv);

    let decrypted = CryptoJS.AES.decrypt(
        object, _key, {
          keySize: 16,
          iv: _iv,
          mode: CryptoJS.mode.CTR,
          padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);

    const decrypted_result = decrypted.toString();
    //console.log('decrypted_result result= ', decrypted_result);
    return decrypted_result;
  }


  /*
  isAuthenticated() {

    //return this.is_authenticated;
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 0);
    });

    return promise;

  }
  */

}

