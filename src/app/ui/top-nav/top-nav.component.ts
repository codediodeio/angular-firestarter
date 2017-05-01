import { Component, OnInit } from '@angular/core';
import { trigger,state,style,animate,transition } from '@angular/animations';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  animations: [
  trigger('collapse', [
    state('open', style({
      opacity: '1',
      display: 'block',
      transform: 'translate3d(0, 0, 0)'
    })),
    state('closed',   style({
      opacity: '0',
      display: 'none',
      transform: 'translate3d(0, -100%, 0)'
    })),
    transition('closed => open', animate('200ms ease-in')),
    transition('open => closed', animate('100ms ease-out'))
  ])
]
})
export class TopNavComponent implements OnInit {

  // collapse:string = "closed";
  show:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.show = !this.show
    // this.collapse = this.collapse == "open" ? 'closed' : 'open';

  }

}
