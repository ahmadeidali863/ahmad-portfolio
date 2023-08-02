import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Certification } from 'src/app/core/domin/certification';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { database } from 'src/app/app.module';
import { addDoc, collection } from 'firebase/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-certification',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-certification.component.html',
  styleUrls: ['./admin-certification.component.scss']
})
export class AdminCertificationComponent {
  updateCateguriesId:string = '';
  updateProject:boolean =false;
  public iCertification: Certification = {
    id: 0,
    certificationName: '',
    certificationDescription: '',
    certificationImage: '',
    certificationType: '',
    certificationURL: '',
    userName: '',
    certificationImageFile: undefined
  }
  constructor(private storage: AngularFireStorage) {}


  //--------------------
  //------------------

progress: number = 0;

uploadData() {
 const intervalId = setInterval(() => {
    this.progress += 1;
    if (this.progress >= 100) {
      alert('added');
      clearInterval(intervalId);
      this.progress = 0;
      return;
    }
  }, 50);
}
//----------------------
//uploadImage
imageSubmited:boolean =false;
url: any = '';
fileDigitalProducts: any = '';
selectedFile: File | null = null;
downloadURL: string | null = null;

onFileSelected(files: any) {
  if (files.target.files[0].size > 20000000) {
    alert('size is too large')
    return;
  }
  else if (files.target.files[0].size < 10) {
    alert('size is too small')
    return;
  }
  else if (files.target.files[0]) {
    const file: File = files.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(files.target.files[0]);

      reader.onload = (event) => {
        this.selectedFile = files.target.files[0];
        const filePath = `certifications/${new Date().getTime()}_${this.selectedFile!.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);
        this.url = event.target?.result;
        this.imageSubmited = true;
        this.iCertification.certificationImageFile = file;
        this.uploadData();
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              this.downloadURL = downloadURL;
            });
          })
        ).subscribe();
      }
      
  }
  
}

//////////////////////add

collectionRef = collection(database, 'certifications');
librarySubmitted : boolean = false;
addProject(certificationfrm:any){
  if (certificationfrm.form.valid) {
    this.librarySubmitted = true;
    if (this.iCertification.certificationName == '' || this.iCertification.certificationDescription == ''
    || this.iCertification.certificationURL == '' || this.iCertification.certificationType == ''
    || this.downloadURL== '') {
      return;
    }
addDoc(this.collectionRef,{
  certificationName: this.iCertification.certificationName,
  certificationDescription: this.iCertification.certificationDescription,
  certificationImage: this.downloadURL,
  certificationType: this.iCertification.certificationType,
  certificationURL: this.iCertification.certificationURL,
  userName: 'admin',
    
}).then(() => {
  alert('done')
}).catch((err) =>{
alert(err)
})
}else{
  alert('pls fill the fields with the right values')
}

}

}
