import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Mensagens } from 'src/Models/Mensagens';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { NavController,IonContent } from '@ionic/angular';
import { Usuarios } from 'src/Models/Usuarios';
import { UsuariosPageModule } from '../usuarios/usuarios.module';


@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {

  usuariomensagem:string
  mensagem:Mensagens
  usuario:string
  listamensagens:Observable<Mensagens[]>
  lista:Observable<Mensagens[]>
  nomeuser:string

  constructor(public nav:NavController, public fbauth:AngularFireAuth,public acrroute:ActivatedRoute,public fbstore:AngularFirestore) { 
     
    this.mensagem=new Mensagens() 

    this.acrroute.paramMap.subscribe((params:ParamMap)=>
    {
        this.usuariomensagem=params.get('id')
       
    })

    this.VerificarLogin()

    this.ListarMensagens()

    this.GetUser()
    
  }

  ngOnInit() {

  }

  GetUser()
  {
     
    let users=this.fbstore.collection("Usuarios")

    users.ref.where("userid","==", this.usuariomensagem).get().then(result=>{
       
      result.forEach(element => {
        this.nomeuser=element.data().nome
      });
    })
     
  }

  ListarMensagens()
  {
    this.lista =this.fbstore.collection<Mensagens>("Mensagens",ref=>{
       return ref.limit(300).orderBy("data")
     }).valueChanges()

     

     this.lista.subscribe(res => {
      this.applyFilters(res)
      })
  }
 
  private applyFilters(res) {
    this.listamensagens = res.filter(t=>(t.de==this.usuario && t.para==this.usuariomensagem) || t.para==this.usuario && t.de==this.usuariomensagem)
  }
 

   PostarMensagem(texto)
  {
     this.mensagem.de=this.usuario 
     this.mensagem.para=this.usuariomensagem
     this.mensagem.data=new Date()

    
     let mensagens=this.fbstore.collection("Mensagens")

     mensagens.add({
       de: this.mensagem.de,
       para:this.mensagem.para,
       texto:this.mensagem.texto,
       data: this.mensagem.data 
     })


  }
  


  VerificarLogin()
  {
    this.fbauth.authState.subscribe(user=>{
      if (user)
      {
          this.usuario=user.uid
         
      }
      else
      {
        console.log("nao autenticado")
      }
    })
  }

  
}
