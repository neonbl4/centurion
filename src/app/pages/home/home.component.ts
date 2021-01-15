import {Component, HostListener, OnInit, AfterViewInit} from '@angular/core';
import {trigger, state, transition, animate, style, animateChild, query } from '@angular/animations';
import { AnimationService } from '../../services/animation.service';

//https://medium.com/better-programming/how-to-include-and-use-jquery-in-angular-cli-project-592e0fe63176
import * as $ from 'jquery';

//https://www.npmjs.com/package/locomotive-scroll
//import LocomotiveScroll from 'locomotive-scroll';

//ANIMATIONS
//https://indepth.dev/in-depth-guide-into-animations-in-angular/#animating-children-elements

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('inner-text-ani', [
      state('true', style({ opacity: 1, transform: `translateY(${0}px)` })),
      state('false', style({ opacity: 0, transform: `translateY(${400}px)` })),
      transition('false <=> true', animate('1.5s 0.2s cubic-bezier(0,.74,.36,1)'))
    ]),
    trigger('fade-in', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('400ms ease-in'))
    ]),
    trigger('fade-in-circle-1', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('400ms 0ms ease-in-out'))
    ]),
    trigger('fade-in-circle-2', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('400ms 100ms ease-in-out'))
    ]),
    trigger('fade-in-circle-3', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('400ms 200ms ease-in-out'))
    ]),
    trigger('fade-in-circle-4', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('400ms 0ms ease-in-out'))
    ]),
    trigger('fade-in-circle-5', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('400ms 100ms ease-in-out'))
    ]),
    trigger('fade-in-circle-6', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('400ms 200ms ease-in-out'))
    ]),
    trigger('fade-in-circle-7', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('400ms 300ms ease-in-out'))
    ]),
    trigger('fade-in-circle-8', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('400ms 400ms ease-in-out'))
    ])
  ]
})

export class HomeComponent implements OnInit, AfterViewInit {

  switch2mobileWidth = 900;

  circle_text_1;
  circle_text_1_desktop = "Centurion Partners<br>Holding GmbH";
  circle_text_1_mobile = "Centurion Partners<br>Holding GmbH";

  circle_text_2;
  circle_text_2_desktop = "Property<br>Management";
  circle_text_2_mobile = "Property<br>Management";

  circle_text_3;
  circle_text_3_desktop = "Asset<br>Management";
  circle_text_3_mobile = "Asset<br>Management";

  circle_text_4;
  circle_text_4_desktop = "Projektsteuerung";
  circle_text_4_mobile = "Projekt-<br>steuerung";

  circle_text_5;
  circle_text_5_desktop = "Center<br>Management";
  circle_text_5_mobile = "Center<br>Management";

  circle_text_6;
  circle_text_6_desktop = "Vermietung";
  circle_text_6_mobile = "Vermietung";

  circle_text_7;
  circle_text_7_desktop = "Investment";
  circle_text_7_mobile = "Investment";

  circle_text_8;
  circle_text_8_desktop = "Fondsmanagement";
  circle_text_8_mobile = "Fonds-<br>management";

  animate_inner_text = false;
  fade_in_1 = false;
  fade_in_2 = false;

  fade_in_circle_1 = false;
  fade_in_circle_2 = false;
  fade_in_circle_3 = false;
  fade_in_circle_4 = false;
  fade_in_circle_5 = false;
  fade_in_circle_6 = false;
  fade_in_circle_7 = false;
  fade_in_circle_8 = false;

  //Height of Parallax Containers
  data_height_1 = "760px";
  data_height_2 = "760px";

  /*
   * constructor
   */
  constructor(private animationService: AnimationService) {
    this.animate_inner_text = false;
  }

