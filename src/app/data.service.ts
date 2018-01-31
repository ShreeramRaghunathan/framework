import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class DataService {

  isNextButtonDisabled:Boolean;
  isPrevButtonDisabled:Boolean;

  CourseConfig:object = {};
  LanguageSelected:string = "en";

  mainControllerInstance;

  CourseContent;
  screenType;
  isAudio;
  audioFile;
  isPaused;
  deskTop;
  
  constructor() { }

}
