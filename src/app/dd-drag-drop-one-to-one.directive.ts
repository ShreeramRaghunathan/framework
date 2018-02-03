import { Directive, AfterViewInit, Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DataService } from './data.service';

declare var $: any;

@Directive({
  selector: '[ddDragDropOneToOne]'
})
export class DdDragDropOneToOneDirective implements AfterViewInit {
  //
  private dragCounter:number;
  public isSubmitDisabled:boolean;
  private numbers:Array<number>;
  private userAnswer:Array<number>;
  
  private currentElement;
  private correctCards:number;
  //
  constructor(private globalData:DataService, private elementRef: ElementRef) {
    setTimeout(()=>{
      this.init();
    },500)
  }
  ngAfterViewInit() 
  {

  }
  init()
  {
    this.dragCounter = 0;
    this.isSubmitDisabled = true;
    this.correctCards = 0;
    this.numbers = [];
    this.userAnswer = [];
    this.currentElement = null;

    for (let i = 0; i < this.globalData.CourseContent.question.length; i++) {
      let indx:number = this.globalData.CourseContent.question[i].dropIndex;
      this.numbers.push(indx);
      $("#card"+(i+1)).data({'originalLeft': $("#card"+(i+1)).css('left'),
        'origionalTop': $("#card"+(i+1)).css('top')
      });
    }
    //
    $(".droppable-item").droppable({
      classes: {
        "ui-droppable-hover": "drop-hover"
      },
      accept: '.draggable-item',
      hoverClass: 'hovered',
      drop: (event, ui) => {
        //console.log(' -- ', $(event.target));        
        this.handleCardDrop(event, ui);
      }
    })
    $(".draggable-item").draggable({
      stack: '.draggable-item',
      cursor: 'move',
      revert: true,
      drag: (event, ui) => {
        this.handleCardDrag(event, ui);
      }
    })
  }
  handleCardDrag(event, ui)
  {
    this.currentElement = $(event.target);
  }
  handleCardDrop(event, ui)
  {
    $(this.currentElement).addClass("droped");
    let slotNumber = event.target.getAttribute('attr.data-number');
    let cardNumber = ui.draggable.data('number');
    ui.draggable.draggable('disable');
    $(event.target).droppable('disable');
    //ui.draggable.position({ of: $(event.target), my: 'left top', at: 'left top', using: (css, calc) => { $(event.target).animate(css, 200, 'linear'); } });
    ui.draggable.position({my: "left top", at: "left top", of: $(event.target)});
    ui.draggable.draggable('option', 'revert', false);
    if (slotNumber == cardNumber) {
      this.correctCards++;
      this.userAnswer.push(1);
    }
    else{
      this.userAnswer.push(0);
    }
    this.dragCounter++;
    if(this.dragCounter == this.globalData.CourseContent.question.length)
    {
      this.isSubmitDisabled = false;
    }
  }

  checkAnswer()
  {
    $(".draggable-item").draggable('disable');
    $(".draggable-item").css("cursor","default");
    this.isSubmitDisabled = true;
  }
}
