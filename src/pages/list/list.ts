import { IonicPage, NavController, NavParams,ActionSheetController ,ToastController, SegmentButton, Segment } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
// for auth    
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
import {AngularFireDatabaseModule, FirebaseObjectObservable} from 'angularfire2/database';

import {postitem} from '../../models/posts-item';
import {postlocation} from '../../models/postlocation';

import  {FirebaseListObservable} from 'angularfire2/database';
import {AngularFireDatabase} from 'angularfire2/database';

import { Item } from 'ionic-angular/components/item/item';
import * as firebase from 'firebase';
import { postlist } from '../../app/firebase.credentials';
import { DetailsPage } from '../details/details';
import { Profile } from '../../models/profile';
import { LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AddEstatePage } from '../add-estate/add-estate';


// for auth    


/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  profiledata: FirebaseObjectObservable<Profile>;

  public loadedprofileList:Array<any>;
  public profileList:Array<any>;
  profile = {} as Profile;
  public val="";
   public flats="";
   public profilelistref:firebase.database.Reference;
   public estateList:Array<any>;
   public estateListfilt:Array<any>;
   public loadedestateList:Array<any>;
   public estatelistref:firebase.database.Reference;
   profilelistref$: FirebaseListObservable<postitem[]>
 
     constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams , 
     private  database :AngularFireDatabase,private ActionSheetCtrl:ActionSheetController,
     private afAuth:AngularFireAuth, private toast:ToastController ) {
       this.flats="";
       this.estatelistref=firebase.database().ref('EstatesList');
  this.estatelistref.on('value', countryList => {
    
    let estate = [];
    countryList.forEach( country => {
      estate.push(country.val());
      
      return false;
    });
  
    this.estateList = estate;
    
  console.log(this.estateList.keys);
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
    this.loadedestateList = estate;
    
    
    
  })
  
}
       
       
 
 initializeItems(): void {
   this.estateList = this.loadedestateList;
   this.profileList=this.loadedprofileList;
 }
 
 /*getflatbuy(typeee:string,statuee:string) {
   // Reset items back to all of the items
  
   this.initializeItems();
 
   // set q to the value of the searchbar
   var type= typeee;
 var status=statuee;
 
   // if the value is an empty string don't filter the items
   if (!type) {
     return;
   }
 
   this.estateList = this.estateList.filter((v) => {
     if(v.EstateType && type ) {
       if (v.EstateType.toLowerCase().indexOf(type.toLowerCase()) > -1 && v.EstateStatus.toLowerCase().indexOf(status.toLowerCase()) > -1) {
         console.log(v.EstateType,v.EstateStatus);
         return true;
       }
       return false;
     }
   });
   console.log(type,status, this.estateList.length);
 
 }*/
 onSegmentSelected(segmentButton: SegmentButton) {
   this.val = segmentButton.value;
   this.initializeItems();
 
   // set q to the value of the searchbar
 
 
   // if the value is an empty string don't filter the items
   if (!this.val) {
     return;
   }
 
   this.estateList = this.estateList.filter((v) => {
     if(v.EstateType) {
       if (v.EstateType.toLowerCase().indexOf(this.val.toLowerCase()) > -1 ) {
         console.log(v.EstateType);
        
         return true;
       }
       return false;
     }
   });
   console.log(this.val, this.estateList.length);
 
   
 }
 getItems(searchbar) {
   // Reset items back to all of the items
     
   this.initializeItems();
 
   // set q to the value of the searchbar
   var q = searchbar.srcElement.value;
 
   
   // if the value is an empty string don't filter the items
   if (!q) {
     console.log(this.val);
     
   this.estateList = this.estateList.filter((v) => {
     if(v.EstateType ) {
       if (v.Address.toLowerCase().indexOf(q.toLowerCase()) > -1 && v.EstateType.toLowerCase().indexOf(this.val.toLowerCase()) > -1 ) {
         console.log(v.EstateType);
        
         return true;
       }
       return false;
     }
   });
   console.log(this.val, this.estateList.length);
 
     
   }
   else{
 
   this.estateList = this.estateList.filter((v) => {
     if(v.Address && q) {
       if (v.Address.toLowerCase().indexOf(q.toLowerCase()) > -1 && v.EstateType.toLowerCase().indexOf(this.val.toLowerCase()) > -1) {
         console.log(this.val);
         return true;
        
       }
       return false;
     }
   });
 
   
 
   console.log(q, this.estateList.length);
   }
 }
 
 ionViewWillLoad(){
   this.afAuth.authState.subscribe(data=> {
     if (data && data.email && data.uid){
     this.toast.create({
       message: `Welcome to Settle_APP,${data.email}`,
       duration:3000
     }).present();
     this.profiledata=this.database.object(`profile/${data.uid}`);
   }
   else{
     this.toast.create({
       message: `Login Faild`,
       duration:3000
     }).present();
 
   }
   });
     
 }
 
 
 goTopage(item){
   
   this.navCtrl.push(DetailsPage,{item});
 }
 gotoProfile(){
   this.navCtrl.push("ProfilePage");
 }
 gotoHome(){
   this.menuCtrl.close();
 
 }
 logout(){
   const cookie='x';
   this.navCtrl.setRoot("LoginPage",{cookie});
 
 }
 addPage(){
this.navCtrl.push(AddEstatePage);
 }
 
 }