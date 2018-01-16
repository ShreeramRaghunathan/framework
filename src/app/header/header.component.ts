import { JsonParserService } from './../json-parser.service';
import { AppControllerModule } from './../app.controller';
import { Component, OnInit, AfterViewInit } from '@angular/core';
/*import { CollapseDirective } from './collapse.directive';*/
import { DataService } from './../data.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  private isMenuOpen:Boolean
  private menuObj:any;
  public isCollapsedContent:boolean = true;
  public isCollapsedImage:boolean = true;
  constructor(private _controller:AppControllerModule, private jsonParser:JsonParserService, private globalData:DataService) { }

  ngOnInit() {
    this.isMenuOpen = false;
    setTimeout(() => {this.loadCourseMenu();}, 0);
  }
  loadCourseMenu()
  {
    this.jsonParser.getDataRequest("../assets/course_content/"+this.globalData.LanguageSelected+"/courseMenu.json").subscribe(result => this.getMenuData(result))
  }
  getMenuData(data)
  {
    this.menuObj = data;
    this._controller.getCourseMenuData(data);
    //console.log(this.globalData.LanguageSelected);
  }
  
  onMenuHandler()
  {
    this.toggleMenu();
    setTimeout(() => {
      $('.menu-page-list .tree').hide();
    },1)
  }
  onMenuTopicsClickHandler(event, pTopic)
  {

    //console.log($(event.target).parent().children('.tree'))
    //this.isCollapsedContent = !this.isCollapsedContent
    if($(event.target).parent().attr("data-expand") != "false")
    {
      $(event.target).children('.tree').slideToggle();
      $('.menu-page-list .tree').not($(event.target).children('.tree')).slideUp();;
      //$('.menu-page-list .tree').not($(event.target).parent().next('.tree')).slideUp();
    }
  }
  onMenuPageClickHandler(event, pTopic, pPage)
  {
    this._controller.audioAutoPlay("page", pTopic, pPage);

    this.toggleMenu();
  }
  toggleMenu()
  {
    this.isMenuOpen = !this.isMenuOpen;
    if(this.isMenuOpen)
    {
      this.isMenuOpen = true;
    }
    else
    {
      this.isMenuOpen = false;
    }
  }
}
