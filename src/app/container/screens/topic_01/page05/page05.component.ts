import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../../data.service';
import { DdDragDropAppropriateDirective } from './../../../../dd-drag-drop-appropriate.directive';

@Component({
  selector: 'app-page05',
  templateUrl: './page05.component.html',
  styleUrls: ['./page05.component.css']
})
export class Page05Component implements OnInit {
  @ViewChild(DdDragDropAppropriateDirective) ddDragDropAppropriate = null;
  //
  private pageContent;
  private question;
  //
  constructor(private globalData:DataService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.init();
    }, 50)
  }
  init()
  {
    this.pageContent = this.globalData.CourseContent;
    this.question = this.pageContent.question;
  }
  onSubmitHandler()
  {
    this.ddDragDropAppropriate.checkAnswer();
  }
}
