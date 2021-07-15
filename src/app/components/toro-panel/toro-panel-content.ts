import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Directive, Input, QueryList, TemplateRef, ViewChildren, ViewContainerRef } from '@angular/core';
import { ToroPanelComponent } from './toro-panel.component';

export interface ItemTemplate {
    template: any;
    identifier: string;
    title: string;
}

@Directive({
    selector: '[portal-template]',
})
export class TemplateDirective {
    @Input() identifier: string;
    @Input('portal-title') portalTitle: string;

    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive()
export class ToroPanelContent {
    @ViewChildren(TemplateDirective) templates!: QueryList<TemplateRef<any>>;

    public overlay: Overlay;
    public overlayRef: OverlayRef;
    public viewContainerRef: ViewContainerRef;
    private listAll: Array<ItemTemplate> = [];
    private currentContent: any;

    constructor(overlay, viewContainerRef) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
    }

    showPanel(identifier: string): void {
        const config = new OverlayConfig();

        config.positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        config.hasBackdrop = true;
        config.scrollStrategy = this.overlay.scrollStrategies.block();

        this.overlayRef = this.overlay.create(config);


        const modal = this.overlayRef.attach(new ComponentPortal(ToroPanelComponent, this.viewContainerRef)).instance;
        modal.component = this.current(identifier)['template'];
        modal.title = this.current(identifier)['title'];

        this.overlayRef.backdropClick().subscribe(_ => this.overlayRef.dispose());

        modal.close.subscribe(_ => this.overlayRef.dispose());

        this.currentContent = modal;
    }

    listTemplates() {
        this.templates.forEach(element => {
            this.listAll.push({
                template: new TemplatePortal(element['templateRef'], this.viewContainerRef),
                identifier: element['identifier'],
                title: element['portalTitle']
            });
        });
    }

    private current(identifier: string): object {
        for (let i = 0; i < this.listAll.length; i++) {
            const ref: any = this.listAll[i].template.templateRef;

            if (identifier == this.listAll[i].identifier) {
                return this.listAll[i];
            }
        }
    }

    get panelTitle(): string {
        return this.currentContent.title;
    }

    set panelTitle(title: string) {
        this.currentContent.title = title;
    }

    closePanel() {
        this.overlayRef.dispose();
    }
}
