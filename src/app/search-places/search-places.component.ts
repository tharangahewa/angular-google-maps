import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.css']
})
export class SearchPlacesComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapElm: ElementRef<HTMLElement>;
  @ViewChild('placesSearchInput') placesSearchInputElm: ElementRef<HTMLInputElement>;

  placesService: google.maps.places.PlacesService;

  map: google.maps.Map;
  searchBox: google.maps.places.SearchBox;
  myPlaceMarkers: google.maps.Marker[] = [];
  geocoder: google.maps.Geocoder;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initSearchBox();
  }

  private initMap(): void {
    this.map = new google.maps.Map(this.mapElm.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
  }

  private initSearchBox(): void {
    // Create the search box and link it to the UI element.
    this.searchBox = new google.maps.places.SearchBox(this.placesSearchInputElm.nativeElement);
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.placesSearchInputElm.nativeElement);

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', () => this.searchBox.setBounds(this.map.getBounds()));

    // Add search box listener
    this.searchBox.addListener('places_changed', () => this.onSearchBoxChange());
  }

  private changeBounds(bounds: google.maps.LatLngBounds): void {
    this.map.fitBounds(bounds)
  }

  private onSearchBoxChange() {
    this.onPlacesChange(this.searchBox.getPlaces()
      .filter(place => place.geometry)
      .map(place => {
        return {
          title: place.name,
          location: place.geometry.location,
          viewport: place.geometry.viewport
        }
      }));
  }

  private onPlacesChange(places: { title: string; location: google.maps.LatLng; viewport: google.maps.LatLngBounds }[]): void {
    console.log(places);
    if (places.length == 0) {
      return
    }

    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.location) {

        this.myPlaceMarkers.push(
          new google.maps.Marker(
            {
              map: this.map,
              title: place.title,
              position: place.location
            }
          )
        );

        if (place.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.viewport);
        } else {
          bounds.extend(place.location);
        }
      }
    });

    this.changeBounds(bounds);
  }

  locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {

          this.searchPlaces(pos.coords);
        },
        () => {
          alert("An error occurred while trying to access location");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0
        }
      );
    } else {
      alert("Geo locations are not supported in this device or browser");
    }
    var geocoder = new google.maps.Geocoder;
  }

  private searchPlaces(coords: Coordinates) {
    console.log(coords);
    const request: google.maps.GeocoderRequest = {
      location: new google.maps.LatLng(coords.latitude, coords.longitude)
    };

    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder;
    }

    this.geocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        let place;
        console.log( results);
        if (results.length > 0 && results[0].geometry) {
          place = results[0];
        }
        this.placesSearchInputElm.nativeElement.setAttribute('value', place.formatted_address);
        this.onPlacesChange([{
            title: place.formatted_address,
            location: place.geometry.location,
            viewport: place.geometry.viewport
          }]
        );
      }
    });
  }


  private searchNearbyPlaces(coords: Coordinates) {
    console.log(coords);
    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(coords.latitude, coords.longitude),
      radius: 1
    };

    if (!this.placesService) {
      this.placesService = new google.maps.places.PlacesService(this.map);
    }

    this.placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.onPlacesChange(results
          .filter(place => place.geometry)
          .map(place => {
            return {
              title: place.name,
              location: place.geometry.location,
              viewport: place.geometry.viewport
            };
          }));
      }
    });
  }

}
