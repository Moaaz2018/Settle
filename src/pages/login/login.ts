import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth'; 
import firebase from 'firebase';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

user = {} as User;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afAuth:AngularFireAuth,
              private toast : ToastController) {
                var cook = navParams.get('cookie');
                localStorage.setItem("email",cook);
                localStorage.setItem("password",cook);
                console.log(cook);
                console.log(localStorage.getItem("email"));
                if(localStorage.getItem("email")!='x' && localStorage.getItem("password")!='x'){
                  this.session();
                }
}
  async login(user : User){
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.mail, user.password);
      if(result){ 
        localStorage.setItem("email",user.mail);
        localStorage.setItem("password",user.password);
        
        this.navCtrl.setRoot(HomePage);
      
      }
    }
    catch(e){   
   console.log(e);
   this.toast.create({
    message: e,
    duration:3000
  }).present(); 
   }
 }
 session(){
    const result = this.afAuth.auth.signInWithEmailAndPassword(localStorage.getItem("email"), localStorage.getItem("password"));
    if(result){
      this.navCtrl.setRoot(HomePage);
    }
} 
  register(){
    this.navCtrl.push('RegisterPage');
  }

}
