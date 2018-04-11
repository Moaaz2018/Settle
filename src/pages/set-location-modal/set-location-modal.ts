import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {postlocation} from '../../models/postlocation';
import {postitem} from '../../models/posts-item';



@IonicPage()
@Component({
  selector: 'page-set-location-modal',
  templateUrl: 'set-location-modal.html',
})
export class SetLocationModalPage {
  
LocationSet=false;
BaseLocation: postlocation=new postlocation(29.982611,31.316225);
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private ViewCtrl:ViewController) {
  }

  click(event)
  {
this.BaseLocation.x=event.coords.lat;
this.BaseLocation.y=event.coords.lng;
this.LocationSet=true;
  }
  SetLocation()
  {
    this.ViewCtrl.dismiss(this.BaseLocation);
    
  }
Cancel()
{
this.ViewCtrl.dismiss();
}
}
