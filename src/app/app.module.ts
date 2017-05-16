import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings.page';
import { ItemDetailPage } from '../pages/item-detail/item-detail.page';
import { ItemsPage } from '../pages/items/items.page';
import { AddItemPage } from '../pages/add-item/add-item.page';

import { TabsPage } from '../pages/tabs/tabs';

import { ItemsService } from '../core/services/items.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    AddItemPage,
    ItemDetailPage,
    ItemsPage,
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
    AddItemPage,
    ItemDetailPage,
    ItemsPage,
    TabsPage
  ],
  providers: [
    ItemsService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
