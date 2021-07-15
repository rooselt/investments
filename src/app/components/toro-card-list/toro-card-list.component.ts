import { Component, OnInit, Input } from '@angular/core';
import { Position } from 'src/app/models/position.model';

@Component({
  selector: 'toro-card-list',
  templateUrl: './toro-card-list.component.html',
  styleUrls: ['./toro-card-list.component.scss'],
  host: { class: 'toro-card-list' }
})
export class ToroCardListComponent {

  @Input() listTitle: string;
  @Input()
  set positionList(value: Position[]) {
    debugger;

    this.listColumnA = [];

    if (value != undefined && value.length > 0) {
      // Separando lista em colunas
      this.listColumnA = value;
    }
  }

  listColumnA: Position[];

  constructor() { }

  ngOnInit(): void { }

}
