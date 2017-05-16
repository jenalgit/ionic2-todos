import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Item } from '../../core/models/item.model';

import { ItemsService } from '../../core/services/items.service';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.page.html'
})
/**
 * @class ItemDetailPage
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class ItemDetailPage {

  public item: Item = new Item('', '');
  public editMode: boolean = false;

  constructor(public navParams: NavParams, private itemsService: ItemsService) {}

  /**
   * On load, get item data from navigation parameters
   * @name ionViewDidLoad
   */
  ionViewDidLoad() {
    this.item = this.navParams.data;
  }

  /**
   * Saves changes made to item
   * @name saveChanges
   */
  public saveChanges(): void {
    this.itemsService.updateItem(this.item);
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
