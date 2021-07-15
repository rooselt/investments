import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports Angular Material

import { MatDialogModule} from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
// Fim imports Angular material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToroCardComponent } from './toro-card/toro-card.component';
import { ToroAlertComponent } from './toro-alert/toro-alert.component';
import { ToroHeaderComponent } from './toro-header/toro-header.component';
import { ToroAccessNowComponent } from './toro-access-now/toro-access-now.component';
import { ToroFilterComponent } from './toro-filter/toro-filter.component';
import { ToroPanelComponent } from './toro-panel/toro-panel.component';
import { TemplateDirective } from './toro-panel/toro-panel-content';
import { ToroPagination } from './toro-pagination/toro-pagination.component';
import { ToroModalComponent } from './toro-modal/toro-modal.component';
import { ToroCardListComponent } from './toro-card-list/toro-card-list.component';
import { ToroCardTrendsComponent } from './toro-card-trends/toro-card-trends.component';
import { ToroMessageComponent } from './toro-message/toro-message.component';


// Angular Material Components
const MaterialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatTreeModule,
  OverlayModule,
  PortalModule 
];

@NgModule({
  declarations: [
    TemplateDirective,
    ToroCardComponent,
    ToroMessageComponent,
    ToroAlertComponent,
    ToroHeaderComponent,
    ToroAccessNowComponent,
    ToroCardListComponent,
    ToroCardTrendsComponent,
    ToroFilterComponent,
    ToroPanelComponent, 
    ToroPagination,
    ToroModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    TemplateDirective,
    ToroCardComponent,
    ToroMessageComponent,
    ToroAlertComponent,
    ToroHeaderComponent,
    ToroAccessNowComponent,
    ToroCardListComponent,
    ToroCardTrendsComponent,
    ToroFilterComponent,
    ToroPanelComponent, 
    ToroPagination,
    ToroModalComponent
  ] 
})
export class ComponentsModule { }
