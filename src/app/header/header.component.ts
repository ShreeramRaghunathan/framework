import { JsonParserService } from './../json-parser.service';
import { AppControllerModule } from './../app.controller';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isMenuOpen:Boolean
  private menuObj:any;
  constructor(private _controller:AppControllerModule, private jsonParser:JsonParserService) { }

  ngOnInit() {
    this.isMenuOpen = false;
    this.loadCourseMenu();
  }
  loadCourseMenu()
  {
      this.jsonParser.getDataRequest("../assets/courseMenu/courseMenu.json").subscribe(result => this.getMenuData(result))
  }
  getMenuData(data)
  {
    this.menuObj = data;
    this._controller.getCourseMenuData(data);
  }
  
  onMenuHandler()
  {
    console.log('Menu clicked');
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
