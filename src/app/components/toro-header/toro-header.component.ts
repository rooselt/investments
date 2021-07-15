import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'toro-header',
  templateUrl: './toro-header.component.html',
  styleUrls: ['./toro-header.component.scss'],
  host: { class: 'toro-header' }
})
export class ToroHeaderComponent {

  @Input() headerTitle: string;
  @Input() amount: number;
  @Input() price: boolean;

  @Output() changeAmount = new EventEmitter<number>();


}
