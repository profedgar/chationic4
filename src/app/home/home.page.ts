import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(public fbauth:AngularFireAuth,public fbstore:AngularFirestore,
    public alertController: AlertController,
    public route:Router
    )
   {
     
    this.fbauth.authState.subscribe(user=>{
      if (user)
      {
        this.route.navigateByUrl('usuarios') 
      }
      else
      {
        console.log("nao autenticado")
      }
    })
     
   }

 


}
