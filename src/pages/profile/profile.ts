import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import{AngularFireAuth}from'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase/app';
import {FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {DetailsPage} from '../details/details'
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profiledata: FirebaseObjectObservable<Profile>;
  public estateList:Array<any>;
  public estatefilt:Array<any>;
  public id:string="";
  public estateListfilt:Array<any>;
  public loadedestateList:Array<any>;
  public estatelistref:firebase.database.Reference;
  profile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afAuth:AngularFireAuth,
              private database:AngularFireDatabase,
              private toast:ToastController) {
                this.afAuth.authState.subscribe(data=> {
                  this.id=data.uid;
                  if (data && data.email && data.uid){
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

    if (!this.estateList) {
      return;
    }
  
    this.estateList = this.estateList.filter((v) => {
      if(v.UID) {
        if (v.UID.toLowerCase().indexOf(this.id.toLowerCase()) > -1 ) {
          console.log(this.id);
          console.log(this.estateList);
         
          return this.estateList;
        }
        return false;
      }
    });
                    
                  this.toast.create({
                    message: `Welcome to Settle_APP,${data.email}`,
                    duration:3000
                  }).present();
                  this.profiledata=this.database.object(`Profile/${data.uid}`);
                  
                }
                else{
                  this.toast.create({
                    message: `Login Faild`,
                    duration:3000
                  }).present();
              
                }
                });
                console.log(this.id);
                
  }
  goTopage(item){
   
    this.navCtrl.push(DetailsPage,{item});
  }
  ionViewWillLoad(){
    
      
  }
  

}
