import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: 'app-gift-tech-main',
  templateUrl: './gift-tech-main.component.html',
  styleUrls: ['./gift-tech-main.component.scss']
})
export class GiftTechMainComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private hearts: Heart[] = [];
  private readonly numHearts: number = 100;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    this.createHearts();
    this.animate();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.resizeCanvas();
  }

  private resizeCanvas() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  private createHearts() {
    for (let i = 0; i < this.numHearts; i++) {
      this.hearts.push(new Heart(
        Math.random() * this.canvas.nativeElement.width,
        Math.random() * this.canvas.nativeElement.height
      ));
    }
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    for (const heart of this.hearts) {
      heart.update(this.canvas.nativeElement);
      heart.draw(this.ctx);
    }
    requestAnimationFrame(() => this.animate());
  }
}
class Heart {
  private x: number;
  private y: number;
  private dx: number;
  private dy: number;
  private readonly size: number = 13;
  private readonly speed: number = 3;
  private color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5) * this.speed;
    this.dy = (Math.random() - 0.5) * this.speed;
    this.color = this.getRandomColor();
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  update(canvas: HTMLCanvasElement) {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    for (let i = 0; i < Math.PI * 2; i += 0.01) {
      const scale = this.size / 25;
      const x = scale * (16 * Math.pow(Math.sin(i), 3));
      const y = scale * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
      ctx.fillRect(this.x + x, this.y - y, 1, 1);
    }
    ctx.closePath();
  }
//   @ViewChild('canvasEl') canvasEl?: ElementRef;
//   private ctx?: CanvasRenderingContext2D | null;
//   private hearts: Heart[] = [];
//   private numHearts = 30;

//   ngAfterViewInit(): void {
//     this.ctx = (this.canvasEl?.nativeElement as HTMLCanvasElement).getContext('2d');
//     this.initializeHearts();
//     requestAnimationFrame(this.draw.bind(this));
//   }

//   initializeHearts(): void {
//     for (let i = 0; i < this.numHearts; i++) {
//       const heart = new Heart(
//         Math.random() * this.ctx!.canvas.width,
//         Math.random() * this.ctx!.canvas.height,
//         Math.random() * 30 + 10,
//         `hsl(${Math.random() * 360}, 100%, 50%)`,
//         Math.random() * 2 + 1
//       );
//       this.hearts.push(heart);
//     }
//   }

//   draw(): void {
//     this.ctx!.clearRect(0, 0, this.ctx!.canvas.width, this.ctx!.canvas.height);
    
//     this.hearts.forEach(heart => {
//       heart.move();
//       this.ctx!.fillStyle = heart.color;
//       this.ctx!.beginPath();
//       this.ctx!.moveTo(heart.x, heart.y);
//       heart.draw(this.ctx!);
//     });
    
//     requestAnimationFrame(this.draw.bind(this));
//   }
// }

// class Heart {
//   constructor(
//     public x: number,
//     public y: number,
//     public size: number,
//     public color: string,
//     public speed: number
//   ) {}

//   move(): void {
//     this.y += this.speed;
//     if (this.y > 600) {  // adjust as per canvas height
//       this.y = 0;
//       this.x = Math.random() * 800;  // adjust as per canvas width
//     }
//   }

//   draw(ctx: CanvasRenderingContext2D): void {
//     ctx.lineTo(this.x + this.size / 2, this.y - this.size / 3);
//     ctx.bezierCurveTo(
//       this.x + this.size,
//       this.y - this.size / 3,
//       this.x + this.size,
//       this.y + this.size / 2,
//       this.x,
//       this.y + this.size
//     );
//     ctx.bezierCurveTo(
//       this.x - this.size,
//       this.y + this.size / 2,
//       this.x - this.size / 2,
//       this.y - this.size / 3,
//       this.x,
//       this.y - this.size / 3
//     );
//     ctx.closePath();
//     ctx.fill();
//   }
}