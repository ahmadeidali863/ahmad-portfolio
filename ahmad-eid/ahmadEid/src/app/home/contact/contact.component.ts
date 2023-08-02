import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
ngOnInit() {
  setTimeout(() => {
    this.box1 = true;
    }, 200);

    setTimeout(() => {
      this.box2 = true;
      }, 400);

      setTimeout(() => {
        this.box3 = true;
        }, 600);

        setTimeout(() => {
          this.box4 = true;
          }, 800);

          setTimeout(() => {
            this.box5 = true;
            }, 1000);

            setTimeout(() => {
              this.box6 = true;
              }, 1200);
}
box1:boolean=false;
box2:boolean=false;
box3:boolean=false;
box4:boolean=false;
box5:boolean=false;
box6:boolean=false;
}
