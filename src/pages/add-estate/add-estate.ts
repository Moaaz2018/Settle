import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,
  LoadingController,ToastController } from 'ionic-angular';
import { SetLocationModalPage } from '../set-location-modal/set-location-modal';

import {Geolocation} from '@ionic-native/geolocation';
import {Camera} from '@ionic-native/camera';
import Firebase from 'firebase';
import {postlist} from '../../app/firebase.credentials';
import {postlocation} from '../../models/postlocation';
import {postitem} from '../../models/posts-item';
import {ListPage} from '../list/list'
import{AngularFireAuth}from'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase/app';
import {FirebaseObjectObservable} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add-estate',
  templateUrl: 'add-estate.html',
})
export class AddEstatePage {
  profile = {} as Profile;
   id:string;
  CurrentEstate: postitem=new postitem();
  LocationSet=false;
  ImagePath='';
  BaseLocation: postlocation =new postlocation(29.982611,31.316225);

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private mdlCtrl: ModalController, private geolocation: Geolocation,
     private ldgCtrl:LoadingController,private camera: Camera,private afAuth:AngularFireAuth,
     private database:AngularFireDatabase,
     private toastCtrl: ToastController,)
      {
        this.afAuth.authState.subscribe(data=> {
          if (data && data.email && data.uid){
          this.toastCtrl.create({
            message: `Welcome to Settle_APP,${data.email}`,
            duration:3000
            
          }).present();
         
          this.id= data.uid;
        }
        else{
          this.toastCtrl.create({
            message: `Login Faild`,
            duration:3000
          }).present();
      
        }
        });
  }

  ionViewWillLoad(){
   
      
  }


GetLocation()
{
  const loading=this.ldgCtrl.create({
    content: 'Fetching your location...'
  })
  loading.present();
this.geolocation.getCurrentPosition()
.then((locationdata)=>{
this.BaseLocation.x =locationdata.coords.latitude;
this.BaseLocation.y =locationdata.coords.longitude;
this.LocationSet=true;
for(let i=0; i<100000; i++)
{

}
loading.dismiss();
}) 
.catch((error)=>{

console.log("Error : "+error);
})
}

SetOnMap()
{
  const modal=this.mdlCtrl.create('SetLocationModalPage');
    modal.present();
    modal.onDidDismiss((data)=>{
      if(data){
        this.BaseLocation=data;
        this.LocationSet=true;
      }


    })
  
}

TakePhoto()
{
  this.camera.getPicture({
    destinationType:this.camera.DestinationType.DATA_URL,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType:this.camera.EncodingType.JPEG,
    correctOrientation:true,
    targetHeight:300,
    targetWidth:300,
    cameraDirection:this.camera.Direction.BACK,
    quality:50,
    mediaType:this.camera.MediaType.PICTURE,
    
    
    })
    .then((imagedata:string)=>{
    
    this.ImagePath="data:image/jpeg;base64,"+imagedata;
    
    })
    .catch((error)=>{
      this.toastCtrl.create({
        message:'Error in capturing image: '+error,
        duration:5000
        
            }).present();
    })
}

OpenGallery()
{
  this.camera.getPicture({
    destinationType:this.camera.DestinationType.DATA_URL,
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType:this.camera.EncodingType.JPEG,
    correctOrientation:true,
    targetHeight:300,
    targetWidth:300,
    cameraDirection:this.camera.Direction.BACK,
    quality:50,
    mediaType:this.camera.MediaType.PICTURE,
    
    
    })
    .then((imagedata:string)=>{
    
    this.ImagePath="data:image/jpeg;base64,"+imagedata;
    //const portions:string[]=imagedata.split('?');
    //this.ImagePath=portions[0];
    })
    .catch((error)=>{
      this.toastCtrl.create({
        message:'Error in getting image: '+error,
        duration:5000
        
            }).present();
    })
}

Save()
{
  const loading = this.ldgCtrl.create({
    content:'Saving Estate'
  })
  loading.present();
this.CurrentEstate.Location=this.BaseLocation;
this.CurrentEstate.UID=this.id;
const ImageRef=Firebase.storage().ref("Images/image-"+new Date().getMilliseconds()+".jpg");
ImageRef.putString(this.ImagePath,Firebase.storage.StringFormat.DATA_URL)
.then((snapshot)=>{
this.CurrentEstate.Image=snapshot.downloadURL;

const EstateListRef=Firebase.database().ref('EstatesList');
EstateListRef.push(this.CurrentEstate);
this.navCtrl.pop();
loading.dismiss();
})
.catch(error=>{
this.toastCtrl.create({
  message:'Error in getting image: '+error,
  duration:5000
  
      }).present();
})
}

Cancel()
{
this.navCtrl.pop();
}

}
