import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { slide } from '../../animations/animations';

@Component({
    selector: 'toro-panel',
    templateUrl: './toro-panel.component.html',
    styleUrls: ['./toro-panel.component.scss'],
    host: { class: 'toro-panel' },
    animations: [slide],
})
export class ToroPanelComponent {
    @Input() title: string;
    @Input() component: Component;

    @Output() close = new EventEmitter();

    // Fecha painel com ESC
    @HostListener('document:keydown.escape', ['$event']) 
    onKeydownHandler(event: KeyboardEvent) {
        this.closePanel();
    }

    ngOnDestroy(): void {
        // Após destruir o componente o portal é fechado
        setTimeout(_ => this.closePanel(), 1);
    }

    public closePanel(): void {
        this.close.emit();
    }
}
