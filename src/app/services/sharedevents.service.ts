import { EventEmitter} from '@angular/core';
import { PopupInfo } from '../modules/popupinfo.module';

export class SharedEventsServices {
    public openPopupInfo: EventEmitter<PopupInfo> = new EventEmitter<PopupInfo>();
    public onSuccesLogin: EventEmitter<any> = new EventEmitter<any>();
    public onSuccesLogout: EventEmitter<any> = new EventEmitter<any>();
}

