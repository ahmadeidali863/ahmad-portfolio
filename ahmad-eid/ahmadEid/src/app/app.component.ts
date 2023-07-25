import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ahmadEid';
  mobileMenu : boolean = false;

  //-----------------OpenMobileMenu
    openMobileMenu () {
      if (this.mobileMenu == false) {
        document.getElementById("menuMobile")!.removeAttribute("class");
        document.getElementById("menuMobile")?.classList.add("openMenuMobile");
        this.mobileMenu = true;
      } else {
        document.getElementById("menuMobile")!.removeAttribute("class");
        document.getElementById("menuMobile")?.classList.add("closeMenuMobile");
        this.mobileMenu = false;
      }
    }
  //-----------------scrolled
    scrolled  = false;
    @HostListener('window:scroll', [])
    onWindowScroll() {
      const yOffset = window.pageYOffset;
      if (yOffset > 20) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
    theme = 'themeBlack';
}
