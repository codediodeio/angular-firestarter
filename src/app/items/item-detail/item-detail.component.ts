import { Component, Input } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent {

  @Input() item: Item;

  constructor(private itemSvc: ItemService) { }

  updateTimeStamp() {
    const date = new Date().getTime();
    this.itemSvc.updateItem(this.item.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.itemSvc.updateItem(this.item.$key, { active: value });
  }

  deleteItem() {
    this.itemSvc.deleteItem(this.item.$key);
  }

}
