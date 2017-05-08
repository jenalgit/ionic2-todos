import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { Todo } from '../../core/models/todo.model';

@Component({
  selector: 'page-add-todo',
  templateUrl: 'add-todo.page.html'
})
/**
 * Controller for AddTodoPage component
 * @name AddTodoPage
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class AddTodoPage {

  public title: string;
  public description: string;

  constructor(public navController: NavController, public view: ViewController) {}

  public saveItem(): void {

    let newItem = new Todo(this.title, this.description);

    this.view.dismiss(newItem);

  }

  public close(): void {
    this.view.dismiss();
  }

}
