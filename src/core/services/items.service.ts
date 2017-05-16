import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Item } from '../models/item.model';

@Injectable()
/**
 * Service provider for Items
 * @class ItemsService
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class ItemsService {

  items: Array<Item>;

  itemsObservable: any;
  itemsObserver: any;

  storageKey: string = 'items';


  /**
   * @name constructor
   * @param storage
   */
  constructor(public storage: Storage) {

    this.itemsObservable = Observable.create(observer => {
      this.itemsObserver = observer;

      // Grab data from storage:
      this.getFromStorage().then((items) => {
        this.items = items;
        this.itemsObserver.next(this.items);
      }, () => {
        this.items = [];
        this.itemsObserver.next(this.items);
      });
    });

  }

  /**
   * Adds item to items, updates observer, and saves to storage
   * @name addItem
   * @param item
   */
  public addItem(item: Item): void {
    this.items.push(item);
    this.itemsObserver.next(this.items);
    this.saveToStorage();
  }

  /**
   * Sets item to archive and saves items to storage
   * @name archiveItem
   * @param item
   */
  public archiveItem(item: Item): void {
    let index = this.items.indexOf(item);

    this.items[index].archived = true;

    this.itemsObserver.next(this.items);
    this.saveToStorage();
  }

  /**
   * Gets items data from storage source
   * @name getFromStorage
   * @returns {Promise<Item[]>}
   */
  public getFromStorage(): Promise<Item[]> {
    return new Promise((resolve) => {

      this.storage.ready().then(() => {
        this.storage.get(this.storageKey).then((data) => {
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

    this.items = [];
    this.itemsObserver.next(this.items);
    this.storage.set(this.storageKey, []);
  }

  /**
   * Removes item from items
   * @name removeItem
   * @param item
   */
  public removeItem(item: Item): void {
    let index = this.items.indexOf(item);

    this.items.splice(index, 1);
    this.saveToStorage();

    this.itemsObserver.next(this.items);
  }

  /**
   * Reorders items based on indexes information
   * @name reorder
   * @param indexes
   */
  public reorder(indexes): void {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);

    this.itemsObserver.next(this.items);

    this.saveToStorage();
  }

  /**
   * Saves list to storage
   * @name saveToStorage
   * @param data
   */
  private saveToStorage(): void {
    let newData = JSON.stringify(this.items);

    this.storage.ready().then(() => {
      this.storage.set(this.storageKey, newData);
    });
  }

  /**
   * @name toggleItemCompleted
   * @param item
   */
  public toggleItemCompleted(item: Item): void {

    let index = this.items.indexOf(item);
    this.items[index].completed = !this.items[index].completed;

    // If completed, add completedAt time:
    if (this.items[index].completed) {
      this.items[index].completedAt = new Date().toString();
    }

    this.itemsObserver.next(this.items);
    this.saveToStorage();

  }

  /**
   * Adds updated item to items and saves to storage
   * @name updateItem
   * @param item
   */
  public updateItem(item: Item): void {
    let index = this.items.indexOf(item);

    this.items[index] = item;

    this.itemsObserver.next(this.items);
    this.saveToStorage();
  }

  /**
   * Returns items observable
   * @name updates
   * @returns {any}
   */
  public updates(): Observable<Item[]> {
    return this.itemsObservable;
  }

}
