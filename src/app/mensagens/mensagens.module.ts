import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MensagensPage } from './mensagens.page';
import { ChatBubbleComponent } from '../chat-bubble/chat-bubble.component';

const routes: Routes = [
  {
    path: '',
    component: MensagensPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MensagensPage,ChatBubbleComponent]
})
export class MensagensPageModule {}
