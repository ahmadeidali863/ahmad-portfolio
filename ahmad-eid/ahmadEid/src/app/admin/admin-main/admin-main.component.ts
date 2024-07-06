import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent {
constructor(public auth: AuthService){
  if(this.auth.isLoggedIn()){

  }else{
    
  }
}

}
