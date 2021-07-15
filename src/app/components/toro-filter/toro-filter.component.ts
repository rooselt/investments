import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Trends } from 'src/app/models/trends.model';

@Component({
  selector: 'toro-filter',
  templateUrl: './toro-filter.component.html',
  styleUrls: ['./toro-filter.component.scss'],
  host: { class: 'toro-filter' }
})
export class ToroFilterComponent implements OnInit {

  @Input() trendlList: Trends[];

  @Output() changeValue = new EventEmitter();

  @Input('clear')
  set _clear(value: boolean) {
    if (value) {
      this.filterForm.controls.id.setValue(null);
      this.filterForm.controls.symbolName.setValue(null);
    }
  }

  filterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({ id: [''], symbolName: [''] });
    this.filterForm.valueChanges.subscribe(result => this.changeValue.emit(result));
  }

}
