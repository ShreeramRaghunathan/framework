import { ElementRef, Directive, AfterViewInit } from '@angular/core';
import { DataService } from './data.service';

declare var $: any;

@Directive({
  selector: '[ddDragDropAppropriate]'
})
export class DdDragDropAppropriateDirective implements AfterViewInit {
  //
  private numbers:Array<number>;
  private userAnswer:Array<number>;
  public isSubmitDisabled:boolean;
  //
  private dragCounter:number;
  private dropPosotion1:number
  private dropPosotion2:number
  private correntAns:number;
  private currentElement;
  //
  constructor(private globalData:DataService, private elementRef: ElementRef) {
    this.isSubmitDisabled = true;
    setTimeout(()=>{
      this.init();
    },500)
  }
  ngAfterViewInit() 
  {

  }
  init()
  {
    this.isSubmitDisabled = true;
    this.numbers = [];
    this.userAnswer = [];
    this.currentElement = null;
    //
    this.dragCounter = 0;
    this.dropPosotion1 = 0;
    this.dropPosotion2 = 0;
    this.correntAns = 0;
    //
    for (let i = 0; i < this.globalData.CourseContent.question.length; i++) {
      let indx:number = this.globalData.CourseContent.question[i].dropIndex;
      this.numbers.push(indx);
      $("#card"+(i+1)).data({'originalLeft': $("#card"+(i+1)).css('left'),
        'origionalTop': $("#card"+(i+1)).css('top'), 'origionalHieght': $("#card"+(i+1)).css('height')
      });
    }

    $("#target1").droppable({
      accept: '.draggable-item',
      hoverClass: 'hovered',
      drop: (event, ui) => {
        this.handleCardDrop1(event, ui)
      }
    })
    $("#target2").droppable({
      accept: '.draggable-item',
      hoverClass: 'hovered',
      drop: (event, ui) => {
        this.handleCardDrop2(event, ui)
      }
    })
    $(".draggable-item").draggable({
      stack: '.draggable-item',
      cursor: 'move',
      revert: true,
      drag:(event, ui) => { this.handleCardDrag(event, ui) }
    })
  }
  handleCardDrag(event, ui)
  {
    this.currentElement = $(event.target);
  }
  handleCardDrop1(event, ui)
  {
    let dragId = $(event.target).parent().attr("id");
    $(this.currentElement).addClass("droped");
    if(dragId=="true")dragId=true; else dragId=false;
    if( dragId === ui.draggable.data("target"))
    {
      $(event.target).parent().data("ans","true")
    }
    else {
      $(event.target).parent().data("ans","false")
    }
    this.dragCounter++;
    ui.draggable.position({my: "top", at: "top", of: $(event.target), using:(css, calc) => {
      //console.log(this.dropPosotion1+'[]',css,' # '+css.left+' @@ '+$(this.currentElement).height());
      //console.log(';; ',css,' this ',$(this.currentElement).css('top'))
      css.top = (this.dropPosotion1 !=0) ? (css.top + this.dropPosotion1) : css.top;      
      this.dropPosotion1 += $(this.currentElement).height();
      $(this.currentElement).animate(css, 200, 'linear');
    }});
    //ui.draggable.position({my: "top", at: "top", of: $(event.target)});
    ui.draggable.draggable('option', 'revert', false);
    ui.draggable.draggable('disable');
    if(this.dragCounter == this.globalData.CourseContent.question.length)
    {
      this.isSubmitDisabled = false;
    }
  }
  handleCardDrop2(event, ui)
  {
    let dragId = $(event.target).parent().attr("id");
    $(this.currentElement).addClass("droped");
    if(dragId=="true")dragId=true; else dragId=false;
    if( dragId === ui.draggable.data("target"))
    {
      $(event.target).parent().data("ans","true")
    }
    else {
      $(event.target).parent().data("ans","false")
    }
    this.dragCounter++;
    ui.draggable.position({my: "top", at: "top", of: $(event.target), using:(css, calc) => {
      //console.log(';; ',css,' this ',$(this.currentElement).css('top'))
      css.top = (this.dropPosotion2 !=0) ? (css.top + this.dropPosotion2) : css.top;      
      this.dropPosotion2 += $(this.currentElement).height();
      $(this.currentElement).animate(css, 200, 'linear');
    }});
    ui.draggable.position({my: "top", at: "top", of: $(event.target)});
    ui.draggable.draggable('option', 'revert', false);
    ui.draggable.draggable('disable');
    if(this.dragCounter == this.globalData.CourseContent.question.length)
    {
      this.isSubmitDisabled = false;
    }
  }
  checkAnswer()
  {
    this.isSubmitDisabled = true;
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
