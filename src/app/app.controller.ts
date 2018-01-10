import { BrowserModule } from '@angular/platform-browser';
import { AppRoutersModule } from './app.router';
import { NgModule, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';

import { JsonParserService } from './json-parser.service';

import 'rxjs/add/operator/filter';

import { DataService } from './data.service';

@NgModule({

    imports:[
        BrowserModule,
        AppRoutersModule,
        HttpClientModule,
        HttpModule

    ],
    exports:[]
})

export class AppControllerModule {
    public currentTopic:number;
    public currentPage:number;
    public totalPages:number;
    public currentPageNumber:number = 0;
    public CourseMenu:any;
    public topicTitle;
    public cPageData = '01|01';
    public pageStatusList = [];
    //public isNextButtonDisabled = false;
    //public isPrevButtonDisabled = true;
    
    constructor(private router:Router, private jsonParser:JsonParserService, private data:DataService) {
        this.data.isNextButtonDisabled = false;
        this.data.isPrevButtonDisabled = true;
        this.init();               
    }
    
    init()
    {
        //this.loadCourseMenu();
        this.router.events.filter(event => event instanceof NavigationStart).subscribe(event => {
            //console.log(event)
            /*if(this.currentTopic != 1)
            {
                this.isPrevButtonDisabled = false;
            }
            if(this.currentPageNumber >= this.totalPages)
            {
                this.isNextButtonDisabled = true;
            }*/
            //this.num.test();
            this.getTotalPagesCount();
            this.getCurrentPagesCount();
        });
    }
    
    public getCourseMenuData(data)
    {
        this.CourseMenu = data;
        this.currentTopic = 0;
        this.currentPage = 0;
        this.totalPages = 0;
        //console.log(this.CourseMenu.topics[0].name);
        this.pageStatusList = new Array(this.CourseMenu.topics.length);
        for(var i=0; i<this.CourseMenu.topics.length; i++)
        {
            this.pageStatusList[i] = new Array();
            for(var j=0; j<this.CourseMenu.topics[i].pages.length; j++)
            {
                this.pageStatusList[i][j] = "0";
            }
        }
        this.loadScreen(this.currentTopic, this.currentPage);
    }
    onNextBackHandler(target:any)
    {
        if(target.name == "NextBtn")
        {
            this.data.isNextButtonDisabled = false;
            this.currentPage = this.currentPage + 1;
            if(this.currentPage >= this.getTotalPagesInTopic())
            {
                this.currentTopic = this.currentTopic + 1;
                this.currentPage = 0;
                /*if(this.currentTopic >= this.getTotalTopicsInModule())
                {
                    this.currentPage = 0;
                    this.currentTopic = 0;
                }*/
            }
        }
        else
        {
            this.data.isPrevButtonDisabled = false;
            this.currentPage = this.currentPage - 1;
            if (this.currentPage < 0) 
            {
                this.currentTopic = this.currentTopic - 1;
                this.currentPage = this.CourseMenu.topics[this.currentTopic].pages.length - 1;
            }
        }
        this.loadScreen(this.currentTopic, this.currentPage);
    }
    loadScreen(_topic, _page)
    {
        let path:string = "";
        this.currentTopic = _topic;
        this.currentPage = _page;
        this.getTotalPagesCount();
        this.getCurrentPagesCount();
        //console.log(this.currentPage+' [currentPage] '+this.currentPageNumber+' [totalPages] '+this.totalPages);
        path = '/container/topic_'+this.pad(_topic+1)+'/page'+this.pad(_page+1);
        this.router.navigate([path]);
        if(this.currentPageNumber <= 1)
        {
            this.data.isPrevButtonDisabled = true;
        }
        else
        {
            this.data.isPrevButtonDisabled = false; 
        }
        if(this.currentPageNumber >= this.totalPages)
        {
            this.data.isNextButtonDisabled = true;
        }
        else
        {
            this.data.isNextButtonDisabled = false;
        }
        //this.data.currentTest.subscribe(value => this.isNextButtonDisabled = value)
        //this.data.setValue(this.isNextButtonDisabled);
        //console.log(this.currentPageNumber+' :: '+this.totalPages+' @@ '+this.data.isPrevButtonDisabled.valueOf()+' <<>> '+this.data.isNextButtonDisabled.valueOf());
        this.markVisitedPage();
    }
    markVisitedPage()
    {
        if(this.totalPages != this.currentPage)
        {

        }
        this.pageStatusList[this.currentTopic][this.currentPage] = "1";
        this.updateCourseProgress();
    }
    updateCourseProgress()
    {
        this.cPageData = this.pad(this.currentTopic + 1) + '|' + this.pad(this.currentPage + 1);
    }
    getTotalPagesCount()
    {
        this.totalPages = this.getTotalPagenumber();
    }
    getCurrentPagesCount()
    {
        let pageCounter = 0;
        for(var i = 0; i < this.CourseMenu.topics.length; i++){
            if(this.currentTopic == i)
            {
                pageCounter += this.currentPage;
                break;
            }
            else
            {
                pageCounter += this.CourseMenu.topics[i].pages.length;
            }
        }
        pageCounter = pageCounter+1;
        this.currentPageNumber = this.getCurrentPageNumber(pageCounter);
    }
    getTotalPagenumber()
    {
        let _totalPageCount = 0;
        for(var i=0; i<this.CourseMenu.topics.length; i++)
        {
            for(var j=0; j<this.CourseMenu.topics[i].pages.length; j++)
            {
                _totalPageCount++;
            }
        }
        return _totalPageCount;
    }
    getCurrentPageNumber(_val)
    {
        let _totalPageCount  = 0;
        let flag = 0;
        for(var i = 0; i < this.CourseMenu.topics.length; i++){
            for(var j = 0; j < this.CourseMenu.topics[i].pages.length; j++){
                if(flag!=_val)
                {
                    _totalPageCount++;
                }
                else
                {
                    break;
                }
                flag++;
            }
        }
        return _totalPageCount;
    }
    getTotalPagesInTopic()
    {
        return this.CourseMenu.topics[this.currentTopic].pages.length;
    }
    getTotalTopicsInModule()
    {
        return this.CourseMenu.topics.length;
    }
    pad(n)
    {
        return (n < 10) ? ("0" + n) : n;
    }
}