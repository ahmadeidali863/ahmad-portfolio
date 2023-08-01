export interface Project {
    id: number;
    projectName: string ;
    projectDescription: string ;
    projectImage: string;
    projectType: string ;
    projectURL: string ;
    projectsourceCodeURL: string ;
    projectTools: string[] ;
    userName : string ;
    title: string ;
    description: string ;
    projectImageFile : File | undefined;
  }