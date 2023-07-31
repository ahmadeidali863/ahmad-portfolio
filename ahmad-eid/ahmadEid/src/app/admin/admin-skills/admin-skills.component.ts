import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from 'src/app/core/domin/skill';
import { FormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { database } from 'src/app/app.module';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.scss']
})
export class AdminSkillsComponent {
  updateCateguriesId:string = '';
  updateProject:boolean =false;
  public iSkill: Skill = {
    id: 0,
    skillName: '',
    skillDescription: '',
    skillImage: '',
    skillType: '',
    skillURL: '',
    userName: '',
    skillImageFile: undefined
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
        const filePath = `skills/${new Date().getTime()}_${this.selectedFile!.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);
        this.url = event.target?.result;
        this.imageSubmited = true;
        this.iSkill.skillImageFile = file;
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

collectionRef = collection(database, 'skills');
librarySubmitted : boolean = false;
addProject(skillfrm:any){
  console.log(this.iSkill)
  if (skillfrm.form.valid) {
    this.librarySubmitted = true;
    if (this.iSkill.skillName == '' || this.iSkill.skillDescription == ''
    || this.iSkill.skillURL == '' || this.iSkill.skillType == ''
    || this.downloadURL== '') {
      return;
    }
addDoc(this.collectionRef,{
  skillName: this.iSkill.skillName,
  skillDescription: this.iSkill.skillDescription,
  skillImage: this.downloadURL,
  skillType: this.iSkill.skillType,
  skillURL: this.iSkill.skillURL,
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
