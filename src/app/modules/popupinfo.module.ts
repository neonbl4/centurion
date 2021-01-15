export class PopupInfo {

  public open: boolean;
  public headline: string;
  public text: string;
  public button_ok_text: string;
  public popup_type: string;
  public callbackButtonOK: Function;
  public show_cancel_button: boolean;

  constructor( open: boolean, headline: string, text: string, popup_type: string = 'info_popup', show_cancel_button: boolean = true, button_ok_text: string = "OK" ) {
    this.open = open;
    this.headline = headline;
    this.text = text;
    this.button_ok_text = button_ok_text;
    this.popup_type = popup_type;
    this.show_cancel_button = show_cancel_button;
  }
}
