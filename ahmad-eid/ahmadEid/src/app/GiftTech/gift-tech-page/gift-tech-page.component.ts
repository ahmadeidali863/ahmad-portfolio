import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gift-tech-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gift-tech-page.component.html',
  styleUrls: ['./gift-tech-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftTechPageComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  customizationtest: any = {
    id: "",
    backgroundColor: "#000000",
    theme: "stars",
    backgroundPattern: "Pattern1",
    pageActionRelated: "Action1",
    pageHeader: "Welcome to My Page",
    pageFooter: "Footer Text",
    pageDescription: "This is a customizable page.",
    textColor: "#ffffff",
    textFont: "Arial",
    textSize: "14px",
    backgroundImage: "",
    musicFile: undefined,
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

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private bubbles: Bubble[] = [];
  private maxBubbles = (window.innerWidth + window.innerHeight) / 10;
  loadingLove: boolean = true;
  fillLevel = 0;
  isMovingDown: boolean = true;
  showCanvas = false;
  showNextStep = false;
  
  ngOnDestroy(): void {
    
  }
  

  ngOnInit(): void {

    console.log(this.customizationtest.theme);
    if (this.customizationtest.theme = 'stars') {
      this.canvas = this.canvasRef.nativeElement;
      this.context = this.canvas.getContext('2d')!;
      this.canvas!.width = window.innerWidth;
      this.canvas!.height = window.innerHeight;
      this.createBubbles()
      this.animate();
    }
    setTimeout(() => {
      this.loadingLove = false;
    }, 300000000000000);

  }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes })
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

  @ViewChild('canvas2', { static: false }) canvas2!: ElementRef<HTMLCanvasElement>;


  startAnimation(): void {
    this.showCanvas = true;

    const numStars = 200;
    setTimeout(() => {
      this.animateStars(numStars);
    }, 0);

    setTimeout(() => {
      this.showCanvas = false;
      this.showNextStep = true;
    }, 3000);
  }

  animateStars(numStars: number): void {
    const canvas = this.canvas2!.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      color: string;
      size: number;
    }[] = [];

    function getRandomColor(): string {
      const colors = ['#ffffff', '#ffcc66', '#66ccff', '#ff66cc'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function initializeStars() {
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          speedX: (Math.random() - 0.5) * 3,
          speedY: (Math.random() - 0.5) * 3,
          color: getRandomColor(),
          size: Math.random() * 2 + 1
        });
      }
    }

    function addStar() {
      stars.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        speedX: (Math.random() - 0.3) * 2,
        speedY: (Math.random() - 0.3) * 2,
        color: getRandomColor(),
        size: Math.random() * 2 + 1
      });

      if (stars.length > 200) {
        stars.shift();
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.x += star.speedX * 4;
        star.y += star.speedY * 4;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });
    }

    function animate2() {
      drawStars();
      addStar();
      requestAnimationFrame(animate2);
    }

    initializeStars();
    animate2();
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
    this.radius = radius * 0.06;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.speed = Math.random() * 0.5 + 0.1;
    this.directionX = Math.random() < 0.5 ? -1 : 1;
    this.directionY = Math.random() < 0.5 ? -1 : 1;
    this.color = this.starColors[Math.floor(Math.random() * this.starColors.length)]
    this.flashing = false;
    this.flashingSpeed = Math.random() * 0.05 + 0.02;
  }

  update() {
    this.x += this.speed * this.directionX;
    this.y += this.speed * this.directionY;

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
    if (this.flashing) {
      this.opacity += this.flashingSpeed;
      if (this.opacity >= 0.5 || this.opacity <= 0.1) {
        this.flashingSpeed *= -1;
      }
    }
  }

  toggleFlashing() {
    this.flashing = !this.flashing;
  }
}