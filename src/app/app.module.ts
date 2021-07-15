import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { FilterPositionPipe } from './pipes/filter-discipline.pipe';
import { MaskCpfPipe } from './pipes/mask-cpf.pipe';
import { registerLocaleData, DatePipe } from '@angular/common';
import '@angular/common/locales/global/pt';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { fakeBackendProvider } from './helpers';
import { JwtInterceptor, ErrorInterceptor } from './helpers';

registerLocaleData(localePt);

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterPositionPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule
  ],
  providers: [
    FilterPositionPipe,
    MaskCpfPipe,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG },   
    // fakeBackendProvider
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
