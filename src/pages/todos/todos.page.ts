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
   * Splices item from items array, and saves to service
   * @name deleteItem
   * @param index
   */
  public deleteItem(index): void {
    this.items.splice(index, 1);
    this.todosService.save(this.items);
  }

  public reorderItems(indexes) {
    console.log(indexes);
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
    console.log(this.items);
    this.todosService.save(this.items);
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
  public viewItem(todo, index): void {
    todo.index = index;
    this.navController.push(TodoDetailPage, todo);
  }

}
