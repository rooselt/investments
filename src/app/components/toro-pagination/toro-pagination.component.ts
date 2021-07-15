/**
 * Diretiva toro-pagination
 * Exemplo de uso:
 * <toro-pagination ([model])="pagination">
 *     <div *ngFor="let item of pagination.items"> item </div>
 * </toro-pagination>
 *
 * Os parâmetros do objeto "model" está definido na interface ItoroPagination.
 *
 * */

import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigurationValue } from 'src/app/models/config/configuration-value.model';
import { fadeIn } from '../../animations/animations';
// import { configIdentifiers } from '../../services/configuration/configuration.service';

export interface IPaginationSelectItem {
    label: string;
    value: number | string;
    isNew?: boolean;
}

/** Interface de resultados para paginação. */
export interface ItoroPaginationResponse {
    /** Total de itens. */
    count: number;

    /** Lista de itens. */
    data: any[];
}

/** Interface para modelo de paginação. */
export interface ItoroPagination {
    /** Sempre utilizar scroll, independente da resolução da tela. */
    alwaysScroll?: boolean;

    /** Serviço que carrega valores padrões.
     *  Deve retornar uma lista com resultados na sequência [ordem, itens por página]. */
    defaultOptionsService?: () => Observable<Array<ConfigurationValue>>;

    /** Aparece botão "Ver mais" em visão mobile. */
    disableLazyLoad?: boolean;

    /** Se true, dados da paginação são salvas na query string. */
    enableQuery?: boolean;

    /** Lista de itens exibidos em tela. (Apenas leitura) */
    items?: any[];

    /** Defina como true para fazer requisição. */
    load?: boolean;

    /** Defina como true para repetir a requisição. */
    refresh?: boolean;

    /** Indica se há requisição em andamento. (Apenas leitura) */
    loading?: boolean;

    /** Função chamada quando ocorre um erro. */
    onError?: (err?: any) => void;

    /** Função chamada ao carregar item. */
    onSuccess?: (result: ItoroPaginationResponse) => void;

    /** Ordem da listagem. */
    order?: number | string;

    /** Listagem de ordens. */
    orderOptions?: IPaginationSelectItem[] | (() => Observable<IPaginationSelectItem[]>);

    /** Itens por página. Por padrão é 10. */
    perPage?: number;

    /** Listagem de itens por página. */
    perPageOptions?: number[] | (() => Observable<number[]>);

    /** Listagem de itens por página em visão mobile. Por padrão é 6. */
    perScroll?: number;

    /** Serviço de listagem de itens. */
    service: any;

    /** nome do metodo a ser chamado no serviço */
    method?: string;

    /** Função que configura os parâmetros para requisição. */
    serviceParams?: (params: any) => any;

    /** Permanece na página ao recarregar. Deve ser definido antes de "load = true". */
    stayInPage?: boolean;

    /** Se true exibe a seleção de itens por pagina no cabeçalho */
    headerPerPage?: boolean;

    /** Se true exibe os botões de paginação no cabeçalho */
    headerPagination?: boolean;

    /** Página atual. */
    currentPage?: number;

    /** Indica se está carregando pela primeira vez. */
    firstLoad?: boolean;

    /** Indica se haverá paginação reversa */
    reverse?: boolean;

    /** Todos os itens acumulados. */
    allItems?: any[];

    /** Total de itens no servidor. */
    itemsCount?: number;

    /** Desabilita a paginação quando o usuário deseja exibir tudo na tela */
    disabled?: boolean;

    /** Oculta cabeçalho com options order e pageSize, ignorando outras regras de exibição. */
    hideOptionsHeader?: boolean;

    /** Ignora o evento de window resize */
    ignoreWindowResize?: boolean;
}

@Component({
    selector: 'toro-pagination',
    templateUrl: './toro-pagination.component.html',
    styleUrls: ['./toro-pagination.component.scss'],
    animations: [fadeIn],
})
export class ToroPagination {
    @Input()
    model: ItoroPagination;

    @ViewChild('root', { static: true }) root: ElementRef;

    /** Botões de navegação por página. */
    private BUTTONS_PER_PAGE = 5;

    /** Distância para carregar itens por lazy load antecipadamente. */
    private SCROLL_DISTANCE = 200;

