import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GiftPageCustomization } from '../domin/giftPage';

@Injectable({
  providedIn: 'root'
})
export class GiftTechService {

  constructor(private firestore: AngularFirestore) { }

  getCustomizations() {
    return this.firestore.collection('giftPageCustomization').snapshotChanges();
  }

  updateCustomization(id: string, data: GiftPageCustomization) {
    return this.firestore.collection('giftPageCustomization').doc(id).update(data);
  }

  addCustomization(data: GiftPageCustomization) {
    return this.firestore.collection('giftPageCustomization').add(data);
  }

  deleteCustomization(id: string) {
    return this.firestore.doc(`giftPageCustomization/${id}`).delete();
  }

}
