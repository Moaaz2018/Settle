import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import {FirebaseObjectObservable} from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import {DetailsPage} from '../details/details'
/**
 * Generated class for the ProfileUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-user',
  templateUrl: 'profile-user.html',
})
export class ProfileUserPage {
  profileList: any =[];
  public id:string;
  profiledata: FirebaseObjectObservable<Profile[]>;
  profile: Profile[];
  public estateList:Array<any>;
   public estateListfilt:Array<any>;
   public loadedestateList:Array<any>;
   public estatelistref:firebase.database.Reference;
   

  public profilelistref:firebase.database.Reference;
  constructor(public navCtrl: NavController,private database:AngularFireDatabase, public navParams: NavParams) {
    this.id = navParams.get('param1'); 
   console.log(this.id);
   this.profiledata=this.database.object(`Profile/${this.id}`);
   this.estatelistref=firebase.database().ref('EstatesList');
   this.estatelistref.on('value', countryList => {
     
     let estate = [];
     countryList.forEach( country => {
       estate.push(country.val());
       
       return false;
     });
   
     this.estateList = estate;
     console.log(this.estateList);
    });
    
  
 
   // set q to the value of the searchbar
 
 
   // if the value is an empty string don't filter the items
   if (!this.estateList) {
     return;
   }
 
   this.estateList = this.estateList.filter((v) => {
     if(v.UID) {
       if (v.UID.toLowerCase().indexOf(this.id.toLowerCase()) > -1 ) {
         console.log(this.estateList);
        
         return this.estateList;
       }
       return false;
     }
   });
   
    
  
}

goTopage(item){
   
  this.navCtrl.push(DetailsPage,{item});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUserPage');
  }

}
