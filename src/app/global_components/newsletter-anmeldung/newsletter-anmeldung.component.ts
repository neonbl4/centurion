import { Component, OnInit } from '@angular/core';
import { SharedEventsServices } from '../../services/sharedevents.service';
import { PopupInfo } from '../../modules/popupinfo.module';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-newsletter-anmeldung',
  templateUrl: './newsletter-anmeldung.component.html',
  styleUrls: ['./newsletter-anmeldung.component.scss']
})
export class NewsletterAnmeldungComponent implements OnInit {

  accept = true;

  checkForm = true;

  firstname;
  lastname;
  email;

  constructor(private sharedEvents: SharedEventsServices, private httpService: HttpService) {

  }

  ngOnInit() {
  }

  /*
   * onClickCheckbox
   */
  onClickCheckbox( event: any ) {
    console.log( event.target.checked );

    this.accept = event.target.checked;
  }

  /*
   * onClickSend
   */
  onClickSend() {
    console.log( "onClickSend" );

    this.firstname = <HTMLInputElement>document.getElementById('firstname');
    this.lastname = <HTMLInputElement>document.getElementById('lastname');
    this.email = <HTMLInputElement>document.getElementById('email');

    if (this.checkForm) {
      let error_message = '';
      let field = null;

      let go = true;

      if (this.firstname.value === '') {
        error_message = 'Bitte geben Sie Ihren Vornamen ein.';
        field = this.firstname;
        go = false;
      } else if (this.lastname.value === '') {
        error_message = 'Bitte geben Sie Ihren Nachnamen ein.';
        field = this.lastname;
        go = false;
      } else if (this.email.value === '') {
          error_message = 'Bitte geben Sie eine E-mail Adresse ein.';
          field = this.email;
          go = false;
      } else if (!this.checkValidEmail(this.email.value)) {
        error_message = 'Bitte geben Sie eine gültige E-mail Adresse ein.';
        field = this.email;
        go = false;
      } else if (!this.accept) {
        error_message = 'Bitte akzeptieren Sie, das wir Sie kontaktieren dürfen.';
        go = false;
      }

      if (go === false) {

        const popupInfo = new PopupInfo(true, 'INFORMATION', error_message, 'info_popup', false);
        popupInfo.callbackButtonOK = (callBackValue => {
          if (field) {
            field.focus();
          }

        });

        this.sharedEvents.openPopupInfo.emit(popupInfo);

        return;
      }
    }

    const requestObject = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      user_email: this.email.value
    };

    const callBack = (result => {
      console.log('result= ', result);

      if (result['db_message'] === 'SUCCESS_SAVE_USERDATA_AND_SEND_MAIL') {

        const popupInfo = new PopupInfo(true, 'INFORMATION', 'Sie wurden erfolgreich in unser System eingetragen.', 'info_popup', false);
        popupInfo.callbackButtonOK = (callBackValue => {
          this.firstname.value = '';
          this.lastname.value = '';
          this.email.value = '';

          window.scroll(0,0);

        });

        this.sharedEvents.openPopupInfo.emit(popupInfo);
      }

      if (result['db_message'] === 'USER_EMAIL_EXISTS') {

        const popupInfo = new PopupInfo(true, 'INFORMATION', 'Diese Email Adresse existiert schon in unserem System.', 'info_popup', false);
        popupInfo.callbackButtonOK = (callBackValue => {
          this.email.value = '';
          this.email.focus();
        });

        this.sharedEvents.openPopupInfo.emit(popupInfo);
      }

    });

    if (environment.production) {
      this.httpService.PostAuthRequest(requestObject, 'mail/centurion/sendNewsletterRequest', callBack );
    } else {
      this.httpService.PostAuthRequest(requestObject, 'mail/centurion/sendNewsletterRequest_local', callBack );
    }

  }

  /*
   * checkValidEmail
   */
  checkValidEmail( mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }

    return false;
  }
}
