import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import { Todo } from '../models/todo.model';

@Injectable()
/**
 * Service provider for Items
 * @class ItemsService
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class TodosService {

  todos: Array<Todo>;

  todosObservable: any;
  todosObserver: any;


  /**
   * @name constructor
   * @param storage
   */
  constructor(public storage: Storage) {

    this.todosObservable = Observable.create(observer => {
      this.todosObserver = observer;

      // Grab data from storage:
      this.getFromStorage().then((todos) => {
        this.todos = todos;
        this.todosObserver.next(this.todos);
      }, () => {
        this.todos = [];
        this.todosObserver.next(this.todos);
      });
    });

  }

  /**
   * Adds todo to todos, updates observer, and saves to storage
   * @name addTodo
   * @param todo
   */
  public addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.todosObserver.next(this.todos);

    this.saveToStorage();
  }

  /**
   * Gets todos data - currently just from Ionic 2 storage source
   * @name getData
   * @returns {Promise<Todo[]>}
   */
  public getFromStorage(): Promise<Todo[]> {
    return new Promise((resolve) => {

      this.storage.ready().then(() => {
        this.storage.get('todos').then((data) => {
          resolve(data ? JSON.parse(data) : []);
        });
      });

    });

  }

  /**
   * Erases all items from storage
   * @name removeAll
   */
  public removeAll(): void {

    this.todos = [];
    this.todosObserver.next(this.todos);
    this.storage.set('items', []);
  }

  /**
   * Removes item from items
   * @name removeTodo
   * @param todo
   */
  public removeTodo(todo): void {
    let index = this.todos.indexOf(todo);

    this.todos.splice(index, 1);
    this.saveToStorage();

    this.todosObserver.next(this.todos);
  }

  /**
   * Reorders items based on indexes information
   * @name reorder
   * @param indexes
   */
  public reorder(indexes): void {
    let element = this.todos[indexes.from];
    this.todos.splice(indexes.from, 1);
    this.todos.splice(indexes.to, 0, element);

    this.todosObserver.next(this.todos);

    this.saveToStorage();
  }

  /**
   * Saves list to storage
   * @name saveToStorage
   * @param data
   */
  private saveToStorage(): void {
    let newData = JSON.stringify(this.todos);

    this.storage.ready().then(() => {
      this.storage.set('todos', newData);
    });
  }

  /**
   * @name toggleItemCompleted
   * @param item
   */
  public toggleItemCompleted(item) {

    let index = this.todos.indexOf(item);
    this.todos[index].completed = !this.todos[index].completed;

    this.todosObserver.next(this.todos);
    this.saveToStorage();

  }

  public updateItem(item) {
    let index = this.todos.indexOf(item);

    this.todos[index] = item;

    this.todosObserver.next(this.todos);
    this.saveToStorage();
  }

  /**
   * Returns todos observable
   * @name updates
   * @returns {any}
   */
  public updates(): Observable<Todo[]> {
    return this.todosObservable;
  }

}
