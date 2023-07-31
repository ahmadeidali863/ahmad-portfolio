import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from 'src/app/core/domin/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
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
  
ngOnInit() {
 this.iProject = JSON.parse(
  '{ "id": 1, "projectName": "Ideas from all around the world.", "projectDescription": "I made a tome of my day-by-day guide to Paris including the best restaurants, bars, museums, and photography spots. This guide is mobile-friendly and even has a map so you can easily find your way around.", "projectImage": "string", "projectType": "string", "projectTools": "string"}');
this.clickProject();
}

clickProject(){
const gridItems = document.querySelectorAll('.gridItem');
const gridBackground = document.querySelector('.gridBackground') as HTMLDivElement;
const gridItemsStyle =  document.querySelector('.gridItem') as HTMLElement;
const newWidth = `${gridItemsStyle.offsetWidth.toString()}`;
gridBackground.style.width =  newWidth + 'px';

gridItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const newPosition = `${(index * 100) / gridItems.length}%`;
    const newWidth = `${(item as HTMLElement).offsetWidth}px`; 

    gridBackground.style.width = newWidth;
    gridBackground.style.top = `calc(${newPosition} + 0.25rem)`;
  });
});
}
}
