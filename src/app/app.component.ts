import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginnPage} from '../pages/loginn/loginn';
import { Storage } from '@ionic/storage';
import { PartidosPage } from '../pages/partidos/partidos';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      storage.ready().then(()=>{
        storage.get('token').then((token)=>{
          if(token!==''){
            console.log(token);
            this.rootPage=PartidosPage;
          }else{
            this.rootPage=LoginnPage;
          }
        }).catch((error)=>{
          console.log(error);
          this.rootPage=LoginnPage;
        })
      })
    });
  }
}

