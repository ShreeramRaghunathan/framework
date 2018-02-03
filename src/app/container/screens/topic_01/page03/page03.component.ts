import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../../data.service';
import { DdDragDropType1Directive } from './../../../../dd-drag-drop-type1.directive';

@Component({
  selector: 'app-page03',
  templateUrl: './page03.component.html',
  styleUrls: ['./page03.component.css']
})
export class Page03Component implements OnInit {
  @ViewChild(DdDragDropType1Directive) ddDragDropType1 = null
  //
  private pageContent;
  //private question;
  private question1;
  private question2;
  private question3;
  //
  private answer1;
  private answer2;
  private answer3;
  //
  private isSubmitDisabled;
  //
  constructor(private globalData:DataService) {}

  ngOnInit() {
    setTimeout(()=>{
      this.init();
    }, 50)
  }
  
  init()
  {
    this.pageContent = this.globalData.CourseContent;
    //this.question = this.pageContent.question;
    this.question1 = this.pageContent.question[0].dragText;
    this.question2 = this.pageContent.question[1].dragText;
    this.question3 = this.pageContent.question[2].dragText;
    //  console.log('### ', this.question[0].dragText)
    this.answer1 = this.pageContent.question[0].dropText;
    this.answer2 = this.pageContent.question[1].dropText;
    this.answer3 = this.pageContent.question[2].dropText;
    //
    //console.log('######## ',this.globalData.CourseContent.pageHeading)
  }

  onSubmitHandler()
  {
    
    this.ddDragDropType1.checkAnswer();
  }

}
