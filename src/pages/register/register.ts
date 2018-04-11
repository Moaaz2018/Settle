import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {Profile} from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase/app';
import {Camera} from '@ionic-native/camera';
import firebase from 'firebase';
import { postlist, profilelist } from '../../app/firebase.credentials';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
user = {} as User;
public profile = {} as Profile;
UID : string;
imagePath ='data:image/jpeg;base64,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';
constructor(public navCtrl: NavController, public navParams: NavParams,
              private afAuth:AngularFireAuth,
              private toast:ToastController,
              private afDatabase:AngularFireDatabase,
              private camera:Camera) {
  }

  

  async register(user : User){
    if(user.mail!=null && user.password!=null && this.profile.firstName!=null &&
      this.profile.lastName!=null && this.profile.Phone!=null ){
    try{
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.mail,user.password);
        if(result){
          
            this.profile.UID= result.uid;
            this.profile.Type="user";
          }
      
    
    console.log(this.imagePath);
    const ImageRef = firebase.storage().ref("Images/image-"+new Date().getMilliseconds()+".jpg");
    ImageRef.putString(this.imagePath,firebase.storage.StringFormat.DATA_URL)
    .then((snapshot)=>{
      this.profile.image=snapshot.downloadURL;
      this.afDatabase.object(`Profile/${this.profile.UID}`).set(this.profile).then(()=>this.navCtrl.setRoot('HomePage'));
      //const ProductListRef = firebase.database().ref(profilelist);
      
      
      this.navCtrl.pop();
    })
    .catch(error=>{
      this.toast.create({
        message:'Error in getting Image : '+error,
        duration:5000
      }).present();
    })
  }

catch(e){
  console.error(e);
  this.toast.create({
    message: e,
    duration:3000
  }).present();
}
      }

else{
  this.toast.create({
    message: `Please fill all fields`,
    duration:3000
  }).present();
}
  }

  takePhoto(){
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      targetHeight:300,
      targetWidth:250,
      cameraDirection:this.camera.Direction.FRONT,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
    })
    .then(ImageData=>{
      //this.imagePath=ImageData;
        this.imagePath= "data:image/jpeg;base64,"+ImageData;
      
    })
    .catch((error)=>{
      const toast = this.toast.create({
        message:'Error with Capturing a Photo'+error,duration:5000
     }).present();
    })
  }
  openGallery(){
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      targetHeight:300,
      targetWidth:250,
      cameraDirection:this.camera.Direction.FRONT,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
    })
    .then((ImageData:string)=>{
      this.imagePath= "data:image/jpeg;base64,"+ImageData;
      //const portions:string[]=ImageData.split('?');
      //this.imagePath=portions[0];
    })
    .catch((error)=>{
      const toast = this.toast.create({
        message:'Error with Capturing a Photo'+error,duration:5000
     }).present();
    })
  }

}
