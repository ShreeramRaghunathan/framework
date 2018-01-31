import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';
import { Page01Component } from './container/screens/topic_01/page01/page01.component';
import { Page02Component } from './container/screens/topic_01/page02/page02.component';
import { Page03Component } from './container/screens/topic_01/page03/page03.component';
import { Page04Component } from './container/screens/topic_01/page04/page04.component';
import { JsonParserService } from './json-parser.service';

import { AppRoutersModule } from './app.router';
import { AppControllerModule } from './app.controller';
import { LanguageselectionComponent } from './container/assets/languageselection/languageselection.component';
import { IntroComponent } from './container/assets/intro/intro.component';
import { DdDragDropType1Directive } from './dd-drag-drop-type1.directive';



/*import { CollapseDirective } from './header/collapse.directive';*/


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    FooterComponent,
    Page01Component,
    Page02Component,
    Page03Component,
    Page04Component,
    LanguageselectionComponent,
    IntroComponent,
    DdDragDropType1Directive    
  ],
  imports: [
    BrowserModule,
    AppRoutersModule,
    AppControllerModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    JsonParserService,
    DataService,
    Location
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    FooterComponent
  ]
})
export class AppModule { }
