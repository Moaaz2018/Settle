import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Geolocation} from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import {MapPage} from '../pages/map/map';
 import {ListPage} from '../pages/list/list';
 import {AngularFireModule} from 'angularfire2';
import { DetailsPage } from '../pages/details/details';
import { LoginPage } from '../pages/login/login';
import { importType } from '@angular/compiler/src/output/output_ast';
import{AngularFireAuthModule} from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { LoginPageModule } from '../pages/login/login.module';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FIREBASE_CREDENTIALS} from './firebase.credentials'
import { NgModel } from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import { AddEstatePage } from '../pages/add-estate/add-estate';
import {postlocation} from '../models/postlocation';
import {postitem} from '../models/posts-item';
import {ProfileUserPage} from '../pages/profile-user/profile-user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    DetailsPage,
    AddEstatePage,
    ProfileUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginPageModule,AgmCoreModule.forRoot({
      apiKey:'AIzaSyAZcMGPq087WyODNwwl9MNdvRM723iWX4Q'})
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    DetailsPage,
    LoginPage,
    AddEstatePage,
    ProfileUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    Camera,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
