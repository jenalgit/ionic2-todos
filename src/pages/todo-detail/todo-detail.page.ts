import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Todo } from '../../core/models/todo.model';

import { TodosService } from '../../core/services/todos.service';

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
  public editMode: boolean = false;

  constructor(public navParams: NavParams, private todosService: TodosService) {}

  /**
   * On load, get todo data from navigation parameters
   * @name ionViewDidLoad
   */
  ionViewDidLoad() {
    this.todo = this.navParams.data;
  }

  /**
   * Saves changes made to item
   * @name saveChanges
   */
  public saveChanges(): void {

    this.todosService.updateItem(this.todo);
    this.toggleEdit();
  }

  /**
   * Toggles edit mode boolean
   * @name toggleEdit
   */
  public toggleEdit(): void {
    this.editMode = !this.editMode;
  }

}
