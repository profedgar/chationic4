import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/Models/Usuarios';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  listausuarios:Usuarios[]=[]
  
  constructor(public fbstore:AngularFirestore,public fbauth:AngularFireAuth,
    public alertController: AlertController,
    public route:Router) { }

  ngOnInit() {

    this.ListarUsuarios()
  }

  ListarUsuarios()
  {

    this.fbauth.authState.subscribe(user=>{
      if (user)
      {
        
      let users=this.fbstore.collection("Usuarios")

      users.ref.where("userid",">",user.uid).get().then(result=>{

     

      result.forEach(element => {
        
        let usuario=new Usuarios()
        usuario.nome=element.data().nome
        usuario.email=element.data().email
        usuario.userid=element.data().userid
        this.listausuarios.push(usuario)        
      });

      users.ref.where("userid","<",user.uid).get().then(result=>{

       
  
        result.forEach(element => {
          
          let usuario=new Usuarios()
          usuario.nome=element.data().nome
          usuario.email=element.data().email
          usuario.userid=element.data().userid
          this.listausuarios.push(usuario)        
        });
  
      })

    })


    console.log(this.listausuarios)
    }
  })
      
    
  }
    

  irparaMensagens(userid)
  {
    this.route.navigate(['/mensagens/' + userid])
  }


  Logout()
  {
    this.fbauth.auth.signOut()
    this.route.navigate(['/home'])

  }

}
