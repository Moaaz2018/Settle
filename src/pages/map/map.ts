import { Component , NgZone , ViewChild , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams  ,LoadingController ,Platform ,ModalController, Alert} from 'ionic-angular';
import { Geolocation} from '@ionic-native/geolocation';
import {postitem} from '../../models/posts-item';

import {FirebaseListObservable , AngularFireDatabase} from 'angularfire2/database';

declare var google;


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  HtmlInfoWindow,

 } from '@ionic-native/google-maps';
import { ListPage } from '../list/list';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  currentSettle : postitem = new postitem();
    settleListRef$ : FirebaseListObservable <postitem[]>;

  map :GoogleMap;
  markers: any;
  
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  loading: any;
  autocomplete: any;

  mapReady: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams , public platform : Platform,
    public geolocation : Geolocation ,public zone :NgZone,public loadingCtrl : LoadingController,
     private database : AngularFireDatabase , public modalctrl : ModalController
  ) {
  }
  ngOnInit(){
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
    this.loading = this.loadingCtrl.create();
  
   }
   //  ngAfterViewInit() {

    ngAfterViewInit(){
    this.platform.ready().then(() => {
      this.Loadmap();
      this.getLocation();

      
    });
  }
  Loadmap(){

    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 30.044420,
          lng: 31.235712
        },
        zoom: 15,
        
      }
    };

    
    this.map = GoogleMaps.create('map', mapOptions);
     // Wait the maps plugin is ready until the MAP_READY event
     this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
    });


    
  
      //  this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      //});
  

}

tryGeolocation(){
  const load = this.loadingCtrl.create({
    content:'get your location'
  });
  load.present();
  
  this.geolocation.getCurrentPosition().then((resp) => {
    let pos = {
      lat: resp.coords.latitude,
      lng: resp.coords.longitude
    };
   
    this.map.animateCamera({
      target: {lat: pos.lat, lng: pos.lng},
      zoom: 17,
      tilt: 60,
      bearing: 140,
      duration: 5000
    })
    .then(()=>{
     load.dismiss();
   })
   })
   .catch((error) => {
    alert(error);
        load.dismiss();
  });
}
updateSearchResults(searchbar){
  var q = searchbar.srcElement.value;
  if (!q) {
    
    return;
  }else{

  this.GoogleAutocomplete.getPlacePredictions({input: q},
    (predictions, status) => {
      this.autocompleteItems = [];
      if(predictions){
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          }); 
        });
      }
  });
}
}
selectSearchResult(item){
  const load = this.loadingCtrl.create();
  load.present();
this.autocompleteItems = [];
this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
/* let pos = {
    lat: results[0].geometry.location.lat,
    lng:results[0].geometry.location.lng
};*/
 
  if(status === 'OK' && results[0]){
    this.map.animateCamera({
      target: results[0].geometry.location,
      zoom: 17,
      tilt: 60,
      bearing: 140,
      duration: 5000
    })
    .then(()=>{
     load.dismiss();
   });
   
  }
})
}
///////////////////////////////////
getLocation(){
  this.settleListRef$ = this.database.list('EstatesList');

  this.settleListRef$.subscribe(data => {
    this.addmarker(data);
    
  });

}
addmarker(data){
  for(let pin of data){
   /* try{
    var content  = '<img height="80px" width="300px [src]="data:image/jpeg;base64,"+"pin.image">'  ;
  }
  catch(e){
    alert(e);
  }
  var Htmlinfo = new HtmlInfoWindow();
  var html  =[
    '<h1>'+ pin.Title+'</h1>'

  ].join("");
  Htmlinfo.setContent(html);*/
  /////////////////


    /*let markeroption :MarkerOptions ={
      position : {
        lat: pin.Location.Latitude,
        lng: pin.Location.Longitude
      },
      title : pin.Title,
    
    };
    const marker =this.map.addMarker(markeroption).then((marker:Marker)=>{
      marker.showInfoWindow();
    });*/
    

    //var htmlInfoWindow   = new HtmlInfoWindow();
    var html = '<h4 (click)="myFunction()">' + pin.Title + '</h4>';
    //htmlinfo.setContent(html);
    let frame: HTMLElement = document.createElement('div');
      frame.innerHTML = [
        '<h3>Hearst Castle</h3>',
        
      ].join("");
     
///////////////////////////////////////////////////////////////////////////////////////////////////////
  /*  this.map.addMarker({
      position: {
        lat: pin.Location.Latitude,
        lng: pin.Location.Longitude
      },
           
    }
  ).then(Marker=>{
    Marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert("skjjddddd");
      htmlInfoWindow.setContent(frame, {
        width: "280px",
        height: "330px"
      });
      alert("111111111111110");
      htmlInfoWindow.open(Marker);
    });
    Marker.on(GoogleMapsEvent.INFO_CLICK)
      .subscribe(() => {
        this.navCtrl.push(ListPage);

      });
  })*/

 this.map.addMarker({
    icon: 'blue',
    animation: 'DROP',
    position: {
      lat:pin.Location.x,
      lng:  pin .Location.y
    },
    title:pin.Title,  
    markerClick: function(marker) {
      marker.showInfoWindow();
    }
  }) .then(marker => {
    
    marker.on(GoogleMapsEvent.INFO_CLICK)
      .subscribe(() => {
        this.navCtrl.push(ListPage);

      });
  })  ;
 
}
}








///////////////////////


}

