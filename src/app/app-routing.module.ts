import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './components/vistas/pedidos/pedidos.component';
import {FormComponent} from './components/vistas/form/form.component';
import { AddressFormComponent } from './components/vistas/address-form/address-form.component';
import { ProductInfoComponent } from './components/vistas/product-info/product-info.component';
import { AddressListComponent  } from './components/shared/address-list/address-list.component';
import { ModalMessageComponent } from './components/shared/modal-message/modal-message.component';
import { OrderShipmentDataComponent } from './components/shared/order-shipment-data/order-shipment-data.component';
import { ConfirmationMessageComponent } from './components/shared/confirmation-message/confirmation-message.component';
import { ToPrintComponent } from './components/shared/to-print/to-print.component';
import { ChartsComponent } from './components/charts/charts.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LoaderComponent } from './components/shared/loader/loader.component';

//const domain : string = 'http://localhost:4200/';
const domain : string = 'https://azban-buzos.azurewebsites.net/';

const routes: Routes = [
  { path: 'vista-pedidos', component: PedidosComponent },
  { path: '', component: PedidosComponent },
  { path: 'crear-pedido', component: FormComponent },
  { path: 'address-form', component: AddressFormComponent},
  { path: 'product-info', component: ProductInfoComponent },
  { path: 'address-list', component: AddressListComponent},
  { path: 'modal-message', component: ModalMessageComponent},
  { path: 'order-shipment-data', component: OrderShipmentDataComponent},
  { path: 'confirmation-message', component: ConfirmationMessageComponent},
  { path: 'to-print', component: ToPrintComponent},
  { path: 'charts', component: ChartsComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'loader', component: LoaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
