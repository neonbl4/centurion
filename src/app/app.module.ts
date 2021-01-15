import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { TransferHttpCacheModule } from '@nguniversal/common';
import {UeberUnsComponent} from './pages/ueber-uns/ueber-uns.component';
import {ManagementComponent} from './pages/management/management.component';
import {VermietungComponent} from './pages/vermietung/vermietung.component';
import {InvestmentComponent} from './pages/investment/investment.component';
import {KontaktComponent} from './pages/kontakt/kontakt.component';
import {ImpressumComponent} from './pages/impressum/impressum.component';
import {DatenschutzComponent} from './pages/datenschutz/datenschutz.component';
import {HomeComponent} from './pages/home/home.component';
import { AnimationService } from './services/animation.service';
import {SharedEventsServices } from './services/sharedevents.service';
import {LocalstorageService} from './services/localstorage.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { PopupInfoComponent } from './global_components/popup-info/popup-info.component';
import { NewsletterAnmeldungComponent } from './global_components/newsletter-anmeldung/newsletter-anmeldung.component';
import { AgbsComponent } from './pages/agbs/agbs.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'ueber-uns',
    component: UeberUnsComponent
  },
  {
    path: 'management',
    component: ManagementComponent
  },
  {
    path: 'vermietung',
    component: VermietungComponent
  },
  {
    path: 'investment',
    component: InvestmentComponent
  },
  {
    path: 'kontakt',
    component: KontaktComponent
  },
  {
    path: 'impressum',
    component: ImpressumComponent
  },
  {
    path: 'datenschutz',
    component: DatenschutzComponent
  },
  {
    path: 'agbs',
    component: AgbsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UeberUnsComponent,
    ManagementComponent,
    VermietungComponent,
    InvestmentComponent,
    KontaktComponent,
    ImpressumComponent,
    DatenschutzComponent,
    PopupInfoComponent,
    NewsletterAnmeldungComponent,
    AgbsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes,
        {scrollPositionRestoration: 'enabled'}),
    HttpClientModule,
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    ScrollToModule.forRoot()
  ],
  providers: [AnimationService, SharedEventsServices, AuthGuard, AuthService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
