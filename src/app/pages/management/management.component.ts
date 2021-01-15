import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {trigger, state, transition, animate, style } from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

import * as $ from 'jquery';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  animations: [
    trigger('text-ani-1', [
      state('true', style({ opacity: 1, transform: `translateY(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateY(${400}px)` })),
      transition('false <=> true', animate('1.5s 0.2s cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-left', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${-700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-right', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-left-2', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${-700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-right-2', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-left-3', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${-700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-right-3', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-left-4', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${-700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-right-4', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-left-5', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${-700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-right-5', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ])
  ]
})
export class ManagementComponent implements OnInit, AfterViewInit {

  text_ani_1 = false;

  left_ani_1 = false;
  right_ani_1 = false;
  left_ani_2 = false;
  right_ani_2 = false;
  left_ani_3 = false;
  right_ani_3 = false;
  left_ani_4 = false;
  right_ani_4 = false;
  left_ani_5 = false;
  right_ani_5 = false;


  constructor(private route: ActivatedRoute, private _scrollToService: ScrollToService) {

    this.route.queryParams
        .subscribe(params => {
              console.log("hier= ", params.id);

              if (params.id !== undefined && params.id !== "") {
                setTimeout(()=> {
                  this.triggerScrollTo(params.id);
                }, 600);
              } else {
                window.scrollTo(0,0);
              }

            }
        );
  }

  /*
   * HostListener
   */
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    //console.log('I am scrolled', event);
    //const scrollY = event['path'][1].scrollY;
    var scrollY = window.scrollY;
    const window_width = window.innerWidth;
    //console.log('scrollY', scrollY);

    const ani_1_pos = this.getPositionOfElement('#left_ani_1');
    if (scrollY > ani_1_pos) {
      this.left_ani_1 = true;
      this.right_ani_1 = true;
    } else {
      this.left_ani_1 = false;
      this.right_ani_1 = false;
    }

    const ani_2_pos = this.getPositionOfElement('#left_ani_2');
    if (scrollY > ani_2_pos) {
      this.left_ani_2 = true;
      this.right_ani_2 = true;
    } else {
      this.left_ani_2 = false;
      this.right_ani_2 = false;
    }

    const ani_3_pos = this.getPositionOfElement('#left_ani_3');
    if (scrollY > ani_3_pos) {
      this.left_ani_3 = true;
      this.right_ani_3 = true;
    } else {
      this.left_ani_3 = false;
      this.right_ani_3 = false;
    }

    const ani_4_pos = this.getPositionOfElement('#left_ani_4');
    if (scrollY > ani_4_pos) {
      this.left_ani_4 = true;
      this.right_ani_4 = true;
    } else {
      this.left_ani_4 = false;
      this.right_ani_4 = false;
    }

    const ani_5_pos = this.getPositionOfElement('#left_ani_5');
    if (scrollY > ani_5_pos) {
      this.left_ani_5 = true;
      this.right_ani_5 = true;
    } else {
      this.left_ani_5 = false;
      this.right_ani_5 = false;
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
    this.text_ani_1 = false;
  }

  /*
   * ngAfterViewInit
   */
  ngAfterViewInit(): void {

    setTimeout(()=> {
      this.text_ani_1 = true;
    }, 200);

  }

  /*
   * Function Name: triggerScrollTo()
   * https://www.npmjs.com/package/@nicky-lenaers/ngx-scroll-to
   */
  public triggerScrollTo( new_target: string ) {
    let target = new_target;

    const config: ScrollToConfigOptions = {
      //container: 'scrollable-box',
      target: target,
      duration: 0,
      easing: 'easeOutElastic',
      offset: 80
    };
    this._scrollToService.scrollTo(config);
  }

}
