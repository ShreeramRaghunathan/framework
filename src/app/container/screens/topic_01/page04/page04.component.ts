import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../../data.service';
import { DdDragDropOneToOneDirective } from './../../../../dd-drag-drop-one-to-one.directive';
@Component({
  selector: 'ddDragDropOneToOne',
  templateUrl: './page04.component.html',
  styleUrls: ['./page04.component.css']
})
export class Page04Component implements OnInit {
  @ViewChild(DdDragDropOneToOneDirective) ddDragDropOneToOne = null;
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
    this.ddDragDropOneToOne.checkAnswer();
  }
}
