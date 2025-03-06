import { Component, HostListener, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';

import { addDoc, collection } from '@angular/fire/firestore';
import { database } from './app.module';
import { UserInfo } from './core/domin/user';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ahmadEid';
  mobileMenu : boolean = false;
  containsNotYetNamed: boolean = false;
gift: boolean = false;
  mouseX: number = 0;
  mouseY: number = 0;
  isHovering: boolean = false;
  hoverText: string = '';

  private starQuotes: string[] = [
    "The stars are the land-marks of the universe.",
    "Shoot for the moon. Even if you miss, you'll land among the stars.",
    "Stars can't shine without darkness.",
    "The stars are the jewels of the night.",
    "Look at the stars. See their beauty. And in that beauty, see yourself."
  ];

  //private route = inject(ActivatedRoute);
  
  public iUserInfo: UserInfo = {
    id: 0,
    userBrowser: '',
    userScreenResolution: '',
    userLanguagePreference: '',
    userDeviceType: '',
    userLatitudeLongitude: '',
    userCity: '',
    userCountry: '',
    userTimeSpent: '',
    userReferralSource: '',
    userIPAddress: '',
    userInternetServiceProvider: '',
    userNetworkType: '',
    userConnectionSpeed: '',
    userDarkModePreference: '',
    userDeviceModel: '',
    userOperatingSystemVersion: '',
    userBrowserVersion: '',
    userErrorTracking: '',
    userSessionDuration: '',
    userNumberOfSessions: '',
    userTime: '',
    userLatitude: '',
    userLongitude: ''
  }
   routerSubscription!: Subscription;
 constructor(public auth : AuthService,private http: HttpClient,private route: ActivatedRoute, private router: Router,  @Inject(PLATFORM_ID) private platformId: Object){
 }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    //this.getvisterInfo();
  //let id = this.route.snapshot.url;
  this.checkUrl();

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkUrl();
    });
  }
  }

   checkUrl(): void {
    const url = this.router.url;
   
    this.containsNotYetNamed = url.includes('notYetNamed') || url.includes('giftTech');
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  collectionRef = collection(database, 'userInfo');
 getvisterInfo(){ 
  if (isPlatformBrowser(this.platformId)) {
  this.iUserInfo.userBrowser = window.navigator.userAgent;
  this.iUserInfo.userScreenResolution = `${window.screen.width}x${window.screen.height}`;
  this.iUserInfo.userLanguagePreference = navigator.language;
  this.iUserInfo.userTime = new Date().toISOString();

  const request = this.http.get('https://api.ipify.org/?format=json');
  request.subscribe((res: any) => {
    this.iUserInfo.userIPAddress = res.ip;
   // this.addUserInfoDocument();
  });

  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     this.iUserInfo.userLatitude = position.coords.latitude.toString();
  //     this.iUserInfo.userLongitude = position.coords.longitude.toString();

  //     this.addUserInfoDocument();
  //   },
  //   (error) => {
  //     console.error('Error getting geolocation:', error);

  //     this.addUserInfoDocument();
  //   }
  // );
}
}

addUserInfoDocument() {
  addDoc(this.collectionRef, {
    id: this.iUserInfo.id,
    userBrowser: this.iUserInfo.userBrowser,
    userScreenResolution: this.iUserInfo.userScreenResolution,
    userLanguagePreference: this.iUserInfo.userLanguagePreference,
    userDeviceType: this.iUserInfo.userDeviceType,
    userLatitudeLongitude: this.iUserInfo.userLatitudeLongitude,
    userCity: this.iUserInfo.userCity,
    userLatitude: this.iUserInfo.userLatitude,
    userLongitude: this.iUserInfo.userLongitude,
    userCountry: this.iUserInfo.userCountry,
    userTimeSpent: this.iUserInfo.userTimeSpent,
    userReferralSource: this.iUserInfo.userReferralSource,
    userIPAddress: this.iUserInfo.userIPAddress,
    userInternetServiceProvider: this.iUserInfo.userInternetServiceProvider,
    userNetworkType: this.iUserInfo.userNetworkType,
    userConnectionSpeed: this.iUserInfo.userConnectionSpeed,
    userDarkModePreference: this.iUserInfo.userDarkModePreference,
    userDeviceModel: this.iUserInfo.userDeviceModel,
    userOperatingSystemVersion: this.iUserInfo.userOperatingSystemVersion,
    userBrowserVersion: this.iUserInfo.userBrowserVersion,
    userErrorTracking: this.iUserInfo.userErrorTracking,
    userSessionDuration: this.iUserInfo.userSessionDuration,
    userNumberOfSessions: this.iUserInfo.userNumberOfSessions,
    userTime: this.iUserInfo.userTime
  })
    .catch((error) => {
      console.error('Error adding user info document:', error);
    });
}




  //-----------------OpenMobileMenu
    openMobileMenu () {
  
      if (this.mobileMenu == false) {
        document.getElementById("headerMobile")!.removeAttribute("class");
        document.getElementById("headerMobile")?.classList.add("openMenuMobile");
        this.mobileMenu = true;
      } else {
        document.getElementById("headerMobile")!.removeAttribute("class");
        document.getElementById("headerMobile")?.classList.add("closeMenuMobile");
        this.mobileMenu = false;
      }
    }
  //-----------------scrolled
    scrolled  = false;
    @HostListener('window:scroll', [])
    onWindowScroll() {
      if (isPlatformBrowser(this.platformId)) {
      const yOffset = window.pageYOffset;
      if (yOffset > 20) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
    }
    theme = 'themeBlack';

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }
  
    @HostListener('mouseover', ['$event'])
    onMouseOver(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.hasAttribute('data-hover-text')) {
        this.isHovering = true;
        this.hoverText = target.getAttribute('data-hover-text') || '';
        if (target.tagName === 'CANVAS') {
          this.hoverText = this.getRandomStarQuote();
        }
      } else {
        this.isHovering = false;
      }
    }
  
    @HostListener('mouseout', ['$event'])
    onMouseOut(event: MouseEvent) {
      this.isHovering = false;
      this.hoverText = '';
    }

    private getRandomStarQuote(): string {
      const randomIndex = Math.floor(Math.random() * this.starQuotes.length);
      return this.starQuotes[randomIndex];
    }
}
