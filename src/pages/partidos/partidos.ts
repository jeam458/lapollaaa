import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams,AlertController,ToastController,LoadingController,Loading,ModalController } from 'ionic-angular';
import { LoginnPage} from '../loginn/loginn';
import { DataProvider} from '../../providers/data/data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PartidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partidos',
  templateUrl: 'partidos.html',
})
export class PartidosPage {
  title:String='Partidos';
  cantidad:Number=0;
  partidos:any;
  loading: Loading;
  Token:string;
  userId:String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataProvider:DataProvider, 
    public storage:Storage,
    public alertCtrl: AlertController,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartidosPage');
    try{
      setTimeout(()=>{
        this.storage.get('token').then((token)=>{
          if(token!==null){
          this.Token=token;
          this.userId=token.userId;
          console.log(token.id);
          this.listarPartidos(token.id);
          }else{
            this.navCtrl.setRoot(LoginnPage);
          }
        })
        
      },200)
    } catch(error){

    }
  }
  salir(){
    this.storage.remove('token');
    this.navCtrl.setRoot(LoginnPage);
  }

  listarPartidos(id){
    this.showLoading();
    this.dataProvider.getPartidos(id).subscribe(
      (data)=>{
        this.loading.dismiss();
        this.partidos=data;
        console.log(this.partidos);
      },(error)=>{
        console.log(error)
      }
    ) 
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    this.loading.present();
  }
  showmenssage(text){
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title:'Todo bien',
      subTitle:text,
      buttons:['OK']
    })
    alert.present();
  }


  showPromt(item){
    let promt=this.alertCtrl.create({
      title:item.teamOne.name+' vs '+item.teamTwo.name,
      message:item.matchType.name+' '+ item.when,
      inputs:[
        {
          name:'scor1',
          placeholder:'goles '+ item.teamOne.name
        },
        {
          name:'scor2',
          placeholder:'goles '+item.teamTwo.name
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            let body={"score":{"teamOne":data.scor1,"teamTwo":data.scor2},"gamerId":this.userId,"matchId":item.id};
            console.log(body);
            this.dataProvider.subirMarcador(this.Token,body).subscribe(
              (data)=>{
                console.log(data);
                this.showmenssage('Scor guardado correctamente');
                this.listarPartidos(this.Token);
              }
            )
          }
        }
      ]
    })
    promt.present();
  }
}
