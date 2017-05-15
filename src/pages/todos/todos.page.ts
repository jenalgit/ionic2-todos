import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { AddTodoPage } from '../add-todo/add-todo.page';
import { Todo } from '../../core/models/todo.model';
import { TodoDetailPage } from '../todo-detail/todo-detail.page';

import { TodosService } from '../../core/services/todos.service';

@Component({
  selector: 'page-todos',
  templateUrl: 'todos.page.html'
})

/**
 * Controller for the TodosPage component
 * @class TodosPage
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class TodosPage {

  public items: Array<Todo> = [];

  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private todosService: TodosService) {}

  /**
   * On load, populate the items array
   * @name ionViewDidLoad
   */
  ionViewDidLoad() {

    this.todosService.updates().subscribe(data => {
      this.items = data;
    });

  }

  /**
   * Present Add Item modal
   * @name openAddItemModal
   */
  public openAddItemModal(): void {
    let addModal = this.modalController.create(AddTodoPage);
    addModal.present();
  }

  /**
   * Removes item from items
   * @name removeItem
   * @param item
   */
  public removeItem(item) {
    this.todosService.removeTodo(item);
  }

  /**
   * Reorders items - using 'indexes' information, used for drag and drop
   * @name reorder
   * @param indexes
   */
  public reorder(indexes) {
    this.todosService.reorder(indexes);
  }

  /**
   * Toggle 'completed' status of item
   * @name toggleItemCompleted
   * @param item
   */
  public toggleItemCompleted(item): void {
    this.todosService.toggleItemCompleted(item);
  }

  /**
   * Open TodoDetail for a given item
   * @name viewItem
   */
  public viewItem(item): void {
    this.navController.push(TodoDetailPage, item);
  }

}
