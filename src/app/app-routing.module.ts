import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapDemoComponent } from './google-map-demo/google-map-demo.component';
import { WindowShoppingComponent } from './window-shopping/window-shopping.component';
import {SearchPlacesComponent} from "./search-places/search-places.component";

const routes: Routes = [
  { path: 'demo', component: GoogleMapDemoComponent },
  { path: 'window-shopping', component: WindowShoppingComponent },
  { path: 'search-places', component: SearchPlacesComponent },
  { path: '', redirectTo: 'search-places', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
