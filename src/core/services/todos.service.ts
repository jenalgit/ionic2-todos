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

  public getData(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {

      this.storage.ready().then(() => {
        this.storage.get('todos').then((data) => {
          resolve(data ? JSON.parse(data) : []);
        }, () => {
          // TODO: Error handling
          reject([]);
        });
      });

    });

  }

  public save(data): void {
    let newData = JSON.stringify(data);

    this.storage.ready().then(() => {
      this.storage.set('todos', newData);
    }, () => {
      // TODO: Error handling

    });
  }

}
