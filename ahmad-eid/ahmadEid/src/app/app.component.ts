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

    // Subscribe to router events to check URL on navigation end
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkUrl();
    });
  }
  }
   checkUrl(): void {
    // Get the current URL
    const url = this.router.url;

    // Check if the URL contains specific substrings
    this.containsNotYetNamed = url.includes('notYetNamed') || url.includes('giftTech/view');
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
}
