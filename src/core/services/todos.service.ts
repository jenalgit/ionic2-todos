import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { Todo } from '../models/todo.model';

@Injectable()
/**
 * Service provider for Todos
 * @class TodosService
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class TodosService {

  constructor(public storage: Storage) {}

  /**
   * Erases all todos from storage
   * @name eraseAll
   */
  public eraseAll() {
    this.storage.set('todos', []);
  }

  /**
   * Gets todos data - currently just from Ionic 2 storage source
   * @name getData
   * @returns {Promise<Todo[]>}
   */
  public getData(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {

      this.storage.ready().then(() => {
        this.storage.get('todos').then((data) => {
          resolve(data ? JSON.parse(data) : []);
        }, () => {
          reject([]);
        });
      });

    });

  }

  /**
   * Saves list to storage
   * @param data
   */
  public save(data): void {
    let newData = JSON.stringify(data);

    this.storage.ready().then(() => {
      this.storage.set('todos', newData).then(() => {}, (error) => {
        // TODO: Error Handling
      });
    }, (error) => {
      // TODO: Error handling
    });
  }

}
