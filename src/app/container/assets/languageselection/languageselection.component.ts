import { AppControllerModule } from './../../../app.controller';
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { DataService } from './../../../data.service';

@Component({
  selector: 'app-languageselection',
  templateUrl: './languageselection.component.html',
  styleUrls: ['./languageselection.component.css']
})
export class LanguageselectionComponent implements OnInit {
  //@Input() private controller:AppControllerModule;
  constructor(private globalData:DataService) { }

  ngOnInit() {
  }
  onLanguageHandler()
  {
    //console.log(this.globalData.mainController);
    this.globalData.LanguageSelected = "en";
    this.globalData.mainControllerInstance.startcourse();
  }
}
