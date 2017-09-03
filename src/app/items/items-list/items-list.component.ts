import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items: FirebaseListObservable<Item[]>;

  showSpinner = true;


  constructor(private itemSvc: ItemService) { }

  ngOnInit() {
    this.items = this.itemSvc.getItemsList({ limitToLast: 5 })
    this.items.subscribe(() => this.showSpinner = false)
  }

  deleteItems() {
    this.itemSvc.deleteAll()
  }



}
