import { Directive, AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DataService } from './data.service';

//import * as $ from 'jquery';
declare var $: any;

//window['$'] = window['jQuery'] = $;
//window['JQueryUI'] = jQueryUI;
//var query = jQueryUI.noConflict( true );

@Directive({
  selector: '[ddDragDropType1]'
})
export class DdDragDropType1Directive implements AfterViewInit {
  private ddElement:any;
  private dragCounter:number;
  private correctCards:number;
  private numbers:Array<number>;
  private userAnswer:Array<any>;
  private classObj:any;

  constructor(private globalData:DataService, private elementRef: ElementRef) {
    //el.nativeElement.style.backgroundColor = "gray";
    //$.noConflict();
    //this.classObj = this;
    
    setTimeout(()=>{
      this.init();
    },500)
  }
  ngAfterViewInit() 
  {
    //this.init();
    //this.classObj = jQuery(this.elementRef.nativeElement)
  }
  private init()
  {
    this.dragCounter = 0;
    this.correctCards = 0;
    this.numbers = [];
    this.userAnswer = [];

    //console.log(this.globalData.CourseContent.question.length)
    for (let i = 0; i < this.globalData.CourseContent.question.length; i++) {
      let indx:number = this.globalData.CourseContent.question[i].dropIndex;
      this.numbers.push(indx);
      $("#card"+(i+1)).data({'originalLeft': $("#card"+(i+1)).css('left'),
        'origionalTop': $("#card"+(i+1)).css('top')
      });
      //this.numbers.push(this.globalData.CourseContent.question[i]);
    }
    $(".droppable-item").droppable({
      classes: {
        "ui-droppable-hover": "drop-hover"
      },
      accept: '.draggable-item',
      hoverClass: 'hovered',
      drop: this.handleCardDrop
    })
    $(".draggable-item").draggable({
      stack: '.draggable-item',
      cursor: 'move',
      revert: true
    });
    //$(".droppable-item").draggable()
    //console.log($(".droppable-item"))
  }
  handleCardDrop(event, ui)
  {
    let slotNumber = event.target.getAttribute('attr.data-number');
    let cardNumber = ui.draggable.data('number');
    ui.draggable.draggable('disable');
    $(this).droppable('disable');
    ui.draggable.position({ of: $(this), my: 'left top', at: 'left top', using: function (css, calc) { $(this).animate(css, 200, 'linear'); } });
    ui.draggable.draggable('option', 'revert', false);
    console.log(slotNumber,' == ',cardNumber)
    /*if (slotNumber == cardNumber) {
      this.correctCards++;
      this.userAnswer.push(1);
    }
    else{
      this.userAnswer.push(0);
    }*/
    //console.log('## ',cardNumber)
  }
}
