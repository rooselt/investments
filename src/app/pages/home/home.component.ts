import { Overlay } from '@angular/cdk/overlay';
import { Component, ViewChild, ViewContainerRef, TemplateRef, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToroPanelContent } from 'src/app/components/toro-panel/toro-panel-content';
import { UserPosition } from 'src/app/models/userPosition.model';
import { Position } from 'src/app/models/position.model';
import { FilterPositionPipe } from 'src/app/pipes/filter-discipline.pipe';
import { MaskCpfPipe } from 'src/app/pipes/mask-cpf.pipe';
import { JsonDataService } from 'src/app/services/json.service';
import { PreviousPositionService } from 'src/app/services/previous-position.service';
import { PreviousTrendsService } from 'src/app/services/previous-trends.service';
import { WorkshopService } from 'src/app/services/workshop.service';
import { fadeIn } from 'src/app/animations/animations';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { StorageIdentifier } from 'src/app/identifiers/storage.identifier';
import { Trends } from 'src/app/models/trends.model';
import { ToroModalComponent } from 'src/app/components/toro-modal/toro-modal.component';
import { ToroModalService } from 'src/app/services/toro-modal.service';
import { ToroMessageComponent } from 'src/app/components/toro-message/toro-message.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeIn]
})

export class HomeComponent extends ToroPanelContent {
  @ViewChild('secondDialog') secondDialog: TemplateRef<any>;
  customDialogForm: FormGroup;
  amount: number;
  currentAmount: number;
  position: UserPosition;
  previousPosition: Position[];
  previousTrends: Trends[];
  trends: Trends[];
  previousPositionFiltered: Position[];
  trendlList: Trends[] = [];
  clearFilters: boolean = false;
  swiperConfig: any;
  loadingPosition: boolean = true;
  loadingTrends: boolean = true;
  alertPosition: boolean = true;
  alertTrends: boolean = true;
  userId: number;
  trendId: number;
  bank: string;
  account: string;
  titleListAction: string;
  checkingAccountAmount: number;
  consolidated: number;
  quantity: number;
  symbol: string;
  cpf: string;


  constructor(
    private dialog: MatDialog,
    private toroModalService: ToroModalService,
    private filterPositionPipe: FilterPositionPipe,
    private maskCpfPipe: MaskCpfPipe,
    private previousPositionService: PreviousPositionService,
    private previousTrendsService: PreviousTrendsService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public workshopService: WorkshopService,
    private jsonDataService: JsonDataService,
    private sessionStorageService: SessionStorageService
  ) {
    super(overlay, viewContainerRef);
  }



  onKey(event: any) { // without type info
    this.quantity = event.target.value;
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  openOtherDialog() {
    this.dialog.open(this.secondDialog);
  }

  ngOnInit(): void {
    let local = this.sessionStorageService.getUser(StorageIdentifier.Key);
    this.userId = local != null ? local.id : 0;
    this.cpf = this.maskCpfPipe.transform(local.cpf);

    this.jsonDataService.get().subscribe(
      result => {
        debugger;

        // this.trends = result.trends;
        // this.position = result.userPosition;
        this.bank = result.bank;
        this.account = result.account;

        this.setPreviousTrends();
        this.setPreviousUserPosition();
      }
    );
  }

  onFilterChange(event: any) {
    debugger;

    this.alertPosition = false;
    this.previousPositionFiltered = this.filterPositionPipe.transform(this.previousPosition, event.symbolName);
  }

  ngAfterViewInit() {
    this.listTemplates();
  }

  openModal(event: number, id: string) {

    this.trendId = event;
    this.toroModalService.open(id);
  }

  closeModal(id: string) {
    this.toroModalService.close(id);
  }

  onClickBuyTrends(id: string) {
    this.previousTrendsService.buy(this.trendId, this.userId, this.quantity)
      .subscribe(result => {
        this.toroModalService.close(id);

        if (result.code == 200) {
          this.setPreviousUserPosition();
        }

        this.dialog.open(ToroMessageComponent, {
          data: {
            message: result.message,
            title: result.code == 200 ? "Sucesso" : "Atenção"
          }
        });
      });
  }

  setPreviousUserPosition() {
    this.previousPositionService.listAll(this.userId).subscribe(result => {
      this.alertPosition = false;

      if (result != null) {
        this.previousPosition = result.positions;
        this.checkingAccountAmount = result.checkingAccountAmount;
        this.consolidated = result.consolidated;
        this.quantity = result.quantity;
        this.titleListAction = `Lista de Ativos (ações)`
      }

      this.previousPositionFiltered = result.positions;
      this.alertPosition = (this.previousPosition.length == 0);
      this.loadingPosition = false;
    });
  }
  setPreviousTrends() {
    this.previousTrendsService.list().subscribe(result => {
      this.previousTrends = result;
      this.alertTrends = (this.previousTrends.length == 0);
      this.loadingTrends = false;
    });
  }
}
