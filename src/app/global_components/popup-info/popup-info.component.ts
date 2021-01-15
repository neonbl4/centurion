import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedEventsServices } from '../../services/sharedevents.service';
import { PopupInfo } from '../../modules/popupinfo.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.scss']
})

export class PopupInfoComponent implements OnInit {

  //button_close = environment.imageURL + '300x300_close_button_black.png';

  is_open = false;

  show_ok_button = true;
  show_cancel_button = true;

  headline = 'Information';
  text = 'Lorem Ipsum';

  callback: Function = null;

  popup_type = 'info_popup';

  button_ok_text = "OK";

  /*
   * constructor
   *
   * Quelle for Callback Binding:
   * https://stackoverflow.com/questions/35328652/angular2-pass-callback-function-to-child-component-as-input
   *
   */

  constructor(public router: Router, private sharedEvents: SharedEventsServices ) {

    this.sharedEvents.openPopupInfo.subscribe( value => {

      const popupInfo = <PopupInfo>value;
      this.is_open = popupInfo.open;
      this.headline = popupInfo.headline;
      this.text = popupInfo.text;
      this.button_ok_text = popupInfo.button_ok_text;
      this.popup_type = popupInfo.popup_type;
      // this.callback = PopupInfo.callback.bind(this); //Not used here to bind
      this.callback = popupInfo.callbackButtonOK;
      this.show_cancel_button = popupInfo.show_cancel_button;

    });

  }

  /*
   * ngOnInit
   */

  ngOnInit() {}

  /*
   * onClickClose
   */

  onClickClose() {
    this.is_open = false;
  }

  /*
   * onClickOK
   */

  onClickOK() {

    this.is_open = false;

    if (this.callback != null) {
      this.callback(null);
    }

  }



}
