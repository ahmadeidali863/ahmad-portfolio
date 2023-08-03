import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from 'src/app/core/domin/project';
import { collection, getDocs } from 'firebase/firestore';
import { database } from 'src/app/app.module';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Project[] = []
  firstProjects: Project[] = []
  public iProject: Project = {
    id: 0,
    projectName: '',
    projectDescription: '',
    projectImage: '',
    projectType: '',
    projectTools: [],
    userName: '',
    title: '',
    description: '',
    projectImageFile: undefined,
    projectURL: '',
    projectsourceCodeURL: ''
  }
  collectionRef = collection(database, 'projects');
  projectTypeGroups: { [projectType: string]: Project[] } = {};

getdata() {
  this.projects = [];
  this.firstProjects = [];
  this.projectTypeGroups = {}; 

  getDocs(this.collectionRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const projectData = doc.data() as Project;
        this.projects.push(projectData);
        if(projectData.projectType == 'Web Development'){
          this.firstProjects.push(projectData)
        }
        if (!this.projectTypeGroups[projectData.projectType]) {
          this.projectTypeGroups[projectData.projectType] = [projectData];
          
        } else {
          this.projectTypeGroups[projectData.projectType].push(projectData);
        }
       
      });
    
    })
    .catch((err) => {
      alert(err);
    });
}
selectedProjects: Project[] = [];

getProjectTypes(): string[] {
  return Object.keys(this.projectTypeGroups);
}

onProjectTypeSelected(event: any) {
    const selectedProjectType = event.target.value;
  if (selectedProjectType) {
    this.selectedProjects = this.projectTypeGroups[selectedProjectType];
  }else {
    this.selectedProjects = [];
  }
  
//this.clickProject();

}

ngOnInit() {
  this.getdata();

    setTimeout(() => {
    }, 200);

   // this.clickProject();
}

// onProjectClick(project: Project) {
//   this.iProject = project;
// }
// clickProject(){
// const gridItems = document.querySelectorAll('.gridItem');
// const gridBackground = document.querySelector('.gridBackground') as HTMLDivElement;
// const gridItemsStyle =  document.querySelector('.gridItem') as HTMLElement;
// const newWidth = `${gridItemsStyle?.offsetWidth.toString()}`;
// gridBackground.style.width =  newWidth + 'px';

// gridItems.forEach((item, index) => {
//   item.addEventListener('click', () => {
//     const newPosition = `${(index * 100) / gridItems.length}%`;
//     const newWidth = `${(item as HTMLElement).offsetWidth}px`; 

//     gridBackground.style.width = newWidth;
//     gridBackground.style.top = `calc(${newPosition} + 0.25rem)`;
  
   
//   });
// });
// }
}
