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
    public appController: AppControllerModule;
    public currentTopic:number;
    public currentPage:number;
    public totalPages:number;
    public currentPageNumber:number = 0;
    public CourseMenu:any;
    public topicTitle;
    public cPageData = '01|01';
    public pageStatusList = [];

    private CourseConfig;
    //public isNextButtonDisabled = false;
    //public isPrevButtonDisabled = true;
    
    constructor(private router:Router, private jsonParser:JsonParserService, private globalData:DataService) {
        this.globalData.mainControllerInstance = this;
        this.globalData.isNextButtonDisabled = false;
        this.globalData.isPrevButtonDisabled = true;
        this.init();               
    }
    
    init()
    {
        this.getConfigData();
        this.router.events.filter(event => event instanceof NavigationStart).subscribe(event => {
            //console.log(event)
            let tURL = '';
            console.log(this.CourseConfig.AvailableAssessmentQuestion)
            if(this.currentTopic == this.CourseConfig.AvailableAssessmentQuestion)
            {

            }
            else
            {
                tURL = '../assets/course_content/'+this.globalData.LanguageSelected+'/t'+this.pad(this.currentTopic+1)+'/p'+this.pad(this.currentPage+1)+'.json';
            }
            this.jsonParser.getDataRequest(tURL).subscribe((data) => {
                console.log('@@@ ',data)
            })
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

    getConfigData()
    {
        this.jsonParser.getDataRequest("../assets/course_config.json").subscribe(result => this.onConfigDataSucess(result))
    }

    onConfigDataSucess(data)
    {
        this.CourseConfig = {
            CourseName: data.CourseName,
            CourseBrand: data.CourseBrandName,
            BrandFont: data.CourseBrandFontSize,
            LogoPath: data.CourseBrandNameImg,
            AppType: data.courseSettings.appType,
            VisualMenu: data.courseSettings.visualMenu,
            SkipVisualmenu: data.courseSettings.skipVisualMenu,
            MenuDepth: data.courseSettings.menuDepth,
            UIControls: data.UIControllers,
            ForceNavigation: data.courseSettings.forceNavigation,
            HasAssessment:data.courseSettings.hasAssessment,
            AssessmentSection:data.courseSettings.assessmentSection,
            TotalAssesmentQuestions: data.courseSettings.totalQuestions,
            AvailableAssessmentQuestion : data.courseSettings.availableQuestions,
            IsRandomized: data.courseSettings.hasRandomization,
            HasPooling: data.courseSettings.hasPooling,
            MasteryScore: data.courseSettings.masteryScore,
            HasAssesmentIntro: data.courseSettings.hasAssessmentIntro,
            MaxAssesmentAttempt: data.courseSettings.maxAssesmentAttempt,
            HasLangSelectionPage: data.courseSettings.hasLangSelectionPage,
            LanguageSelected: data.courseSettings.defaultLanguage,
            HasIntroPage: data.courseSettings.hasCourseIntro,
            HasAudio: data.courseSettings.hasAudio,
            PageCount: data.courseSettings.pageCountType
        }
        this.globalData.CourseConfig = this.CourseConfig;
        //console.log(this.CourseConfig.HasAssesmentIntro)
        this.globalData.LanguageSelected = this.CourseConfig.LanguageSelected;

    }
    public getCourseMenuData(data)
    {
        let path:string = "";
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
        if(this.CourseConfig.HasLangSelectionPage)
        {
            path = '/container/assets/languageselection';
            this.router.navigate([path]);
        }
        else
        {
            this.loadScreen(this.currentTopic, this.currentPage);
        }
        console.log(this.CourseConfig.HasLangSelectionPage)
        //this.loadScreen(this.currentTopic, this.currentPage);
    }
    startcourse()
    {
        if(this.globalData.LanguageSelected == 'en')
        {
            this.audioAutoPlay();
        }
    }
    audioAutoPlay()
    {
        this.loadScreen(this.currentTopic, this.currentPage);
    }
    onNextBackHandler(target:any)
    {
        if(target.name == "NextBtn")
        {
            this.globalData.isNextButtonDisabled = false;
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
            this.globalData.isPrevButtonDisabled = false;
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
        path = '/container/screens/topic_'+this.pad(_topic+1)+'/page'+this.pad(_page+1);
        this.router.navigate([path]);
        if(this.currentPageNumber <= 1)
        {
            this.globalData.isPrevButtonDisabled = true;
        }
        else
        {
            this.globalData.isPrevButtonDisabled = false; 
        }
        if(this.currentPageNumber >= this.totalPages)
        {
            this.globalData.isNextButtonDisabled = true;
        }
        else
        {
            this.globalData.isNextButtonDisabled = false;
        }
        //this.globalData.currentTest.subscribe(value => this.isNextButtonDisabled = value)
        //this.globalData.setValue(this.isNextButtonDisabled);
        //console.log(this.currentPageNumber+' :: '+this.totalPages+' @@ '+this.globalData.isPrevButtonDisabled.valueOf()+' <<>> '+this.globalData.isNextButtonDisabled.valueOf());
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