  /*
   * HostListener
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const window_width = window.innerWidth;
    this.updateApp(window_width);
  }

  /*
   * HostListener
   */
  @HostListener('document:scroll', ['$event'])
    onScroll(): void {
      //console.log('I am scrolled', event);
      //const scrollY = event['path'][1].scrollY;
      //console.log('scrollY= ', scrollY);
      //var scroll = document.scrollingElement.scrollTop;
      var scrolled = $(window).scrollTop();
      //console.log("scrolled= ", scrolled);

      // Attach scroll event to window. Calculate the scroll ratio of each element
      // and change the image position with that ratio.
      // https://codepen.io/lemagus/pen/RWxEYz
      $('.parallax').each(function(index, element) {
        var initY = $(this).offset().top;
        var height = $(this).height();
        var endY  = initY + $(this).height();

        // Check if the element is in the viewport.
        var visible = isInViewport(this);
        //if(visible) {
          var diff = scrolled - initY;
          var ratio = Math.round((diff / height) * 100);
          //console.log("ratio= ", ratio);
          $(this).css('background-position','center ' + -(ratio * 1.5) + 'px');
        //}
      });


      // Check if the element is in the viewport.
      // http://www.hnldesign.nl/work/code/check-if-element-is-visible/
      function isInViewport(node) {
        // Am I visible? Height and Width are not explicitly necessary in visibility
        // detection, the bottom, right, top and left are the essential checks. If an
        // image is 0x0, it is technically not visible, so it should not be marked as
        // such. That is why either width or height have to be > 0.
        var rect = node.getBoundingClientRect()
        return (
            (rect.height > 0 || rect.width > 0) &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        )
      }

    //ANIMATIONS
    const logo_1_pos = this.getPositionOfElement('#logo-1');
    if (scrolled > logo_1_pos) {
      $('#logo-1').addClass('blur-animation');
    } else {
      $('#logo-1').removeClass('blur-animation');
    }

    const text_1_pos = this.getPositionOfElement('#text-1');
    if (scrolled > text_1_pos) {
      this.fade_in_1 = true;
    } else {
      this.fade_in_1 = false;
    }

    const text_2_pos = this.getPositionOfElement('#text-2');
    if (scrolled > text_2_pos) {
      this.fade_in_2 = true;
    } else {
      this.fade_in_2 = false;
    }

    const window_width = window.innerWidth;
    if (window_width > this.switch2mobileWidth) {
      const circle_1_pos = this.getPositionOfElement('#circle-1');
      if (scrolled > circle_1_pos) {
        this.fade_in_circle_1 = true;
      } else {
        this.fade_in_circle_1 = false;
      }
      const circle_2_pos = this.getPositionOfElement('#circle-2');
      if (scrolled > circle_2_pos) {
        this.fade_in_circle_2 = true;
      } else {
        this.fade_in_circle_2 = false;
      }
      const circle_3_pos = this.getPositionOfElement('#circle-3');
      if (scrolled > circle_3_pos) {
        this.fade_in_circle_3 = true;
      } else {
        this.fade_in_circle_3 = false;
      }
      const circle_4_pos = this.getPositionOfElement('#circle-4');
      if (scrolled > circle_4_pos) {
        this.fade_in_circle_4 = true;
      } else {
        this.fade_in_circle_4 = false;
      }
      const circle_5_pos = this.getPositionOfElement('#circle-5');
      if (scrolled > circle_5_pos) {
        this.fade_in_circle_5 = true;
      } else {
        this.fade_in_circle_5 = false;
      }
      const circle_6_pos = this.getPositionOfElement('#circle-6');
      if (scrolled > circle_6_pos) {
        this.fade_in_circle_6 = true;
      } else {
        this.fade_in_circle_6 = false;
      }
      const circle_7_pos = this.getPositionOfElement('#circle-7');
      if (scrolled > circle_7_pos) {
        this.fade_in_circle_7 = true;
      } else {
        this.fade_in_circle_7 = false;
      }
      const circle_8_pos = this.getPositionOfElement('#circle-8');
      if (scrolled > circle_8_pos) {
        this.fade_in_circle_8 = true;
      } else {
        this.fade_in_circle_8 = false;
      }
    } else {
      this.fade_in_circle_1 = true;
      this.fade_in_circle_2 = true;
      this.fade_in_circle_3 = true;
      this.fade_in_circle_4 = true;
      this.fade_in_circle_5 = true;
      this.fade_in_circle_6 = true;
      this.fade_in_circle_7 = true;
      this.fade_in_circle_8 = true;
    }
  }

  /*
   * getPositionOfElement
   */
  getPositionOfElement( elementID: string ) {
    const el_ypos = $(elementID).offset().top -700;
    return el_ypos;
  }

  /*
   * updateApp
   */
  updateApp( window_width ) {
    if (window_width < this.switch2mobileWidth) {
      this.circle_text_1 = this.circle_text_1_mobile;
      this.circle_text_2 = this.circle_text_2_mobile;
      this.circle_text_3 = this.circle_text_3_mobile;
      this.circle_text_4 = this.circle_text_4_mobile;
      this.circle_text_5 = this.circle_text_5_mobile;
      this.circle_text_6 = this.circle_text_6_mobile;
      this.circle_text_7 = this.circle_text_7_mobile;
      this.circle_text_8 = this.circle_text_8_mobile;
    } else if ( window_width > this.switch2mobileWidth) {
      this.circle_text_1 = this.circle_text_1_desktop;
      this.circle_text_2 = this.circle_text_2_desktop;
      this.circle_text_3 = this.circle_text_3_desktop;
      this.circle_text_4 = this.circle_text_4_desktop;
      this.circle_text_5 = this.circle_text_5_desktop;
      this.circle_text_6 = this.circle_text_6_desktop;
      this.circle_text_7 = this.circle_text_7_desktop;
      this.circle_text_8 = this.circle_text_8_desktop;
    }
  }

  /*
   * ngOnInit
   */
  ngOnInit() {
    this.animate_inner_text = false;

    const window_width = window.innerWidth;
    this.updateApp(window_width);


    // Populate images from data attributes.
    var scrolled = window.scrollY;
    //console.log("scrolled= ", scrolled);

    $('.parallax').each(function(index) {
      var imageSrc = $(this).data('image-src');
      var imageHeight = $(this).data('height');
      $(this).css('background-image','url(' + imageSrc + ')');
      $(this).css('background-repeat','no-repeat');
      $(this).css('height', imageHeight);

      // Adjust the background position.
      var initY = $(this).offset().top;
      var height = $(this).height();
      var diff = scrolled - initY;
      var ratio = Math.round((diff / height) * 100);

      //console.log("ratio= ", ratio);
      //const test = -(ratio * 1.5);
      //$(this).css('background-position','center ' + -(ratio * 1.5) + 'px');
      $(this).css('background-position','center 50px');

    });

  }

  /*
   * ngAfterViewInit
   */
  ngAfterViewInit(): void {

    setTimeout(()=> {
      this.animate_inner_text = true;
    }, 200);

  }
}
