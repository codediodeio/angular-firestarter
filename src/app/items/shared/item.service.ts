import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Item } from './item';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  private basePath = '/items';

  itemsRef: AngularFireList<Item>;
  itemRef:  AngularFireObject<Item>;

  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list('/items');
  }

  // Return an observable list of Items
  getItemsList(): Observable<Item[]> {
    return this.itemsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }) );
    });
  }

  // Return a single observable item
  getItem(key: string): Observable<Item | null> {
    const itemPath = `${this.basePath}/${key}`;
    const item = this.db.object(itemPath).valueChanges() as Observable<Item | null>;
    return item;
  }

  // Create a brand new item
  createItem(item: Item): void {
    this.itemsRef.push(item);
  }

  // Update an exisiting item
  updateItem(key: string, value: any): void {
    this.itemsRef.update(key, value);
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.itemsRef.remove(key);
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.itemsRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
