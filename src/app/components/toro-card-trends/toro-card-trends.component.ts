import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Trends } from 'src/app/models/trends.model';


@Component({
  selector: 'toro-card-trends',
  templateUrl: './toro-card-trends.component.html',
  styleUrls: ['./toro-card-trends.component.scss'],
  host: { class: 'toro-card-trends' }
})

export class ToroCardTrendsComponent implements OnInit {
  @Output() onClick = new EventEmitter<number>();

  @Input() trendsFunction: any;
  @Input() listTitle: string;
  @Input() set trendsList(value: Trends[]) {
    debugger;

    this.listColumnA = [];

    if (value != undefined && value.length > 0) {
      // Separando lista em colunas
      this.listColumnA = value;
    }
  }

  click(e) {
    this.onClick.emit(e);
  }

  listColumnA: Trends[];

  constructor() { }

  ngOnInit(): void { }

}
