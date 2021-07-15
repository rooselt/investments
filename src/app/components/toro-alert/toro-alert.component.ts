import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { fade, fadeInOut } from 'src/app/animations/animations';

@Component({
    selector: 'toro-alert',
    templateUrl: './toro-alert.component.html',
    styleUrls: ['./toro-alert.component.scss'],
    host: { class: 'toro-alert' },
    animations: [fade, fade, fadeInOut],
})
export class ToroAlertComponent {
    private timeout: any;

    @Input() type: string;
    @Input() text: string;
    @Input() icon: string;
    @Input() time: number;
    @Input() close: boolean;
    @Input() show: boolean;
    @Output() showChange = new EventEmitter();

    ngOnInit(): void {
        this.startTimer();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.startTimer();
    }

    public hide(): void {
        clearTimeout(this.timeout);

        this.show = false;
        this.showChange.emit(this.show);
    }

    public startTimer(): void {
        clearTimeout(this.timeout);

        if (this.time > 0 && this.show) {
            this.timeout = setTimeout(() => this.hide(), this.time);
        }
    }
}
