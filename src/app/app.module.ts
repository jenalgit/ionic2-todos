import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings.page';
import { TodoDetailPage } from '../pages/todo-detail/todo-detail.page';
import { TodosPage } from '../pages/todos/todos.page';
import { AddTodoPage } from '../pages/add-todo/add-todo.page';

import { TabsPage } from '../pages/tabs/tabs';

import { TodosService } from '../core/services/todos.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    AddTodoPage,
    TodoDetailPage,
    TodosPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['sqlite', 'websql', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    AddTodoPage,
    TodoDetailPage,
    TodosPage,
    TabsPage
  ],
  providers: [
    TodosService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