    /** Cache de itens. */
    private cache: any[] = [];

    /** Página atual. */
    public currentPage = 0;

    /** Indica erro na requisição. */
    public error = false;

    /** Indica se está carregando pela primeira vez. */
    public firstLoad = true;

    /** Listagem de itens. */
    public items: any[] = [];

    /** Total de itens. */
    public itemsCount = 0;

    /** Indica se está na visão mobile e deve usar lazy load. */
    public mobile = window.innerWidth < 768;

    /** Botões de navegação. */
    public navButtons: number[] = [];

    /** Requisições pendentes para serviços. */
    public pendingServiceRequests = 0;

    /** Elemento usado para scroll. */
    private scrollElement: HTMLElement;

    /** Total de páginas. */
    public totalPages = 0;

    public perPageOptions: any = [10, 20, 30, 50];

    /** Indica se o array deve ser incrementado a partir de carregamento de páginas anteriores */
    public incrementPrev = false;

    /** Página atual do incremento de páginas anteriores. */
    public currentPageLeft = 0;

    /** Indica se haverá paginação reversa */
    public reverse = false;

    /** Desabilita a paginação quando o usuário deseja exibir tudo na tela */
    public disabled = false;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private location: Location,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }

    /** Executado ao iniciar. */
    ngOnInit() {
        const root = this.root.nativeElement.parentElement;
        this.scrollElement = this.getOverflowParentElement(root);
        this.scrollElement.addEventListener('scroll', e => this.onScroll());
        this.changeExpressions();
    }

    /** Detecta mudanças no modelo para recarregar. */
    ngDoCheck() {
        if (this.model && this.model.load) {
            this.model.load = false;
            this.load();
        }

        if (this.model && this.model.refresh) {
            this.model.refresh = false;
            this.cache = [];
            this.refresh();
        }
    }

    /**
     *  Seleciona um elemento com scroll Y.
     * @param element
     */
    getOverflowParentElement(element: HTMLElement): HTMLElement {
        if (!element) return window.document.body;
        const overflowY = window.getComputedStyle(element, null).overflowY;
        if (overflowY == 'auto' || overflowY == 'scroll') return element;
        return this.getOverflowParentElement(element.parentElement);
    }

    /**
     * Vai para página. A contagem inicia em 0.
     * @param page
     */
    goToPage(page: number) {
        this.incrementPrev = page < this.currentPage;

        if (this.incrementPrev) {
            this.currentPageLeft = page;
        } else {
            this.currentPage = page;
        }

        this.loadNext();
    }

    /** Inicializa o modelo e faz requisição. */
    initialize() {
        // Inicializa o modelo.
        this.model.onError = this.model.onError || (() => { });
        this.model.onSuccess = this.model.onSuccess || (() => { });
        this.model.perScroll = this.model.perScroll || 6;
        this.model.serviceParams = this.model.serviceParams || ((x: any) => x);
        this.model.items = this.items;
        this.model.allItems = this.cache;
        this.model.itemsCount = this.itemsCount;
        if (!this.model.order && this.model.orderOptions)
            this.model.order = (<IPaginationSelectItem[]>this.model.orderOptions)[0].value;
        if (!this.model.perPage) {
            this.model.perPage = 10;
            if (this.model.perPageOptions) this.model.perPage = (<number[]>this.model.perPageOptions)[0];
        }
        this.mobile = window.innerWidth < 768 || this.model.alwaysScroll;

        if (this.model.currentPage != undefined) {
            this.currentPage = this.model.currentPage;

            if (this.model.reverse != undefined) {
                this.reverse = this.model.reverse;
                this.currentPageLeft = this.currentPage;
            }
        }

        if (this.model.firstLoad != undefined) this.firstLoad = this.model.firstLoad;

        if (this.model.disabled != undefined) this.disabled = this.model.disabled;

        // Configura modelo a partir da query na URL.
        if (this.firstLoad && this.model.enableQuery) {
            const queryParams = this.router.parseUrl(this.location.path()).queryParams;
            this.model.perPage = parseInt(queryParams['pageSize']) || this.model.perPage;
            if (queryParams['order']) this.model.order = parseInt(queryParams['order']);
            if (!this.mobile) this.currentPage = (parseInt(queryParams['page']) || 1) - 1;
            this.loadNext();
        } else this.reset();
        this.firstLoad = false;

        if (this.model.perPageOptions) this.perPageOptions = this.model.perPageOptions;
    }

    /** Faz as requisições de configuração do modelo. */
    load() {
        if (!this.firstLoad) return this.initialize();

        if (this.model.orderOptions instanceof Function) {
            this.pendingServiceRequests++;
            this.model.orderOptions().subscribe(options => {
                this.model.orderOptions = options;
                this.pendingServiceRequests--;
                if (this.pendingServiceRequests == 0)
                    this.initialize();
            });
        }

        if (this.model.perPageOptions instanceof Function) {
            this.pendingServiceRequests++;
            this.model.perPageOptions().subscribe(options => {
                this.model.perPageOptions = options;
                this.perPageOptions = options;
                this.pendingServiceRequests--;
                if (this.pendingServiceRequests == 0)
                    this.initialize();
            });
        }

        if (this.model.defaultOptionsService) {
            this.pendingServiceRequests++;
            this.model.defaultOptionsService().subscribe(values => {
                // this.model.order = values.filter(x => {
                //     return x.identifier == configIdentifiers.notification.DefaultListOrder;
                // })[0].value;
                // this.model.perPage = values.filter(x => {
                //     return x.identifier == configIdentifiers.notification.DefaultListPageCount;
                // })[0].value;
                this.pendingServiceRequests--;
                if (this.pendingServiceRequests == 0) this.initialize();
            });
        }

        if (this.pendingServiceRequests == 0)
            this.initialize();
    }

    /** Carrega mais resultados. */
    loadNext() {
        if (this.model.loading) return;
        this.model.loading = true;
        this.error = false;

        let page = this.currentPage;

        if (this.incrementPrev) {
            page = this.currentPageLeft;
        }

        const start = page * this.pageSize;
        const end = Math.min((page + 1) * this.pageSize, this.itemsCount) || this.pageSize;
        const pageLoaded = this.cache.slice(start, end).filter(item => !!item).length == end - start;

        if (this.itemsCount == 0 || !pageLoaded) {
            const params = this.model.serviceParams({
                pageSize: this.pageSize,
                order: this.model.order,
                page: page,
            });

            if (!params.order && params.order !== 0)
                delete params.order;

            this.model.service[this.model.method || 'list'](params).subscribe(
                (result: { count: number; data: unknown[] }) => {
                    console.log(result)
                    result.data = result.data || [];
                    this.itemsCount = result.count;
                    this.totalPages = Math.max(1 + Math.floor((this.itemsCount - 1) / this.pageSize), 1);
                    for (let i = start; i < end; i++) this.cache[i] = result.data[i - start];
                    this.onLoad({ count: result.count, data: result.data });
                },
                {
                    error: err => {
                        this.model.loading = false;
                        this.updateNavButtons();
                        if (this.mobile && page > 0)
                            page--;
                        this.error = true;
                        this.model.onError(err);
                        console.error(err);
                    },
                    complete: () => this.model.loading = false
                }
            );
        } else {
            this.totalPages = Math.max(1 + Math.floor((this.itemsCount - 1) / this.pageSize), 1);
            this.onLoad({ count: this.itemsCount, data: this.cache.slice(start, end) });
        }
    }

    /**
     * Executado ao carregar mais resultados.
     * @param result
     */
    onLoad(result: ItoroPaginationResponse) {
        this.setQuery();
        if (!this.mobile) {
            this.items.splice(0);
            const rootTop = this.root.nativeElement.parentElement.getBoundingClientRect().top;

            if (rootTop < 0) {
                if (this.scrollElement.scrollBy) {
                    this.scrollElement.scrollBy({
                        top: rootTop,
                        behavior: 'smooth',
                    });
                } else {
                    this.scrollElement.scrollTop += rootTop;
                }
            }
        }

        if (this.incrementPrev) result.data.reverse();

        for (const i of result.data) {
            if (this.incrementPrev) {
                this.items.unshift(i);
            } else {
                this.items.push(i);
            }
        }

        window.setTimeout(
            () => {
                this.updateNavButtons();
                this.model.loading = false;
                this.model.onSuccess(result);
                this.onScroll();
            },
            this.mobile ? 50 : 0,
        ); // Atraso para renderizar e executar animações no mobile
        // antes de carregar mais elementos.
    }

    /** Configura componente ao redimensionar. */
    @HostListener('window:resize', ['$event'])
    onResize() {
        if (!this.model.ignoreWindowResize) {
            if ((window.innerWidth < 768 || this.model.alwaysScroll) && !this.mobile) {
                this.mobile = true;
                this.items.splice(0);
                this.goToPage(0);
            } else if (window.innerWidth >= 768 && this.mobile && !this.model.alwaysScroll) {
                this.mobile = false;
                this.currentPage = 0;
                this.paginator.firstPage();
                this.loadNext();
            }
        }
    }

    /** Faz requisição ao dar scroll. */
    onScroll() {
        if (
            !this.mobile ||
            this.model.disableLazyLoad ||
            this.model.loading ||
            this.currentPage == this.totalPages - 1 ||
            this.error
        )
            return;
        const target = this.scrollElement;
        const distanceToBottom = target.scrollHeight - (target.scrollTop + target.offsetHeight);
        if (distanceToBottom < this.SCROLL_DISTANCE) this.goToPage(this.currentPage + 1);
    }

    /** Ordem de exibição. */
    get order(): number | string {
        return this.model.order;
    }

    @Input()
    set order(value: number | string) {
        this.model.order = value;
        this.reset();
    }

    /** Itens por página. */
    get perPage(): number {
        return this.model.perPage;
    }

    @Input()
    set perPage(value: number) {
        if (this.model.perPage != value) {
            this.model.perPage = value;
            this.goToPage(0);
        }
    }

    /** Número de itens por página de acordo com modo mobile ou desktop. */
    get pageSize(): number {
        return this.mobile ? this.model.perScroll : this.model.perPage;
    }

    /** Refaz a requisição. */
    refresh() {
        if (this.mobile) this.goToPage(this.currentPage + 1);
        else this.loadNext();
    }

    /** Limpa itens carregados e retorna à página inicial, fazendo uma requisição em seguida. */
    reset() {
        this.cache.splice(0);
        this.items.splice(0);
        this.itemsCount = 0;
        if (!this.model.stayInPage) {
            this.currentPage = 0;
            this.model.stayInPage = false;
        }
        this.loadNext();
    }

    /** Adiciona à query os parâmetros da paginação. */
    setQuery() {
        if (!this.model.enableQuery) return;
        const queryParams = this.router.parseUrl(this.location.path()).queryParams;
        delete queryParams['pageSize'];
        delete queryParams['order'];
        delete queryParams['page'];

        if (this.order || this.order === 0) queryParams['order'] = this.order.toString();

        if (!this.mobile) {
            queryParams['pageSize'] = this.pageSize.toString();
            queryParams['page'] = (this.currentPage + 1).toString();
        }
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: queryParams });
    }

    /** Recria listagem de botões. */
    updateNavButtons() {
        this.navButtons = [this.currentPage];
        for (let i = 1; i < this.BUTTONS_PER_PAGE && this.navButtons.length < this.BUTTONS_PER_PAGE; i++) {
            const left = this.currentPage - i;
            const right = this.currentPage + i;
            if (left >= 0) this.navButtons.unshift(left);
            if (right * this.pageSize + 1 <= this.itemsCount) this.navButtons.push(right);
        }
    }

    /** Altera as expressões. */
    changeExpressions = () => {
        let ofLabel = '';

        this.paginator._intl.itemsPerPageLabel = "Exibir";

        const rangeLabel = (page: number, pageSize: number, length: number) => {
            if (length == 0 || pageSize == 0) {
                return `0 de ${length}`;
            }

            length = Math.max(length, 0);

            const startIndex = page * pageSize;

            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

            return `${startIndex + 1} - ${endIndex} de ${length}`;
        };

        this.paginator._intl.itemsPerPageLabel = "Exibir";

        this.paginator._intl.nextPageLabel = "Próxima página";

        this.paginator._intl.previousPageLabel= "Página anterior";

        this.paginator._intl.firstPageLabel="Primeira página";

        this.paginator._intl.lastPageLabel="Última página";

        this.paginator._intl.getRangeLabel = rangeLabel;
    };
}
