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
    public navController: NavController,
    private todosService: TodosService) {}

  /**
   * On load, populate the items array
   * @name ionViewDidLoad
   */
  ionViewDidLoad() {

    this.todosService.getData().then((data) => {
      this.items = data;
    }, () => {
      // Error handling:
    });
  }

  /**
   * Present modal, and add onDidDismiss for save item
   * @name addItem
   */
  public addItem(): void {
    let addModal = this.modalController.create(AddTodoPage);

    addModal.onDidDismiss((item) => {

      if(item){
        this.saveItem(item);
      }

    });

    addModal.present();
  }

  /**
   * Pushes new item to items array, and saves to service
   * @name saveItem
   * @param item Todo
   */
  private saveItem(item): void {
    this.items.push(item);
    this.todosService.save(this.items);
  }

  /**
   * Open TodoDetail for a given todo item
   * @name viewItem
   */
  public viewItem(todo): void {
    this.navController.push(TodoDetailPage, todo);
  }

}
