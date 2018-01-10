import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class DataService {

  isNextButtonDisabled:Boolean;
  isPrevButtonDisabled:Boolean;

  constructor() { }

}
