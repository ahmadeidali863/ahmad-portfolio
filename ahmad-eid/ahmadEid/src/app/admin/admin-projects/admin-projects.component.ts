import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from 'src/app/core/domin/project';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { database } from 'src/app/app.module';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent implements OnInit{
  projects: any[] = [];
  updateCateguriesId:string = '';
  librarySubmitted:boolean =false;
  imageSubmited:boolean =false;
  updateProject:boolean =false;
  tools:string = '';
  previewImageFile : File | any;
  public iProject: Project = {
    id: 0,
    projectName: '',
    projectDescription: '',
    projectImage: '',
    projectType: '',
    projectURL: '',
    projectsourceCodeURL: '',
    projectTools: [],
    userName: '',
    title: '',
    description: '',
    projectImageFile: undefined
  }
  // public image: Images = {
  //   imageSrc: '',
  //   title: '',
  //   categoryId: '',
  //   userName: '',
  //   id: ''
  // }
//public imageService = inject(ImageService);
//------------------

progress: number = 0;

uploadData() {
 const intervalId = setInterval(() => {
    this.progress += 1;
    if (this.progress >= 100) {
      alert('added');
      this.imageSubmited = false;
      clearInterval(intervalId);
      this.progress = 0;
      return;
    }
  }, 50);
}
//----------------------

collectionRef = collection(database, 'projects');

addProject(projectfrm:any){
  if (projectfrm.form.valid) {
    this.librarySubmitted = true;
    if (this.iProject.projectName == '' || this.iProject.projectDescription == ''
    || this.iProject.projectType == '' || this.iProject.projectURL == ''
    || this.iProject.projectsourceCodeURL == '') {
      return;
    }
addDoc(this.collectionRef,{
    projectName: this.iProject.projectName,
    projectDescription: this.iProject.projectDescription,
    projectImage: this.downloadURL,
    projectType: this.iProject.projectType,
    projectURL: this.iProject.projectURL,
    projectsourceCodeURL: this.iProject.projectsourceCodeURL,
    projectTools: this.tools.split(',').map(word => word.trim()),
    userName: 'admin',
    title: this.iProject.title,
    description: this.iProject.description,
   // projectImageFile: this.iProject.projectImageFile
    
}).then(() => {
  this.getdata();
  alert('done')
}).catch((err) =>{
alert(err)
})
}else{
  alert('pls fill the fields with the right values')
}

}

clear(){
  this.updateProject =false;
  this.updateCateguriesId ='';
   this.iProject.projectName = '';
    this.iProject.projectDescription= '';
   this.iProject.projectType= '';
    this.iProject.projectURL='';
     this.iProject.projectsourceCodeURL='';
     this.iProject.projectTools = [];
     this.tools='';
}
updateProjects(projectfrm:any){
  if (projectfrm.form.valid) {
    this.librarySubmitted = true;
    if (this.iProject.projectName == '' || this.iProject.projectDescription == ''
    || this.iProject.projectType == '' || this.iProject.projectURL == ''
    || this.iProject.projectsourceCodeURL == '') {
      return;
    }
  const updateCateguriesRef = doc(database, 'projects', this.updateCateguriesId);
  updateDoc(updateCateguriesRef, {
    projectName: this.iProject.projectName,
    projectDescription: this.iProject.projectDescription,
    projectImage: this.downloadURL,
    projectType: this.iProject.projectType,
    projectURL: this.iProject.projectURL,
    projectsourceCodeURL: this.iProject.projectsourceCodeURL,
    projectTools: this.tools.split(',').map(word => word.trim()),
    userName: 'admin',
    title: this.iProject.title,
    description: this.iProject.description,
  }).then(() => {
    alert('data updated');
  }).catch((err) =>{
  alert(err)
})
}else{
  alert('pls fill the fields with the right values')
}
}
updateActive(item:any){
  this.updateProject =true;
  this.updateCateguriesId = item.id;
   this.iProject.projectName = item.projectName;
    this.iProject.projectDescription= item.projectDescription;
   this.iProject.projectType= item.projectType;
    this.iProject.projectURL= item.projectURL;
     this.iProject.projectsourceCodeURL= item.projectsourceCodeURL;
}
constructor(private storage: AngularFireStorage) {}
getdata(){
  this.projects = [];
  getDocs(this.collectionRef).then((res) =>{
    this.projects.push( res.docs.map((item) =>{
      return {...item.data(), id: item.id};
    }))
    }).catch((err) => {
      alert(err)
    })
}
ngOnInit() {
  this.getdata();
}
selectedFile: File | null = null;
downloadURL: string | null = null;


//--------------------
//uploadImage

url: any = '';
fileDigitalProducts: any = '';

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
        const filePath = `projects/${new Date().getTime()}_${this.selectedFile!.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);
        this.url = event.target?.result;
        this.previewImageFile = file;
        this.imageSubmited = true;
        this.iProject.projectImageFile = file;
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
}
