import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { collection, getDocs } from 'firebase/firestore';
import { database } from 'src/app/app.module';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  collectionRef = collection(database, 'skills');
  skills: any[] = [];
  getdata(){
   this.skills = [];
    getDocs(this.collectionRef).then((res) =>{
  this.skills.push( res.docs.map((item) =>{
    return {...item.data(), id: item.id};
  }))
      }).catch((err) => {
        alert(err)
      })
  }

 
  ngOnInit() {
    this.getdata();
  }
}
