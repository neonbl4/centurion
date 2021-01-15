import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SharedEventsServices} from './sharedevents.service';
import {PopupInfo} from '../modules/popupinfo.module';
import {environment} from '../../environments/environment';

@Injectable()
export class HttpService {

  private apiUrl = environment.api_url;

  /*
   * constructor
   */
  constructor(private http: HttpClient, private sharedEvents: SharedEventsServices) {}

    /*
     * postRequest
     */
    /*
    postRequest( requestData: any, callback: Function = null ) {

        this.http.post(`${this.apiUrl}/requests.php`, JSON.stringify(requestData))
        .subscribe(data => {
                console.log('data= ', data);
                // console.log('data stringify= ',JSON.stringify(data));
                if (callback !== null) {
                    callback(data);
                }
            },
            error => {
                console.log('error= ', error);
            },
            () => {
                console.log('completed');

            });
    }

     */

    /*
     * PostAuthRequest with Authorization Header
     */
    PostAuthRequest( requestData: any, api_file_name: string, callback: Function = null ) {

        let token = '';

        const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        const url = environment.api_url + "/" + api_file_name + '.php';

        this.http.post(url,  requestData, { headers: header }).subscribe(data => {
                console.log('data= ', data);
                //console.log('data stringify= ', JSON.stringify(data));

                if (data['db_message'] === 'NON_AUTHORIZATION_REQUEST') {

                    const popupInfo = new PopupInfo(true, 'AUTHORIZATION', 'Sie sind nicht berechtigt diese Anfrage zu stellen.','info_popup', false);
                    popupInfo.callbackButtonOK = ( callBackValue => {
                    });
                    this.sharedEvents.openPopupInfo.emit(popupInfo);

                    return;
                }

                if (data === null) {

                    const popupInfo = new PopupInfo(true, 'FEHLER', 'Ups, entschuldigen Sie, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal.', 'info_popup', false);
                    popupInfo.callbackButtonOK = ( callBackValue => {

                    });

                    this.sharedEvents.openPopupInfo.emit(popupInfo);

                    return;
                }

                if (data !== null && data['db_message'] === 'ERROR_SQL') {

                    const popupInfo = new PopupInfo(true, 'FEHLER', 'Ups, entschuldigen Sie, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal.','info_popup', false);
                    popupInfo.callbackButtonOK = ( callBackValue => {

                    });

                    this.sharedEvents.openPopupInfo.emit(popupInfo);

                    return;
                }

                if (callback !== null) {
                    callback(data);
                }

            },
            error => {
                console.log('error= ', error);
                const popupInfo = new PopupInfo(true, 'FEHLER', 'Ups, entschuldigen Sie, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal.','info_popup', false);
                popupInfo.callbackButtonOK = ( callBackValue => {

                });
                this.sharedEvents.openPopupInfo.emit(popupInfo);
            },
            () => {
                console.log('completed');
            }
        );
    }

}



