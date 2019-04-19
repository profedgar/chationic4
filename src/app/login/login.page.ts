import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuarios } from 'src/Models/Usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuarios
  constructor(public fbauth:AngularFireAuth,
    public alertController: AlertController,
    public route:Router) {
      this.usuario=new Usuarios()
     }

  ngOnInit() {
  }

  LoginUsuario()
  {
    this.fbauth.auth.signInWithEmailAndPassword(this.usuario.email,this.usuario.senha).then((res)=>
    {
       this.route.navigate(['/usuarios'])
    })
    .catch(async ()=>
    {
      const alert = await this.alertController.create({
        header: 'Erro',
        subHeader: '',
        message: 'Erro no Login.',
        buttons: ['OK']
      });
  
      await alert.present();

    })
  }

}
