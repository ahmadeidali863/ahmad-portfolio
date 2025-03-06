import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Firestore, collection, getDocs } from 'firebase/firestore';
import { PaypalComponent } from 'src/app/GiftTech/paypal/paypal.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone:true,
  imports:[ 
    CommonModule,
    RouterModule,PaypalComponent
    
    ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: Firestore, useFactory: getFirestore }
  ]
})


export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
  @ViewChild('welcome', { static: true }) welcomeRef!: ElementRef;
  @ViewChild('welcomeTwo', { static: true }) welcomeTwoRef!: ElementRef;
  @ViewChild('headerBlock', { static: true }) headerBlockRef!: ElementRef;
  @ViewChild('moon', { static: true }) moonRef!: ElementRef;
 
  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private bubbles: Bubble[] = [];
  private readonly maxBubbles = 300;
  showText1 = false;
  showText2 = false;

  private starQuotes: string[] = [
    "The stars are the land-marks of the universe.",
    "Shoot for the moon. Even if you miss, you'll land among the stars.",
    "Stars can't shine without darkness.",
    "The stars are the jewels of the night.",
    "Look at the stars. See their beauty. And in that beauty, see yourself."
  ];

  async checkPayments(firestore: Firestore) {
    const paymentsRef = collection(firestore, 'payments');
    const snapshot = await getDocs(paymentsRef);
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  }
  ngAfterViewInit() {

    setTimeout(() => {
      this.showText1 = true;
    }, 1000);

    setTimeout(() => {
      this.showText1 = false;
      this.showText2 = true;
    }, 3000);

    setTimeout(() => {
      this.welcomeRef.nativeElement.style.backgroundColor = 'transparent';
      
    }, 5000);
    setTimeout(() => {
      this.welcomeRef.nativeElement.style.display = 'none';
      this.welcomeTwoRef.nativeElement.style.display = 'none';
      this.moonRef.nativeElement.style.display = 'none';
      this.headerBlockRef.nativeElement.style.opacity = '0';
    }, 6000);
    setTimeout(() => {
      this.headerBlockRef.nativeElement.style.display = 'none';
      this.welcomeTwoRef.nativeElement.style.display = 'grid';
      this.moonRef.nativeElement.style.display = 'grid';
  
    }, 6500);
  }
  ngOnInit() {
    
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas!.getContext('2d')!;
    this.canvas!.width = window.innerWidth;
    this.canvas!.height = window.innerHeight;

    this.createBubbles();
    this.animate();
  }

  private createBubbles() {
    for (let i = 0; i < this.maxBubbles; i++) {
      const bubble = new Bubble(
        Math.random() * (this.canvas!.width - 100) + 50,
        Math.random() * (this.canvas!.height - 100) + 50,
        Math.random() * 20 + 10
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
    this.speed = 1 * 1 - 0.8;
    this.directionX = Math.random() < 0.5 ? -1 : 1;
    this.directionY = Math.random() < 0.5 ? -1 : 1;
    this.color = this.starColors[Math.floor(Math.random() * this.starColors.length)];
    this.flashing = false;
    this.flashingSpeed = Math.random() * 0.05 + 0.02; 
  }

  update() {
    this.x += this.speed * this.directionX;
    this.y += this.speed * this.directionY;

    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.directionY = -this.directionY;
    }
  }

  toggleFlashing() {
    this.flashing = !this.flashing;
  }

  updateOpacity() {
    if (this.flashing) {
      this.opacity += this.flashingSpeed;

      if (this.opacity > 1) {
        this.opacity = 0.8;
        this.flashingSpeed = -this.flashingSpeed;
      } else if (this.opacity < 0.1) {
        this.opacity = 0.1;
        this.flashingSpeed = -this.flashingSpeed;
      }
    }
  }

}
