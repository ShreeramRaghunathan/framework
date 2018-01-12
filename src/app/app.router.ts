import { RouterModule, Routes, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { LanguageselectionComponent } from './container/assets/languageselection/languageselection.component';
import { Page01Component } from './container/screens/topic_01/page01/page01.component';
import { Page02Component } from './container/screens/topic_01/page02/page02.component';

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