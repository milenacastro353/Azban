import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MenuToolsComponent } from './components/shared/menu-tools/menu-tools.component';
import { PedidosComponent } from './components/vistas/pedidos/pedidos.component';
import { FormComponent} from './components/vistas/form/form.component'
import { ItemsComponent } from './components/items/items.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from './components/vistas/address-form/address-form.component';
import { ProductInfoComponent } from './components/vistas/product-info/product-info.component';
import { AddressListComponent } from './components/shared/address-list/address-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalMessageComponent } from './components/shared/modal-message/modal-message.component';
import { OrderShipmentDataComponent } from './components/shared/order-shipment-data/order-shipment-data.component';
import { ConfirmationMessageComponent } from './components/shared/confirmation-message/confirmation-message.component';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { NgxPrintModule } from 'ngx-print';
import { ToPrintComponent } from './components/shared/to-print/to-print.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuToolsComponent,
    PedidosComponent,
    FormComponent,
    ItemsComponent,
    AddressFormComponent,
    ProductInfoComponent,
    AddressListComponent,
    ModalMessageComponent,
    OrderShipmentDataComponent,
    ConfirmationMessageComponent,
    ToPrintComponent,
    ChartsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    TooltipModule,
    NgxPrintModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
