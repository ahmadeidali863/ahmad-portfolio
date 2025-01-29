import { Component, OnInit } from '@angular/core';
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
export class ProjectsComponent implements OnInit {
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

  private starQuotes: string[] = [
    "The stars are the land-marks of the universe.",
    "Shoot for the moon. Even if you miss, you'll land among the stars.",
    "Stars can't shine without darkness.",
    "The stars are the jewels of the night.",
    "Look at the stars. See their beauty. And in that beauty, see yourself."
  ];

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
  } else {
    this.selectedProjects = [];
  }
}

openProjectLink(project: Project) {
  if (project.projectURL && project.projectURL !== '-') {
    window.open(project.projectURL, '_blank');
  } else {
    window.open(project.projectImage, '_blank');
  }
}

ngOnInit() {
  this.getdata();

    setTimeout(() => {
    }, 200);

   // this.clickProject();
}

private getRandomStarQuote(): string {
  const randomIndex = Math.floor(Math.random() * this.starQuotes.length);
  return this.starQuotes[randomIndex];
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
