import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-valentine-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './valentine-day.component.html',
  styleUrls: ['./valentine-day.component.scss']
})
export class ValentineDayComponent implements OnInit {
  audio: any;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private bubbles: Bubble[] = [];
  private maxBubbles =  (window.innerWidth + window.innerHeight)/10 ;
  one: boolean = true;
  two: boolean = false;
  three: boolean = false;
  wordDelays: { word: string, delay: number }[] = [
    { word: 'There are those of us who like to venture to the unexplored', delay: 500 },
    { word: 'to see the beauty and the strange', delay: 5800 },
    { word: 'and unKnown', delay: 8900 },
    { word: 'those of us who go out there', delay: 11800 },
    { word: ' with a sense of', delay: 14200 },
    { word: 'Wonder', delay: 16400 }
  ];

  displayedWord: string= "";
  currentIndex: number = 0;
  fontSize: number = 0;
  constructor(){

  }
 
  ngOnInit() {
    this.calculateFontSize(); 
     
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas!.getContext('2d')!;
    this.canvas!.width = window.innerWidth ;
    this.canvas!.height = window.innerHeight;

    this.createBubbles();
    this.animate();

   //this.audio = new Audio('../assets/Keishou - MinakoSeki - Kingdom OST.mp3');
  
   
  }
  private calculateFontSize() {
    // Calculate font size based on the window width
    this.fontSize = Math.floor(window.innerWidth * 0.05); // Adjust the factor as needed
  }
  private createBubbles() {
    for (let i = 0; i < this.maxBubbles; i++) {
      const bubble = new Bubble(
        Math.random() * (this.canvas!.width - 100) + 50,
        Math.random() * (this.canvas!.height - 100) + 50,
        Math.random() * 20 + 10,
      );
  
      this.bubbles.push(bubble);
    }
  }

  private animate() {
    this.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    
    this.bubbles.forEach(bubble => {
      bubble.update();
      bubble.updateOpacity();
      this.context!.beginPath();
      this.context!.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      this.context!.fillStyle = `rgba(${bubble.color}, ${bubble.opacity})`;
     
     
      this.context!.fill();
    });

    if (Math.random() < 0.01) {
      this.bubbles.forEach(bubble => {
        bubble.toggleFlashing();
      });
    }

    requestAnimationFrame(() => this.animate());
  }
  openWebsite(url:string){
    window.open(url);
  }
  
  
  // playAudioThree() {
  //   this.one = false;
  //   this.two = false;
  //   this.three = true;
  //   this.audio = new Audio('../assets/Keishou - MinakoSeki - Kingdom OST.mp3');
  //   this.audio.autoplay = true;
  

  // }
  playAudioThree() {
    this.one = false;
    this.two = false;
    this.three = true;
    this.audio = new Audio('../assets/Keishou - MinakoSeki - Kingdom OST.mp3');
    this.audio.autoplay = true;
  // Fade out the stars gradually
  const fadeOutInterval = setInterval(() => {
    // Reduce the opacity of each bubble
    this.bubbles.forEach(bubble => {
      bubble.opacity -= 0.01; // You can adjust the fading speed as needed
      if (bubble.opacity < 0.4) {
        bubble.opacity = 0.4;
      }
    });

    // Clear the canvas and redraw bubbles with updated opacity
    this.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    this.bubbles.forEach(bubble => {
      this.context!.beginPath();
      this.context!.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      this.context!.fillStyle = `rgba(#ff0000, ${bubble.opacity})`;
      this.context!.fill();
    });

    // Check if all stars have faded out
    const allFadedOut = this.bubbles.every(bubble => bubble.opacity === 0.4);
    if (allFadedOut) {
      clearInterval(fadeOutInterval);
   console.log("worked")
      this.one =false;
      this.two = false;
    this.three = true;
      // Change the background to Valentine theme
   //   document.body.style.backgroundColor = 'pink'; // Example color, you can set any color/image here
    }
  }, 50); // Interval for fading out, adjust as needed
}
  
  displayWordsWithDelay() {
    let totalDelay = 0;
    this.wordDelays.forEach((wordDelay) => {
      setTimeout(() => {
        this.displayedWord = wordDelay.word;
        totalDelay++
        console.log({totalDelay})
        console.log(this.wordDelays.length)
        setTimeout(() => {
        if (totalDelay == this.wordDelays.length) {
          console.log("it worked")
            this.playAudioThree();
        }
      },2000);
      }, wordDelay.delay);
    });
    
  }
  playAudio() {
    this.one = false;
    this.two = true;
    this.audio = new Audio('../assets/x2mate (mp3cut.net).mp3');
   this.audio.autoplay = true;
   this.displayWordsWithDelay();
  }
 
  pauseAudio(){
    console.log("pause");
    if (this.audio) {
      this.audio.pause();
    } else {
      console.error("Audio object not yet initialized. Cannot pause.");
    }
  }

  
}


class Bubble {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  directionX: number;
  directionY: number;
  color: string;
  flashing: boolean;
  flashingSpeed: number;
 starColors = ['255, 255, 255', '255, 227, 159', '255, 214, 153', '255, 160, 122', '255, 192, 203'];

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius * 0.06 ;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.speed = Math.random() * 0.5 + 0.1;
    this.directionX = Math.random() < 0.5 ? -1 : 1;
    this.directionY = Math.random() < 0.5 ? -1 : 1;
    this.color = this.starColors[Math.floor(Math.random() * this.starColors.length)]
    this.flashing = false;
    this.flashingSpeed = Math.random() * 0.05 + 0.02; 
  }

  update() {
    // Move the star
    this.x += this.speed * this.directionX;
    this.y += this.speed * this.directionY;
    
    // Wrap the stars around the canvas if they go beyond its boundaries
    if (this.x < -this.radius) {
      this.x = window.innerWidth + this.radius;
    }
    if (this.x > window.innerWidth + this.radius) {
      this.x = -this.radius;
    }
    if (this.y < -this.radius) {
      this.y = window.innerHeight + this.radius;
    }
    if (this.y > window.innerHeight + this.radius) {
      this.y = -this.radius;
    }
  }
  updateOpacity() {
    // Make the star twinkle by changing its opacity
    if (this.flashing) {
      this.opacity += this.flashingSpeed;
      if (this.opacity >= 0.5 || this.opacity <= 0.1) {
        this.flashingSpeed *= -1; // Reverse flashing speed
      }
    }
  }
  // update() {
  //   this.x += this.speed * this.directionX;
  //   this.y += this.speed * this.directionY;

  //   if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
  //     this.directionX = -this.directionX;
  //   }

  //   if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
  //     this.directionY = -this.directionY;
  //   }
  // }

  toggleFlashing() {
    this.flashing = !this.flashing;
  }

  // updateOpacity() {
  //   if (this.flashing) {
  //     this.opacity += this.flashingSpeed;

  //     if (this.opacity > 1) {
  //       this.opacity = 0.8;
  //       this.flashingSpeed = -this.flashingSpeed;
  //     } else if (this.opacity < 0.1) {
  //       this.opacity = 0.1;
  //       this.flashingSpeed = -this.flashingSpeed;
  //     }
  //   }
//  }


 
}
