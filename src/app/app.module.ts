import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapDemoComponent } from './google-map-demo/google-map-demo.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { WindowShoppingComponent } from './window-shopping/window-shopping.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapDemoComponent,
    WindowShoppingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
