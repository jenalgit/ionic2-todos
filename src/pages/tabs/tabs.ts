import { Component } from '@angular/core';

import { AboutPage } from '../todo-detail/about';
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
