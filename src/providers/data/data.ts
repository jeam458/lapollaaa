import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers,Response} from '@angular/http';
import { Storage} from '@ionic/storage';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let loginurl='http://polla.testing.aprendiendo.la/api/gamers/login';
let lstPartidos='http://polla.testing.aprendiendo.la/api/matches?access_token=';
let updatePick='http://polla.testing.aprendiendo.la/api/picks?access_token=' 
@Injectable()
export class DataProvider {

  public token:{};

  constructor(public http: Http,public storage:Storage) {
    console.log('Hello DataProvider Provider');
    storage.ready().then(()=>{
      storage.get('token').then((token)=>{
        this.token=token;
      })
    })
  }

  login1(body:any):Observable<any>{
    return this.http.post(loginurl,body)
    .map((response:Response)=>{
        const token=response.json();
        if(token.id !==''){
         this.storage.set('token',token);
         this.storage.set('user',body.username);
         this.storage.set('password',body.password);
         return true;
        }else {
          return 'Usuario y/o Contraseña no validos!'; 
        }
    })
    .catch((error:any)=>{
      return Observable.throw(error);
    })
  }
  getPartidos(id){
    const url=lstPartidos+'{'+id+'}';
    return this.http.get(url).map((response:Response)=>{
      return response.json();
    })
  }

  subirMarcador(id,body):Observable<any>{
    const url=updatePick+'{'+id+'}';
    return this.http.post(url,body)
    .map((response:Response)=>{
      return response.json();
    })
    .catch((error:any)=>{
      return Observable.throw(error);
    })
  }

  public logout(){
    this.storage.remove('token');
    this.token=null;
  }

}
