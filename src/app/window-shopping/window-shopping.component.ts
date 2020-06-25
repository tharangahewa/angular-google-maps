import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

export interface Location {
  title: string;
  location: { lat: number; lng: number; };
};


@Component({
  selector: 'app-window-shopping',
  templateUrl: './window-shopping.component.html',
  styleUrls: ['./window-shopping.component.css']
})
export class WindowShoppingComponent implements OnInit, AfterViewInit {

  @ViewChild(GoogleMap) googleMap: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  @ViewChild('pano') panoElm: ElementRef<HTMLElement>;

  center = { lat: 40.7413549, lng: -73.9980244 };
  zoom = 13;
  bounds$: Observable<google.maps.LatLngBounds>;

  locations$: Observable<Location[]>;
  markers$: Observable<google.maps.MarkerOptions[]>;

  locations = [
    { title: 'Park Ave Penthouse', location: { lat: 40.7713024, lng: -73.9632393 } },
    { title: 'Chelsea Loft', location: { lat: 40.7444883, lng: -73.9949465 } },
    { title: 'Union Square Open Floor Plan', location: { lat: 40.7347062, lng: -73.9895759 } },
    { title: 'East Village Hip Studio', location: { lat: 40.7281777, lng: -73.984377 } },
    { title: 'TriBeCa Artsy Bachelor Pad', location: { lat: 40.7195264, lng: -74.0089934 } },
    { title: 'Chinatown Homey Space', location: { lat: 40.7180628, lng: -73.9961237 } }
  ];

  title: string;
  showListings: boolean;
  private streetViewService: google.maps.StreetViewService;

  constructor() {
    this.streetViewService = new google.maps.StreetViewService();
  }

  ngOnInit(): void {
    this.locations$ = of(this.locations);
    this.markers$ = this.locations$.pipe(map(locArray => {
        return locArray.map((loc: Location, index) => {
          return {
            position: loc.location,
            title: loc.title,
            animation: google.maps.Animation.DROP,
            id: index
          } as google.maps.MarkerOptions;
        });
      }
    ));

    this.bounds$ = this.markers$.pipe(map(markerArray => {
        const bounds = new google.maps.LatLngBounds();
        markerArray.forEach(marker => bounds.extend(marker.position));
        return bounds;
      }
    ));
  }

  /**
   * Paper Prototype
   * Usability - Validate
   * Card Sorting
   *
   * Adding facelift to backlog
   * User group
   * Schedule meetings july 20th
   *
   * Accessbility - Greg, Michecle
   * Cost  Analysis - Me
   * Prevelances - Sam
   */

  ngAfterViewInit(): void {
    this.bounds$.subscribe(bounds => this.googleMap.fitBounds(bounds));
  }

  openInfoWindow(marker: MapMarker) {
    this.title = marker._marker.getTitle();
    console.log( this.title)

    const getStreetView = (data, status) => {
      if (status === google.maps.StreetViewStatus.OK) {
        const nearStreetViewLocation = data.location.latLng;
        const heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker._marker.getPosition());
        const panoramaOptions = {
          position: nearStreetViewLocation,
          pov: {
            heading,
            pitch: 30
          }
        };
        const ll = new google.maps.StreetViewPanorama(this.panoElm.nativeElement, panoramaOptions);
      }
    };

    this.streetViewService.getPanoramaByLocation(marker._marker.getPosition(), 50, getStreetView);

    this.infoWindow.open(marker);
  }

  toggleListings() {
    this.showListings = !this.showListings;
  }
}
