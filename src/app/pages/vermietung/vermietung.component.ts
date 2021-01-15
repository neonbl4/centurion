import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import * as $ from 'jquery';

@Component({
  selector: 'app-vermietung',
  templateUrl: './vermietung.component.html',
  styleUrls: ['./vermietung.component.scss'],
  animations: [
    trigger('drive-in-from-left', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${-700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('drive-in-from-right', [
      state('true', style({ opacity: 1, transform: `translateX(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateX(${700}px)` })),
      transition('false <=> true', animate('1500ms cubic-bezier(0,.74,.36,1)'))
    ])
  ]
})
export class VermietungComponent implements OnInit, AfterViewInit {

  left_ani_1 = false;
  right_ani_1 = false;

  constructor() { }

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
    this.left_ani_1 = false;
    this.right_ani_1 = false;
  }

  /*
   * ngAfterViewInit
   */
  ngAfterViewInit(): void {

    setTimeout(()=> {
      this.left_ani_1 = true;
      this.right_ani_1 = true;
    }, 200);

  }

}
