import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapDemoComponent } from './google-map-demo/google-map-demo.component';

const routes: Routes = [
  { path: 'demo', component: GoogleMapDemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
