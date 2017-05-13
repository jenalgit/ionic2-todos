import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings.page';
import { TodosPage } from '../todos/todos.page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  todosRoot = TodosPage;
  settingsRoot = SettingsPage;

  constructor() {

  }
}
