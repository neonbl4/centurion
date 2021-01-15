import {Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, HostListener, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
//import {isPlatformBrowser} from '@angular/common';
//import {BehaviorSubject} from 'rxjs';
import { Title } from '@angular/platform-browser';
import {trigger, state, transition, animate, style, animateChild, query } from '@angular/animations';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import {LocalstorageService} from './services/localstorage.service';

import * as $ from 'jquery';

// declare google analytics
//declare const ga: any;

//ANIMATIONS
//https://indepth.dev/in-depth-guide-into-animations-in-angular/#animating-children-elements

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('cookie-ani', [
            state('true', style({ opacity: 1, transform: `translateY(${0}px)` })),
            state('false', style({ opacity: 0, transform: `translateY(${100}%)` })),
            transition('false <=> true', animate('0.8s ease-in-out'))
        ]),
        trigger('header_y_ani', [
            state('true', style({ opacity: 1, transform: `translateY(${-46}px)` })),
            state('false', style({ opacity: 1, transform: `translateY(${0}px)` })),
            transition('false <=> true', animate('0.2s ease-in-out'))
        ]),
        trigger('logo_ani', [
            state('true', style({ opacity: 1, transform: `scale(0.7) translateY(${26}px)` })),
            state('false', style({ opacity: 1, transform: `scale(1.0)` })),
            transition('false <=> true', animate('0.1s ease-in'))
        ]),
        trigger('header_text_left_ani', [
            state('true', style({ opacity: 1, transform: `translateY(${32}px)` })),
            state('false', style({ opacity: 1, transform: `translateY(${0}px)` })),
            transition('false <=> true', animate('0.1s ease-in'))
        ]),
        trigger('header_icons_right_ani', [
            state('true', style({ opacity: 1, transform: `translateY(${40}px)` })),
            state('false', style({ opacity: 1, transform: `translateY(${0}px)` })),
            transition('false <=> true', animate('0.1s ease-in'))
        ]),
        trigger('header_ani_package', [
            transition('false <=> true', [
                query('@*', animateChild()),
            ]),
        ])
    ]
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    //static isBrowser = new BehaviorSubject<boolean>(null);
    //isBrowser;

    button_top;

    animate_header = false;

    cookie_ani = false;

    switch2mobileWidth = 900;

    /*
    * constructor
    */
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private router: Router, private route: ActivatedRoute,
                private titleService: Title,
                private _scrollToService: ScrollToService,
                private cacheFactory: LocalstorageService) {

        //this.isBrowser = isPlatformBrowser(platformId);
        //console.log('this.isBrowser= ', this.isBrowser);

        //AppComponent.isBrowser.next(isPlatformBrowser(platformId));
        //console.log("platformId= ", isPlatformBrowser(platformId));

        this.router.events.subscribe(event => {
            if ( event instanceof NavigationEnd) {
                const routePath = this.router.url.split('?')[0];
                console.log('---routePath----= ', routePath);
                this.updateMetaTags( routePath );
            }
        });

        this.cookie_ani = false;

    }

    /*
     * HostListener
     */
    @HostListener('window:resize', ['$event'])
    onResize() {

        //console.log('I am resized', event);

        const mobile_menu = document.getElementById('mobile-menu');
        if (mobile_menu !== null) {
            this.closeMobileMenu();
        }

        const window_width = window.innerWidth;
        //console.log('window_width', window_width);

        if (window_width < this.switch2mobileWidth) {
            this.animate_header = false;
        }
    }

    /*
     * HostListener
     */
    lastScroll = 0;

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        //console.log('I am scrolled', event);
        //const scrollY = event['path'][1].scrollY;
        var scrollY = window.scrollY;
        const window_width = window.innerWidth;
        //console.log('scrollY', scrollY);

        if (scrollY > 200 && window_width > this.switch2mobileWidth) {
            this.animate_header = true;
        } else if (scrollY < 200 && window_width > this.switch2mobileWidth) {
            this.animate_header = false;
        }

        //logo footer ani
        const logo_footer_pos = this.getPositionOfElement('#logo-footer');
        if (scrollY > logo_footer_pos) {
            $('#logo-footer').addClass('blur-animation');
        } else {
            $('#logo-footer').removeClass('blur-animation');
        }


        let currentScroll = $(window).scrollTop();
        if (currentScroll > 0 && this.lastScroll <= currentScroll){
            this.lastScroll = currentScroll;
            if (this.lastScroll > 100) {
                this.button_top.style.display= "flex";
            }
        }else{
            this.lastScroll = currentScroll;
            if (this.lastScroll < 100) {
                this.button_top.style.display= "none";
            }
        }


    }



    /*
     * getPositionOfElement
     */
    getPositionOfElement( elementID: string ) {
        const el_ypos = $(elementID).offset().top -800;
        return el_ypos;
    }

   /*
    * ngOnInit
    */
    ngOnInit() {

        const cookie =  this.cacheFactory.getItem( 'centurion_cookie_accepted');
        console.log("cookie=", cookie);

        if (cookie == null) {
            this.cacheFactory.setItem( 'centurion_cookie_accepted', 'no');
            setTimeout(()=> {
                this.cookie_ani = true;
            }, 1000);
        } else if (cookie === "no") {
            setTimeout(()=> {
                this.cookie_ani = true;
            }, 1000);
        } else if (cookie === "yes") {
            setTimeout(()=> {
                this.cookie_ani = false;
            }, 1000);
        }


    }

    ngOnDestroy() {}

   /*
    * clickHamburger
    */
    clickHamburger() {
        if (document.getElementById('hamburger').classList.contains('is-active')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    /*
     * openMobileMenu
     */
    openMobileMenu() {
        document.getElementById('hamburger').classList.add('is-active');

        //underlayer
        document.getElementById('underlayer').classList.add('show-underlay');
        document.getElementById('underlayer').classList.remove('hide-underlay');

        //menu
        document.getElementById('mobile-menu').classList.add('is-open');
        document.getElementById('mobile-menu').classList.remove('is-closed');
    }

    /*
     * closeMobileMenu
     */
    closeMobileMenu() {
        document.getElementById('hamburger').classList.remove('is-active');

        document.getElementById('underlayer').classList.remove('show-underlay');
        document.getElementById('underlayer').classList.add('hide-underlay');

        //menu
        document.getElementById('mobile-menu').classList.remove('is-open');
        document.getElementById('mobile-menu').classList.add('is-closed');
    }

    /*
     * clickMobileMenuNavItem
     */
    clickMobileMenuNavItem( route: string ) {
        this.router.navigate([route]);

        this.closeMobileMenu();

    }

    /*
     * clickEmail
     */
    clickEmail () {
        location.href = "mailto:einhornmovie@icloud.com";
    }

    /*
     * clickTel ()
     */
    clickTel() {
        location.href = "tel:02173265037";
    }

    /*
     * For later to embed google Analytics
     */
    ngAfterViewInit(): void {

        if (document.getElementById('button-top')) {
            this.button_top = document.getElementById('button-top');
            this.button_top.style.display= "none";
        }

        /*
        this.router.events.subscribe(event => {
            // I check for isPlatformBrowser here because I'm using Angular Universal, you may not need it
            if (event instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
                console.log(ga); // Just to make sure it's actually the ga function
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
        */
    }

    /*
     * updateMetaTags
     */
    updateMetaTags( routePath: any ) {

        switch (routePath) {
            case '/':
                this.titleService.setTitle('HOME | Full-Service-Dienstleister für Anlageimmobilien weltweit mit den Schwerpunkten Asien und Europa');
                //window.scrollTo(0,0);
                break;
            case '/ueber-uns':
                this.titleService.setTitle('Über uns | Full-Service-Dienstleister für Anlageimmobilien weltweit mit den Schwerpunkten Asien und Europa');
                //window.scrollTo(0,0);
                break;
            case '/management':
                this.titleService.setTitle('Management | Full-Service-Dienstleister für Anlageimmobilien weltweit mit den Schwerpunkten Asien und Europa');
                break;
            case '/vermietung':
                this.titleService.setTitle('Vermietung | Full-Service-Dienstleister für Anlageimmobilien weltweit mit den Schwerpunkten Asien und Europa');
                //window.scrollTo(0,0);
                break;
            case '/investment':
                this.titleService.setTitle('Investment | Full-Service-Dienstleister für Anlageimmobilien weltweit mit den Schwerpunkten Asien und Europa');
                //window.scrollTo(0,0);
                break;
            case '/kontakt':
                this.titleService.setTitle('Kontakt | Full-Service-Dienstleister für Anlageimmobilien weltweit mit den Schwerpunkten Asien und Europa');
                //window.scrollTo(0,0);
                break;
            case '/impressum':
                this.titleService.setTitle('Impressum | Full-Service-Dienstleister für Anlageimmobilien weltweit mit den Schwerpunkten Asien und Europa');
                //window.scrollTo(0,0);
                break;
            case '/datenschutz':
                this.titleService.setTitle('Datenschutz | Full-Service-Dienstleister für Anlageimmobilien weltweit mit den Schwerpunkten Asien und Europa');
                //window.scrollTo(0,0);
                break;
            default:
                this.titleService.setTitle('Full-Service-Dienstleister für Anlageimmobilien weltweit mit den Schwerpunkten Asien und Europa');
                //window.scrollTo(0,0);
        }
    }

  /*
   * Function Name: triggerScrollTo()
   * https://www.npmjs.com/package/@nicky-lenaers/ngx-scroll-to
   */
    public triggerScrollTo() {
        let target = 'scroll-start';

        const config: ScrollToConfigOptions = {
            //container: 'scrollable-box',
            target: target,
            duration: 100,
            /*easing: 'easeOutElastic',*/
            offset: -1000
        };
        this._scrollToService.scrollTo(config);
    }

    /*
     * Function Name: scrollToTop()
     */
    scrollToTop() {
        //console.log("scrollToTop");
        this.triggerScrollTo();
    }

    onClickMoreInfoCookie() {
        window.open('https://cookiesandyou.com','_blank');
    }

    onClickDenyCookies() {
        this.cookie_ani = false;
    }

    onClickAcceptyCookies() {
        this.cookie_ani = false;

        this.cacheFactory.setItem( 'centurion_cookie_accepted', 'yes');
    }
}
