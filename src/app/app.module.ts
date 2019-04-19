import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

var config = {
  apiKey: "AIzaSyDjbsQrB4aISTRlmddpeHJxae_M8Qgyrek",
  authDomain: "chationic4-a3ff2.firebaseapp.com",
  databaseURL: "https://chationic4-a3ff2.firebaseio.com",
  projectId: "chationic4-a3ff2",
  storageBucket: "chationic4-a3ff2.appspot.com",
  messagingSenderId: "91832984013"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),  AngularFireAuthModule, AngularFirestoreModule, AppRoutingModule,AngularFireModule.initializeApp(config)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
