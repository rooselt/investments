import { Component, Input } from '@angular/core';

export class IAccessAction {
  id: number;
  name: string;
  disabled: boolean;
  action: Function;
}

@Component({
  selector: 'toro-access-now',
  templateUrl: './toro-access-now.component.html',
  styleUrls: ['./toro-access-now.component.scss'],
  host: { class: 'toro-access-now' }
})
export class ToroAccessNowComponent {

  @Input() accessTitle: string;
  @Input() accessImage: string;
  @Input() accessActionList: IAccessAction[];

  constructor() { }

  ngOnInit(): void {
  }

}
