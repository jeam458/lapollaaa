import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController,AlertController } from 'ionic-angular';
import { DataProvider} from '../../providers/data/data';
import { PartidosPage} from '../partidos/partidos';
import { Storage} from '@ionic/storage';


/**
 * Generated class for the LoginnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginn',
  templateUrl: 'loginn.html',
})
export class LoginnPage {
  loading: any;
  loginData = { username:'', password:'' };
  data: any;
  message='';

  constructor(public navCtrl: NavController, public authService: DataProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public storage:Storage,public alerCtrl:AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginnPage');
  }
  login(){
     if(this.loginData.username!=='' &&this.loginData.password!==''){
       this.showLoader();
       this.authService.login1(this.loginData).subscribe(
         response=>{
           this.loading.dismiss();
           if(response===true){
             this.navCtrl.setRoot(PartidosPage);
           }else{
             this.message=response;
           }
         },
         error=>{
           console.log(error);
           this.showError('ups ocurrio un problema, vuelva a intentarlo');
         }
       )
     }else if(this.loginData.username===''){
      this.message='Ingrese Usuario';
     }else{
      this.message='Ingrese Contraseña';
     }
  }
  

  showError(text){
    this.loading.dismiss();
    let alert = this.alerCtrl.create({
      title:'Error',
      subTitle:text,
      buttons:['OK']
    })
    alert.present();
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
