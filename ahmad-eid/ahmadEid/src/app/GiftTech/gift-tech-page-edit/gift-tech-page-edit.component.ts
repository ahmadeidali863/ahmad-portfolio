import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Action, Customization } from 'src/app/core/domin/viewPage';
import { Button, GiftPageCustomization, PageAction } from 'src/app/core/domin/giftPage';
import { GiftTechService } from 'src/app/core/services/gift-tech.service';

@Component({
  selector: 'app-gift-tech-page-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gift-tech-page-edit.component.html',
  styleUrls: ['./gift-tech-page-edit.component.scss']
})
export class GiftTechPageEditComponent {
  customizations: GiftPageCustomization[] = []
  customizationtest: GiftPageCustomization = {
    id: "",
    backgroundColor: "#000000",
    theme: "Dark",
    backgroundPattern: "Pattern1",
    pageActionRelated: "Action1",
    pageHeader: "Welcome to My Page",
    pageFooter: "Footer Text",
    pageDescription: "This is a customizable page.",
    textColor: "#000000",
    textFont: "Arial",
    textSize: "14px",
    music: "background-music.mp3",
    actions: [
      {
        pageId: "page1",
        pageName: "Home",
        buttons: [
          {
            buttonName: "Save",
            buttonOrder: 1,
            buttonBackground: "#FF5733",
            buttonTheme: "Primary",
            buttonFont: "Arial",
            actionType: "playMusic",
            buttonColor: "#FFFFFF",
            buttonSize: "16px"
          },
          {
            buttonName: "Cancel",
            buttonOrder: 2,
            buttonBackground: "#C70039",
            buttonTheme: "Danger",
            actionType: "showMessage",
            buttonFont: "Arial",
            buttonColor: "#FFFFFF",
            buttonSize: "16px"
          }
        ],
        pageIsOpened: true
      }
    ],
  }
;
  
  constructor(private giftTechService: GiftTechService) { }

  ngOnInit(): void {
    this.giftTechService.getCustomizations().subscribe(data => {
      if(data.length > 0){
        this.customizations = data.map(e => {
          // Get the data and replace the 'id' field
          const customizationData = e.payload.doc.data() as GiftPageCustomization;
          customizationData.id = e.payload.doc.id; // Update the existing 'id' field with the new value
          return customizationData;
        });
        this.customization.backgroundColor = this.customizations[0].backgroundColor
      }
      if(this.customizations.length > 0){
        this.customizationtest = this.customizations[0];
      }
    });
  }
//customization: GiftPageCustomization
  saveCustomization() {
    console.log(this.customizationtest);
    if (this.customizationtest.id) {
      this.giftTechService.updateCustomization(this.customizationtest.id, this.customizationtest);
    } else {
      this.giftTechService.addCustomization(this.customizationtest);
    }
  }

  deleteCustomization(id: string) {
    this.giftTechService.deleteCustomization(id);
  }
  
  
  
  
  
  
  
  
  
  
  showActions = false;
  showCustomisation = false;
  showBackground = false;

  toggleActions() {
    this.showActions = !this.showActions;
    if (this.showActions) {
      this.showCustomisation = false;
      this.showBackground = false;
    }
  }

  toggleCustomisationBackground() {
    this.showBackground = !this.showBackground;
    if (this.showBackground) {
      this.showActions = false;
      this.showCustomisation = false;
    }
  }

  toggleCustomisation() {
    this.showCustomisation = !this.showCustomisation;
    if (this.showCustomisation) {
      this.showActions = false;
      this.showBackground = false;
    }
  }

  onDocumentClick() {
    this.showActions = false;
    this.showCustomisation = false;
    this.showBackground = false;
  }

  changebackgraundtheme(themeName: string){
    this.customizationtest.backgroundColor = themeName;
  }

  customization: Customization = {
    backgroundColor: '#000000',
    textColor: '#000000',
    borderColor: '#cccccc',
    fontSize: '16px',
    boxColor: '#f0f0f0',
    boxBorderColor: '#cccccc',
    backgroundImage: '',
    musicFile: null,
  };

  actions: Action[] = [
    { id: 1, label: 'Play Music', actionType: 'playMusic', musicFile: undefined },
    { id: 2, label: 'Show Message', actionType: 'showMessage', message: 'Hello, World!' }
  ];

  onColorChange(color: string) {
    // Update the relevant customization property
    this.customization.backgroundColor = color;
  }
  private currentAudio: HTMLAudioElement | null = null;
  performAction(action: Button) {
    switch (action.actionType) {
      case 'playMusic':
        if (this.currentAudio) {
          if (this.currentAudio.paused) {
            this.currentAudio.play().catch(error => console.error('Playback failed:', error));
          } else {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0; 
          }
        } else if (this.customization.musicFile) {
          this.currentAudio = new Audio(URL.createObjectURL(this.customization.musicFile));
          this.currentAudio.play().catch(error => console.error('Playback failed:', error));
        } else {
          console.warn('No music file selected');
        }
        break;
      case 'showMessage':
        if (action) {
          alert(action);
        }
        break;
    }
  }


  @Output() customizationChange = new EventEmitter<Customization>();

  onMusicFileChange(event: any) {
    const file = event.target.files[0];
    this.customization.musicFile = file;
    this.customizationChange.emit(this.customization);
  }

  onBackgroundImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.customization.backgroundImage = e.target.result;
      this.customizationChange.emit(this.customization);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  
}
