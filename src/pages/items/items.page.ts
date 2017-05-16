import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item.page';


import { Item } from '../../core/models/item.model';
import { ItemDetailPage } from '../item-detail/item-detail.page';

import { ItemsService } from '../../core/services/items.service';

@Component({
  selector: 'page-items',
  templateUrl: 'items.page.html'
})

/**
 * Controller for the ItemsPage component
 * @class ItemsPage
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class ItemsPage {

  public items: Array<Item> = [];

  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private itemsService: ItemsService) {}

  /**
   * On load, populate the items array
   * @name ionViewDidLoad
   */
  ionViewDidLoad() {

    this.itemsService.updates().subscribe(data => {
      this.items = data;
      console.log(this.items);
    });

  }

  public archiveItem(item): void {
    this.itemsService.archiveItem(item);
  }

  /**
   * Present Add Item modal
   * @name openAddItemModal
   */
  public openAddItemModal(): void {
    let addModal = this.modalController.create(AddItemPage);
    addModal.present();
  }

  /**
   * Removes item from items
   * @name removeItem
   * @param item
   */
  public removeItem(item) {
    this.itemsService.removeItem(item);
  }

  /**
   * Reorders items - using 'indexes' information, used for drag and drop
   * @name reorder
   * @param indexes
   */
  public reorder(indexes) {
    this.itemsService.reorder(indexes);
  }

  /**
   * Toggle 'completed' status of item
   * @name toggleItemCompleted
   * @param item
   */
  public toggleItemCompleted(item): void {
    this.itemsService.toggleItemCompleted(item);
  }

  /**
   * Open TodoDetail for a given item
   * @name viewItem
   */
  public viewItem(item): void {
    this.navController.push(ItemDetailPage, item);
  }

}
