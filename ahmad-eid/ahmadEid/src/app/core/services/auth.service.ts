import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}
 
  loginWithGoogle() {
    this.auth
      .signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        if (this.isEmailAllowed(result.user!.email!)) {
          localStorage.setItem('user', JSON.stringify(result));
          localStorage.setItem('userPass', JSON.stringify('a3b6fasdaagsdfh%$%#@#@$^%dfsdfs*#g4hv'));
          console.log('Logged in!');
        } else {
          localStorage.setItem('user', 'null');
          localStorage.setItem('userPass', 'null');
          this.logout();
          console.log('Email not allowed.');
        }
      })
      .catch((error) => {
        console.error('Error occurred during login:', error);
      });
  }
   isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    const userPass = JSON.parse(localStorage.getItem('userPass')!);
    return (user !== null && userPass === 'a3b6fasdaagsdfh%$%#@#@$^%dfsdfs*#g4hv');
  }
  logout() {
    this.auth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('userPass');
        console.log('Logged out!');
      })
      .catch((error) => {
        console.error('Error occurred during logout:', error);
      });
  }
  private isEmailAllowed(email: string | undefined): boolean {
    const allowedEmails = ['ahmadeidali863@gmail.com', 'user2@example.com'];
  
    return email !== undefined && allowedEmails.includes(email);
  }
}