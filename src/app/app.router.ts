import { RouterModule, Routes, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { LanguageselectionComponent } from './container/assets/languageselection/languageselection.component';
import { Page01Component } from './container/screens/topic_01/page01/page01.component';
import { Page02Component } from './container/screens/topic_01/page02/page02.component';
import { Page03Component } from './container/screens/topic_01/page03/page03.component';
import { Page04Component } from './container/screens/topic_01/page04/page04.component';
import { Page05Component } from './container/screens/topic_01/page05/page05.component';

const appRoutes:Routes = [
    {
        path: '',
        redirectTo:'container/screens/topic_01/page01',
        pathMatch:'full'
    },
    {
        path:'container/assets/languageselection',
        component:LanguageselectionComponent
    },
    {
        path:'container/screens/topic_01/page01',
        component:Page01Component
    },
    {
        path:'container/screens/topic_01/page02',
        component:Page02Component
    },
    {
        path:'container/screens/topic_01/page03',
        component:Page03Component
    },
    {
        path:'container/screens/topic_01/page04',
        component:Page04Component
    },
    {
        path:'container/screens/topic_01/page05',
        component:Page05Component
    },
    {
        path:'container/screens/topic_02/page01',
        component:Page01Component
    },
    {
        path:'container/screens/topic_02/page02',
        component:Page02Component
    }
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes, {useHash: true, initialNavigation: false})
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutersModule {}