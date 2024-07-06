import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";

@Component({
  selector: 'app-gift-tech-main',
  templateUrl: './gift-tech-main.component.html',
  styleUrls: ['./gift-tech-main.component.scss']
})
export class GiftTechMainComponent implements AfterViewInit {
  @ViewChild('canvasEl') canvasEl?: ElementRef;
  private ctx?: CanvasRenderingContext2D | null;
  private hearts: Heart[] = [];
  private numHearts = 30;

  ngAfterViewInit(): void {
    this.ctx = (this.canvasEl?.nativeElement as HTMLCanvasElement).getContext('2d');
    this.initializeHearts();
    requestAnimationFrame(this.draw.bind(this));
  }

  initializeHearts(): void {
    for (let i = 0; i < this.numHearts; i++) {
      const heart = new Heart(
        Math.random() * this.ctx!.canvas.width,
        Math.random() * this.ctx!.canvas.height,
        Math.random() * 30 + 10,
        `hsl(${Math.random() * 360}, 100%, 50%)`,
        Math.random() * 2 + 1
      );
      this.hearts.push(heart);
    }
  }

  draw(): void {
    this.ctx!.clearRect(0, 0, this.ctx!.canvas.width, this.ctx!.canvas.height);
    
    this.hearts.forEach(heart => {
      heart.move();
      this.ctx!.fillStyle = heart.color;
      this.ctx!.beginPath();
      this.ctx!.moveTo(heart.x, heart.y);
      heart.draw(this.ctx!);
    });
    
    requestAnimationFrame(this.draw.bind(this));
  }
}

class Heart {
  constructor(
    public x: number,
    public y: number,
    public size: number,
    public color: string,
    public speed: number
  ) {}

  move(): void {
    this.y += this.speed;
    if (this.y > 600) {  // adjust as per canvas height
      this.y = 0;
      this.x = Math.random() * 800;  // adjust as per canvas width
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineTo(this.x + this.size / 2, this.y - this.size / 3);
    ctx.bezierCurveTo(
      this.x + this.size,
      this.y - this.size / 3,
      this.x + this.size,
      this.y + this.size / 2,
      this.x,
      this.y + this.size
    );
    ctx.bezierCurveTo(
      this.x - this.size,
      this.y + this.size / 2,
      this.x - this.size / 2,
      this.y - this.size / 3,
      this.x,
      this.y - this.size / 3
    );
    ctx.closePath();
    ctx.fill();
  }
}