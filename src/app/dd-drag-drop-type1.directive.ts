import { Directive, AfterViewInit, Injectable } from '@angular/core';
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
  private userAnswer:Array<number>;
  private classObj:any;
  private answer:any;
  private dropedElem:any;
  private dragElem:any;

  public isSubmitDisabled:boolean;

  constructor(private globalData:DataService, private elementRef: ElementRef) {
    //el.nativeElement.style.backgroundColor = "gray";
    //$.noConflict();
    this.classObj = this;
    
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
    this.isSubmitDisabled = true;
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
    });
    //$(".droppable-item").draggable()
    //console.log($(".droppable-item"))
  }
  
  handleCardDrag(event, ui)
  {
    this.dragElem = $(event.target);
  }
  handleCardDrop(event, ui)
  {
    let slotNumber = event.target.getAttribute('attr.data-number');
    let cardNumber = ui.draggable.data('number');
    ui.draggable.draggable('disable');
    //console.log('# ', $(event.target).droppable('disable'))
    $(event.target).droppable('disable')
    this.dropedElem = ui.draggable;
    this.answer = $(ui.draggable).attr('data-number');
    //ui.draggable.position({ of: $(this), my: 'left top', at: 'left top', using: function (css, calc) { $(this).animate(css, 200, 'linear'); } });
    //ui.draggable.position({ of: $(event.target), my: 'left top', at: 'left top', using: (css, calc) =>  { console.log($(event.target)); $(event.target).animate(css, 200, 'linear'); } });
    ui.draggable.position({my: "left top", at: "left top", of: $(event.target)});
    ui.draggable.draggable('option', 'revert', false);
    $(this.dragElem).css("cursor","default");
    $(this.dragElem).css("height","38px");
    //
    //console.log('######## ',this,' @@ ', $(this), ' :: ',this.correctCards)
    this.isSubmitDisabled = false;
    //
    if (slotNumber == cardNumber) {
      this.correctCards++;
      this.userAnswer.push(1);
    }
    else{
      this.userAnswer.push(0);
    }
    //console.log('## ',cardNumber)
  }
  
  checkAnswer()
  {
    $(".draggable-item").draggable('disable');
    $(".draggable-item").css("cursor","default");
    this.isSubmitDisabled = true;
    this.userAnswer.push(1);
    //console.log('checkAnswer ')
  }

  touchHandler(event)
  {
    var touches = event.changedTouches,
    first = touches[0],
    type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                              first.screenX, first.screenY, 
                              first.clientX, first.clientY, false, 
                              false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
  }
}
