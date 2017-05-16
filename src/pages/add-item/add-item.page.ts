import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Item } from '../../core/models/item.model';

import { ItemsService } from '../../core/services/items.service';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.page.html'
})
/**
 * Controller for AddItemPage component
 * @name AddItemPage
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class AddItemPage {

  public item : FormGroup;

  constructor(private formBuilder: FormBuilder, private itemsService: ItemsService, public view: ViewController) {

    this.item = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });

  }

  /**
   * Creates new item, adds via service, and dismisses view
   * @name saveItem
   */
  public addItem(): void {
    let newItem = new Item(this.item.value.title, this.item.value.description);
    this.itemsService.addItem(newItem);

    this.view.dismiss();
  }

  /**
   * Dismisses view
   * @name close
   */
  public close(): void {
    this.view.dismiss();
  }

}
