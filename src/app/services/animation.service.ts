import { Injectable } from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, keyframes, style} from '@angular/animations';

@Injectable({ providedIn: 'root' })

export class AnimationService {

  private player : AnimationPlayer;

  constructor(private builder : AnimationBuilder ) {

  }

  /*
   * animationObject
   */
  animationObject( animation_object: any, animation_done_object: any = null, callBack: Function = null ) {

    const myAnimation : AnimationFactory = this.builder.build([
      animate(animation_object.timing,
        keyframes(animation_object.steps))
    ]);

    const element = document.getElementById(animation_object.element_id);
    this.player = myAnimation.create(element);
    this.player.play();

    this.player.onDone( () => {
      //console.log('---done---');

      if (animation_done_object !== null) {
        const myAnimation : AnimationFactory = this.builder.build([
          animate(animation_done_object.timing,
            keyframes(animation_done_object.steps))
        ]);
        this.player = myAnimation.create(element);
        this.player.play();
      }

      if (callBack !== null) {
        callBack();
      }

    });

  }
}
