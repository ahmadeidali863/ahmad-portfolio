import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { collection, getDocs } from 'firebase/firestore';
import { database } from 'src/app/app.module';
import { Skill } from 'src/app/core/domin/skill';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  collectionRef = collection(database, 'skills');
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
  dataLoaded: boolean = false;
  skills: Skill[] = [];
  technicalSkills: Skill[] = [];
  interpersonalSkills: Skill[] = [];
  industryKnowledgeSkills: Skill[] = [];
  
  getdata() {
    this.skills = [];
    getDocs(this.collectionRef)
      .then((res) => {
        const skillsData = res.docs.map((item) => {
          return { ...item.data(), id: item.id } as unknown; 
        });
        console.log(skillsData);
        this.technicalSkills = [];
        this.interpersonalSkills = [];
        this.industryKnowledgeSkills = [];
  
        skillsData.forEach((skillData) => {
          const skill = skillData as Skill; 
          console.log(skill);
          switch (skill.skillType) {
            case 'Technical':
              this.dataLoaded = true;
              this.technicalSkills.push(skill);
              console.log( this.technicalSkills);
              break;
            case 'Interpersonal':
              this.interpersonalSkills.push(skill);
              break;
            case 'Industry Knowledge':
              this.industryKnowledgeSkills.push(skill);
              break;
            default:
              break;
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
  }
  
  
ngOnInit() {
  setTimeout(() => {
  this.getdata();
  }, 200);
}
}
