import { BrowserModule } from '@angular/platform-browser';
import { AppRoutersModule } from './app.router';
import { NgModule, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';

import { JsonParserService } from './json-parser.service';

import 'rxjs/add/operator/filter';

import { DataService } from './data.service';
//import * as $ from 'jquery';

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
    
    constructor(private router:Router, private jsonParser:JsonParserService, private globalData:DataService, private location: Location) {
        this.globalData.mainControllerInstance = this;
        this.globalData.isNextButtonDisabled = false;
        this.globalData.isPrevButtonDisabled = true;
        this.globalData.isPaused = false;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
            this.globalData.deskTop = false;
        } else {
            this.globalData.deskTop = true;
        }
        this.init();
    }
    
    private init()
    {
        this.getConfigData();
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
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            //console.log(event)
            let tURL = '';
            //console.log('menu .. ',this.location.path())
            if(this.currentTopic == this.CourseConfig.AvailableAssessmentQuestion)
            {
                
            }
            else
            {
                tURL = '../assets/course_content/'+this.globalData.LanguageSelected+'/t'+this.pad(this.currentTopic+1)+'/p'+this.pad(this.currentPage+1)+'.json';
            }
            //console.log('tURL ;; ',tURL)
            this.jsonParser.getDataRequest(tURL).subscribe((response) => {
                this.globalData.CourseContent = response.contents;
                this.globalData.screenType = this.CourseMenu.topics[this.currentTopic].pages[this.currentPage].screenType;
                this.globalData.isAudio = this.CourseMenu.topics[this.currentTopic].pages[this.currentPage].isAudio;
                if (this.pageStatusList[this.currentTopic][this.currentPage] != "1")
                {
                    /* -- 
                    if (this.CourseConfig.ForceNavigation)
                        this.globalData.isNextButtonDisabled = true;
                    else {
                        if (this.currentTopic != this.CourseConfig.AssessmentSection-1)
                            this.globalData.isNextButtonDisabled = false;
                    }
                    if(this.currentTopic != this.CourseConfig.AssessmentSection-1){
                        this.globalData.isPrevButtonDisabled = false;
                        //console.log(1)
                    }
                    */
                }
                //console.log('@@@ ',this.CourseConfig.ForceNavigation)
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

        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            //
            this.globalData.isPaused = false;
            var str:string = this.location.path();
            var arr = str.split('/');
            if (arr[arr.length-1] != 'menu' && this.pageStatusList.length > 0) {
                if(this.CourseConfig.HasAudio) {
                    this.globalData.isAudio = this.CourseMenu.topics[this.currentTopic].pages[this.currentPage].isAudio || false;
                    if(this.globalData.isAudio && arr[arr.length-1] != 'languageselection')
                    {
                        this.globalData.audioFile.play();
                    }
                }
            }
        })
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
            //path = '/container/assets/languageselection';
            this.audioAutoPlay("languageselection");
        }
        else
        {
            this.audioAutoPlay("page", this.currentTopic, this.currentPage);
        }
        //console.log(this.CourseConfig.HasLangSelectionPage)
        //this.loadScreen(this.currentTopic, this.currentPage);
    }
    startcourse()
    {
        if(this.globalData.LanguageSelected == 'en')
        {
            this.audioAutoPlay('page', this.currentTopic, this.currentPage);
        }
    }
    reloadAudio()
    {
        this.globalData.audioFile.currentTime = 0;
        this.globalData.audioFile.play();
        this.globalData.isPaused = false;
        //
        //location.reload();
        //this.router.navigate([this.location.path()]);
        //
        $(".pause-btn").removeClass('btnDisabled').addClass('btnEnabled');
    }
    audioAutoPlay(pageType, _topic?, _page?)
    {
        let controllerInstance = this;
        //console.log('audioAutoPlay :: ', this.location.path(), this.location.path().indexOf("languageselection"))
        if(this.CourseConfig.HasAudio) {
            this.globalData.audioFile = document.getElementById('course-audio');
            this.globalData.audioFile.src = "#";
            let audioSrc = "";
            if(_topic != null && _page != null) this.globalData.isAudio = this.CourseMenu.topics[this.currentTopic].pages[this.currentPage].isAudio;
            //console.log("_topic ",_topic, '_page ', _page, ' isAudio ',this.globalData.isAudio)
            if(pageType=="page" && this.globalData.isAudio) {
                audioSrc = "../assets/course_audio/"+this.globalData.LanguageSelected+'/t'+this.pad(this.currentTopic+1)+'/p'+this.pad(this.currentPage+1)+".mp3";
            }else if(pageType == "intro") {
                audioSrc = "";
                this.globalData.audioFile.src = audioSrc;
            }else if(pageType == "languageselection") {
                audioSrc = "";
                this.globalData.audioFile.src = audioSrc;
            }            
            //console.log('pageType ', pageType, 'audioSrc', audioSrc)
            if(pageType == "page" && this.globalData.isAudio) {
                let isAudioLoaded = false;
                this.globalData.audioFile.src = audioSrc;
                this.globalData.audioFile.load();
                this.globalData.audioFile.addEventListener('loadeddata', function(){
                    //this.globalData.LoadContent(pageType,pageId)
                    if(!isAudioLoaded)
                    {
                        isAudioLoaded = true;
                        controllerInstance.loadScreen(pageType, _topic, _page);
                    }
                },false);
                this.globalData.audioFile.addEventListener('ended', function(){
                    controllerInstance.audioFinishedPlaying();
                    $(".pause-btn").removeClass('btnEnabled').addClass('btnDisabled');
                })
                //this.loadScreen(pageType, _topic, _page);
            } else if(pageType == "page" && !this.globalData.isAudio && audioSrc == ""){
                this.loadScreen(pageType, _topic, _page);
            }
            else if(pageType == "languageselection"){
                this.loadScreen(pageType);
            }
            else if(pageType == "intro") {
                this.loadScreen(pageType);
            }            
        }
        else {
            this.loadScreen(pageType, _topic, _page);
        }
    }
    audioFinishedPlaying()
    {
        this.globalData.screenType = this.CourseMenu.topics[this.currentTopic].pages[this.currentPage].screenType;
        if(this.globalData.screenType != "interactivity")
        {
            this.markVisitedPage();
        }
    }
    togglePlay()
    {
        this.globalData.isAudio = this.CourseMenu.topics[this.currentTopic].pages[this.currentPage].isAudio;
        if(this.globalData.isAudio)
        {
            if(this.globalData.isPaused)
            {
                this.globalData.audioFile.play();
                this.globalData.isPaused = false;
            } else {
                this.globalData.audioFile.pause();
                this.globalData.isPaused = true;
            }
        }
    }
    onNextBackHandler(target:any)
    {
        if(this.globalData.isAudio)
        {
            $(".pause-btn").removeClass('btnDisabled').addClass('btnEnabled');
        }
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
        //console.log('Next back ')
        this.audioAutoPlay("page", this.currentTopic, this.currentPage);
    }
    loadScreen(pageType, _topic?, _page?)
    {
        let path:string = "";
        if(pageType == "page")
        {
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
            $(".pause-btn").removeClass('btnDisabled').addClass('btnEnabled');
            this.markVisitedPage();
        }
        else if(pageType == "languageselection")
        {
            this.globalData.isNextButtonDisabled = true;
            this.globalData.isPrevButtonDisabled = true;
            path = '/container/assets/languageselection';
            this.router.navigate([path]);
            $(".pause-btn").removeClass('btnEnabled').addClass('btnDisabled');
        }
    }
    markVisitedPage()
    {
        this.globalData.screenType = this.CourseMenu.topics[this.currentTopic].pages[this.currentPage].screenType;
        this.globalData.isAudio = this.CourseMenu.topics[this.currentTopic].pages[this.currentPage].isAudio;
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