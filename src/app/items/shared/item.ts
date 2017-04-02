// interface ItemInterface {
//   // $key: string;
//   title: string;
//   body: string;
// }

export class Item {
  $key: string;
  title: string;
  body: string;
  active: boolean = true;
  timeStamp: Date = new Date();
}
