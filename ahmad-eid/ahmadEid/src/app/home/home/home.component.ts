import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HomeRoutingModule } from '../home-routing.module';

@Component({
  selector: 'app-home',
  standalone:true,
  imports:[ 
    CommonModule,
    HomeRoutingModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private bubbles: Bubble[] = [];
  private readonly maxBubbles = 25;
  private selectedBubble: Bubble | null = null;
  private mouseDown = false;

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas!.getContext('2d')!;

    this.canvas!.width = window.innerWidth;
    this.canvas!.height = window.innerHeight;

    this.createBubbles();
    this.setupEventListeners();
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
  private setupEventListeners() {
    
    this.canvas!.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas!.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas!.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas!.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  private onMouseDown(event: MouseEvent) {
    const mousePos = this.getMousePosition(event);
    this.selectedBubble = this.findBubbleAtPosition(mousePos);
    this.mouseDown = true;
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.mouseDown) {
      return;
    }

    if (this.selectedBubble) {
      const mousePos = this.getMousePosition(event);
      this.selectedBubble.x = mousePos.x;
      this.selectedBubble.y = mousePos.y;
    }
  }

  private onMouseUp() {
    this.selectedBubble = null;
    this.mouseDown = false;
  }

  private onMouseLeave() {
    this.selectedBubble = null;
    this.mouseDown = false;
  }

  private getMousePosition(event: MouseEvent): { x: number, y: number } {
    const rect = this.canvas!.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  private findBubbleAtPosition(position: { x: number, y: number }): Bubble | null {
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const bubble = this.bubbles[i];
      const dx = position.x - bubble.x;
      const dy = position.y - bubble.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= bubble.radius) {
        return bubble;
      }
    }

    return null;
  }

  private animate() {
    this.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);

    this.bubbles.forEach(bubble => {
      bubble.update();

      this.context!.beginPath();
      this.context!.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      this.context!.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
      // this.context!.shadowColor = "#ffffff";
      // this.context!.shadowBlur = 3;
      // this.context!.shadowOffsetX = -3;
      // this.context!.shadowOffsetY = -2;
     
      this.context!.fill();
    });

    requestAnimationFrame(() => this.animate());
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

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius * 0.1 ;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.speed = Math.random() * 1 + 0.5;
    this.directionX = Math.random() < 0.5 ? -1 : 1;
    this.directionY = Math.random() < 0.5 ? -1 : 1;
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
}
