import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings.page';
import { ItemsPage } from '../items/items.page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  itemsRoot = ItemsPage;
  settingsRoot = SettingsPage;

  constructor() {

  }
}
