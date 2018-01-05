import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';
import { Page01Component } from './container/topic_01/page01/page01.component';
import { Page02Component } from './container/topic_01/page02/page02.component';
import { JsonParserService } from './json-parser.service';

import { AppRoutersModule } from './app.router';
import { AppControllerModule } from './app.controller';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    FooterComponent,
    Page01Component,
    Page02Component
  ],
  imports: [
    BrowserModule,
    AppRoutersModule,
    AppControllerModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    JsonParserService
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    FooterComponent
  ]
})
export class AppModule { }
