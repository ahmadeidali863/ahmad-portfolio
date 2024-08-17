import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Action, Customization } from 'src/app/core/domin/viewPage';

@Component({
  selector: 'app-gift-tech-page-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gift-tech-page-edit.component.html',
  styleUrls: ['./gift-tech-page-edit.component.scss']
})
export class GiftTechPageEditComponent {
  showActions = false;
  showCustomisation = false;

  toggleActions() {
    this.showActions = !this.showActions;
    if (this.showActions) {
      this.showCustomisation = false;
    }
  }

  toggleCustomisation() {
    this.showCustomisation = !this.showCustomisation;
    if (this.showCustomisation) {
      this.showActions = false;
    }
  }

  onDocumentClick() {
    this.showActions = false;
    this.showCustomisation = false;
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
  performAction(action: Action) {
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
        if (action.message) {
          alert(action.message);
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
