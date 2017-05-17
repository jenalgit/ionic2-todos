import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { ItemsService } from '../../core/services/items.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.page.html'
})
export class SettingsPage {

  constructor(public alertController: AlertController, private itemsService: ItemsService) {

  }

  public showEraseConfirmation(): void {
    let confirm = this.alertController.create({
      title: 'Erase all items?',
      message: 'Do you really want to erase all todo items?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.itemsService.removeAll();
          }
        }
      ]
    });
    confirm.present();
  }

}
