import { AppControllerModule } from './../app.controller';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public isNextBtnActive:Boolean;
  public isBackBtnActive:Boolean;

  constructor(private _controller:AppControllerModule) { }

  ngOnInit() {
    this.isNextBtnActive = this._controller.isNextButtonDisabled;
    this.isBackBtnActive = this._controller.isPrevButtonDisabled;
  }
  onNextHandler(event)
  {
    //console.log('footer '+event.currentTarget)
    this._controller.onNextBackHandler(event.currentTarget)
    this.isNextBtnActive = this._controller.isNextButtonDisabled;
    this.isBackBtnActive = this._controller.isPrevButtonDisabled;
  }
  onBackHandler(event)
  {
    //console.log('footer '+event.currentTarget)
    this._controller.onNextBackHandler(event.currentTarget)
    this.isNextBtnActive = this._controller.isNextButtonDisabled;
    this.isBackBtnActive = this._controller.isPrevButtonDisabled;
  }
}
