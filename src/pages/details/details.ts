import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import  {FirebaseListObservable} from 'angularfire2/database';
import {AngularFireDatabase} from 'angularfire2/database';
import {postitem} from '../../models/posts-item';
import { NgModel } from '@angular/forms';
import {postlocation} from '../../models/postlocation';
import * as firebase from 'firebase';
import { ProfileUserPage } from '../profile-user/profile-user';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  estateList: any =[];
  public profileList:Array<any>
  public profilelistref:firebase.database.Reference;
  public loadedprofileList:Array<any>;
  
  postlistref$: FirebaseListObservable<postitem[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private  database :AngularFireDatabase) {
    this.estateList=navParams.get('item');
     
    console.log(this.estateList);
    this.profilelistref=firebase.database().ref(`Profile/`);
    this.profilelistref.on('value', countryList => {
      let profile = [];
      countryList.forEach( country => {
        profile.push(country.val());
        return false;
      });
   this.profileList=profile;
   this.loadedprofileList=profile;
  });
  }
  
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    
  }
  goToprofileuser(p:string)
  {
    console.log(p);
    this.navCtrl.push(ProfileUserPage,{'param1': p});
  }

}
