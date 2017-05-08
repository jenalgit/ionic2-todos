import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Todo } from '../../core/models/todo.model';

@Component({
  selector: 'page-todo-detail',
  templateUrl: 'todo-detail.page.html'
})
/**
 * @class TodoDetailPage
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class TodoDetailPage {

  public todo: Todo = new Todo('', '');

  constructor(public navParams: NavParams) {}

  /**
   * On load, get todo data from navigation parameters
   * @name ionViewDidLoad
   */
  ionViewDidLoad() {
    this.todo = this.navParams.data;
  }

}
