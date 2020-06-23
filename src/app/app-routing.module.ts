import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapDemoComponent } from './google-map-demo/google-map-demo.component';
import { WindowShoppingComponent } from './window-shopping/window-shopping.component';

const routes: Routes = [
  { path: 'demo', component: GoogleMapDemoComponent },
  { path: 'window-shopping', component: WindowShoppingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
