import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'toro-card',
  templateUrl: './toro-card.component.html',
  styleUrls: ['./toro-card.component.scss'],
  host: { class: 'toro-card' }
})
export class ToroCardComponent {

  @Input() bottomDetail: boolean;

  ngOnInit(): void {
    this.bottomDetail = this.bottomDetail !== undefined;
  }

}