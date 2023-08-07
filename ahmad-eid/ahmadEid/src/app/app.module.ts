import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from 'firebase/app';
import { HttpClientModule } from '@angular/common/http';
//import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
//import { AngularFireStorageModule } from '@angular/fire/compat/storage'; 
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore } from 'firebase/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBr8xhrGhQkqKGGiY9TR_yCJ8J7R887zPA",
  authDomain: "ahmad-eid-portfolio.firebaseapp.com",
  projectId: "ahmad-eid-portfolio",
  storageBucket: "ahmad-eid-portfolio.appspot.com",
  messagingSenderId: "704300199529",
  appId: "1:704300199529:web:33d1f799ad58afcd5abcf8"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
   // AngularFirestoreModule,
   // AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
