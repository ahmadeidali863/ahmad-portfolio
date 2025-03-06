import { AfterViewInit, AfterViewChecked, Component, ElementRef, inject, OnInit, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/core/safe.pipe';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SafePipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private canvasCreated = false;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  showTemplatesSection = false;
  private templatesCanvasCreated = false;
  private templatesCanvas: HTMLCanvasElement | null = null;
  private templatesCtx: CanvasRenderingContext2D | null = null;
  currentTemplateIndex = 0;
  templates = [
    { videoSrc: 'path/to/video1.mp4', title: 'Template 1', description: 'Description for template 1', features: ['Feature 1', 'Feature 2', 'Feature 3'], category: 'Valentine', price: '0.40 USD' },
    { videoSrc: 'path/to/video2.mp4', title: 'Template 2', description: 'Description for template 2', features: ['Feature 1', 'Feature 2', 'Feature 3'], category: 'Birthday', price: '0.40 USD' },
    { videoSrc: 'path/to/video3.mp4', title: 'Template 3', description: 'Description for template 3', features: ['Feature 1', 'Feature 2', 'Feature 3'], category: 'Anniversary', price: '0.40 USD' },
    { videoSrc: 'path/to/video4.mp4', title: 'Template 4', description: 'Description for template 4', features: ['Feature 1', 'Feature 2', 'Feature 3'], category: 'Holiday', price: '0.40 USD' },
    { videoSrc: '', title: 'Custom Design', description: 'Need a custom design for this theme? Contact us on WhatsApp!', features: [], category: 'Custom', price: 'Contact WhatsApp' }
  ];

  filteredTemplates = this.templates;

  templateInfoHeight: number = 160;

  email: string = '';
  password: string = '';
  showPayPalForm: boolean = false;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.startIntroAnimation();
  }

  ngOnInit() {}

  ngAfterViewChecked(): void {
    if (this.showTemplatesSection && !this.templatesCanvasCreated) {
      this.startTemplatesLineAnimation();
    }
  }

  updateTemplateInfoHeight() {
    const templateInfo = document.querySelector('.templateInfo') as HTMLElement;
    if (templateInfo) {
      this.templateInfoHeight = templateInfo.offsetHeight;
     // this.redrawTemplatesLine();
    }
  }

  startAnimation: boolean = true;

  startIntroAnimation() {
    const heart = document.querySelector('.heart') as HTMLElement;
    const giftText = document.querySelector('.giftText') as HTMLElement;
    const startAnimation = document.querySelector('.startAnimation') as HTMLElement;
    //const audio = new Audio('path/to/sound-effect.mp3'); // Add your sound effect file path here

    heart.addEventListener('animationend', () => {
      setTimeout(() => {
        heart.classList.add('scaleUp');
        giftText.classList.add('fadeOut');
    //    audio.play(); // Play the sound effect
        setTimeout(() => {
          startAnimation.style.opacity = '0';
          startAnimation.style.height = '0';
          setTimeout(() => {
            this.showMainContent();
          }, 20);
        }, 1400);
      }, 200);
    });
  }

  showMainContent() {
    if (this.canvasCreated) return;
    const mainContent = document.querySelector('.mainContent') as HTMLElement;
    mainContent.classList.add('show');

    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('squigglyLine');
    mainContent.appendChild(this.canvas);

    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '10';

    this.ctx = this.canvas.getContext('2d');
    this.canvasCreated = true;
    setTimeout(() => {
      const resizeObserver = new ResizeObserver(() => this.redrawLine());
      const mainContent = document.querySelector('.mainContent') as HTMLElement;
      if (mainContent) {
        resizeObserver.observe(mainContent);
      }
    }, 800);
  }

  redrawLine() {
    if (!this.canvas || !this.ctx) return;

    const mainContent = document.querySelector('.mainContent') as HTMLElement;
    if (!mainContent) return;

    this.canvas.width = mainContent.clientWidth;
    this.canvas.height = mainContent.clientHeight;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas!.width, this.canvas!.height);
    gradient.addColorStop(0, '#ff4081');
    gradient.addColorStop(1, '#ff8a80');
    this.ctx.strokeStyle = gradient;
    
    this.ctx.lineWidth = 3; 
    this.ctx.lineJoin = 'round'; 
    this.ctx.lineCap = 'round'; 
    
    this.ctx.shadowColor = 'rgba(245, 27, 27, 0.5)';
    this.ctx.shadowBlur = 5;
    this.ctx.shadowOffsetX = 6;
    this.ctx.shadowOffsetY = 6;

    const largeBox = document.querySelector('.mainContent .sectionTitle .largeBox') as HTMLElement;
    const getStartTitle = document.querySelector('.mainContent .sectionThemes .getStartTitle') as HTMLElement;
    if (!largeBox || !getStartTitle) return;

    const largeBoxRect = largeBox.getBoundingClientRect();
    const getStartTitleRect = getStartTitle.getBoundingClientRect();
    const mainContentRect = mainContent.getBoundingClientRect();

    const path = [
      { x: largeBoxRect.left - mainContentRect.left + 10, y: largeBoxRect.top - mainContentRect.top },
      { x: largeBoxRect.right - mainContentRect.left, y: largeBoxRect.top - mainContentRect.top },
      { x: largeBoxRect.right - mainContentRect.left, y: largeBoxRect.bottom - (mainContentRect.top + 1) },
      { x: largeBoxRect.left - mainContentRect.left + 10, y: largeBoxRect.bottom - (mainContentRect.top+ 1) },
      { x: largeBoxRect.left - mainContentRect.left + 10, y: getStartTitleRect.top - mainContentRect.top + getStartTitleRect.height },
      { x: getStartTitleRect.right - mainContentRect.left, y: getStartTitleRect.top - mainContentRect.top + getStartTitleRect.height  }
    ];

    let progress = 0;
    const speed = 8;
    const radius = 10;

    const animate = () => {
      if (progress < path.length - 1) {
        const start = path[progress];
        const end = path[progress + 1];
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = distance / speed;
        let step = 0;

        const drawStep = () => {
          if (step <= steps) {
            this.ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
            this.ctx!.beginPath();
            this.ctx!.moveTo(path[0].x, path[0].y);

            for (let i = 0; i < progress; i++) {
              const p1 = path[i];
              const p2 = path[i + 1];
              this.ctx!.lineTo(p2.x, p2.y);
            }
            const x = start.x + (dx * step) / steps;
            const y = start.y + (dy * step) / steps;
            this.ctx!.lineTo(x, y);
            this.ctx!.stroke();
            step++;
            requestAnimationFrame(drawStep);
          } else {
            progress++;
            if (progress < path.length - 1) {
              const next = path[progress + 1];
              this.ctx!.arcTo(end.x, end.y, next.x, next.y, radius);
            }
            animate();
          }
        };

        drawStep();
      } else {
      }
    };

    this.ctx.beginPath();
    this.ctx.moveTo(path[0].x, path[0].y);
    animate();
  }

  changeBuyNowButtonBackground() {
      const buyNowButton = document.querySelector('.buyNowButton') as HTMLElement;
      if (buyNowButton) {
        buyNowButton.style.transition = 'background-color 0.5s';
        buyNowButton.style.backgroundColor = '#FF416C'; 
        buyNowButton.style.borderRadius = '0px'; 
        buyNowButton.style.zIndex = '1000'; 
      }
  }

  private elRef = inject(ElementRef); 
  onThemeBoxClick(event: Event) {
    const mainContent = this.elRef.nativeElement.querySelector('.mainContent');
    const clickedBox = event.currentTarget as HTMLElement;
    const category = clickedBox.querySelector('p')?.innerText;

    this.filteredTemplates = this.templates.filter(template => template.category === category || template.category === 'Custom');

    mainContent.classList.add('scale-down');
    //clickedBox.classList.add('scale-up');

    setTimeout(() => {
      this.showTemplatesSection = true;
      this.startTemplatesLineAnimation();
    }, 500);
  }
  
  onReturnClick() {
    this.showTemplatesSection = false;
    const mainContent = this.elRef.nativeElement.querySelector('.mainContent');
    const themeBoxes = this.elRef.nativeElement.querySelectorAll('.themeBox');
    
    mainContent.classList.remove('scale-down');
    themeBoxes.forEach((box: HTMLElement) => {
      box.classList.remove('scale-up');
    });

    this.templatesCanvasCreated = false; // Reset templatesCanvasCreated
    this.currentTemplateIndex = 0; // Reset to the first template

    setTimeout(() => {
      this.showMainContent();
    }, 20);
  }
   cdr =inject(ChangeDetectorRef) 
  private handleCanvasOpacity() {
    const canvas = document.querySelector('.templatesSquigglyLine') as HTMLElement;
    if (canvas) {
      canvas.style.transition = 'opacity 0.4s';
      canvas.style.opacity = '0';
      setTimeout(() => {
        canvas.style.opacity = '1';
      }, 400);
    }
  }

  onNextTemplate() {
    this.handleCanvasOpacity();
    this.currentTemplateIndex = (this.currentTemplateIndex + 1) % this.filteredTemplates.length;
    this.cdr.detectChanges(); 
    setTimeout(() => {  
      this.updateTemplateInfoHeight(); 
    }, 500);
  }

  onPrevTemplate() {
    this.handleCanvasOpacity();
    this.currentTemplateIndex = (this.currentTemplateIndex - 1 + this.filteredTemplates.length) % this.filteredTemplates.length;
    this.cdr.detectChanges(); 
    setTimeout(() => {  
      this.updateTemplateInfoHeight();
    }, 500);
  }

  onDrag(event: DragEvent) {
    if (event.clientX > window.innerWidth / 2) {
      this.onNextTemplate();
    } else {
      this.onPrevTemplate();
    }
  }

  private startX: number | null = null;

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.startX) return;
    const currentX = event.touches[0].clientX;
    const diffX = this.startX - currentX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        this.onNextTemplate();
      } else {
        this.onPrevTemplate();
      }
      this.startX = null;
    }
  }

  onPlayButtonClick(templateIndex: number) {
    const video = document.querySelectorAll('.template video')[templateIndex] as HTMLVideoElement;
    if (video) {
      video.play();
    }
  }

  startTemplatesLineAnimation() {
    const templatesSection = document.querySelector('.templates') as HTMLElement;
    if (!templatesSection) return;

    this.templatesCanvas = document.createElement('canvas');
    this.templatesCanvas.classList.add('templatesSquigglyLine');
    templatesSection.appendChild(this.templatesCanvas);

    this.templatesCanvas.style.position = 'absolute';
    this.templatesCanvas.style.top = '0';
    this.templatesCanvas.style.left = '0';
    this.templatesCanvas.style.width = '100%';
    this.templatesCanvas.style.height = '100%';
    this.templatesCanvas.style.pointerEvents = 'none';
    this.templatesCanvas.style.zIndex = '10';

    this.templatesCtx = this.templatesCanvas.getContext('2d');
    this.templatesCanvasCreated = true;
    setTimeout(() => {
      const resizeObserver = new ResizeObserver(() => this.redrawTemplatesLine());
      if (templatesSection) {
        resizeObserver.observe(templatesSection);
      }
    }, 800);
  }

  redrawTemplatesLine() {
    if (!this.templatesCanvas || !this.templatesCtx) return;
  
    const templatesSection = document.querySelector('.templates') as HTMLElement;
    const templateInfo = document.querySelector('.templateInfo') as HTMLElement;
    const templateSelect = document.querySelector('.templateSelect') as HTMLElement;
    if (!templatesSection || !templateInfo || !templateSelect) return;
  
    this.templatesCanvas!.width = templatesSection.clientWidth;
    this.templatesCanvas!.height = templatesSection.clientHeight;
  
    this.templatesCtx!.clearRect(0, 0, this.templatesCanvas!.width, this.templatesCanvas!.height);
  
    const gradient = this.templatesCtx!.createLinearGradient(0, 0, this.templatesCanvas!.width, this.templatesCanvas!.height);
    gradient.addColorStop(0, '#FF416C');
    gradient.addColorStop(1, '#FF416C');//C70039
    this.templatesCtx!.strokeStyle = gradient;
  
    this.templatesCtx!.lineWidth = 3;
    this.templatesCtx!.lineJoin = 'round';
    this.templatesCtx!.lineCap = 'round';
  
    this.templatesCtx!.shadowColor = 'rgba(245, 27, 27, 0.5)';
    this.templatesCtx!.shadowBlur = 5;
    this.templatesCtx!.shadowOffsetX = 6;
    this.templatesCtx!.shadowOffsetY = 6;
  
    const templateInfoRect = templateInfo.getBoundingClientRect();
    const templateSelectRect = templateSelect.getBoundingClientRect();
    const templatesSectionRect = templatesSection.getBoundingClientRect();
  
    const path = [
      { x: templateInfoRect.right - templatesSectionRect.left, y: templateInfoRect.top - templatesSectionRect.top + 10 },
      { x: templateInfoRect.right - templatesSectionRect.left, y: templateInfoRect.bottom - templatesSectionRect.top  },
      { x: templateInfoRect.left - templatesSectionRect.left  , y: templateInfoRect.bottom - templatesSectionRect.top },
      { x: templateSelectRect.left - templatesSectionRect.left  , y: templateSelectRect.top - templatesSectionRect.top },
      { x: templateSelectRect.left  - templatesSectionRect.left  , y: templateSelectRect.bottom + 4 - templatesSectionRect.top },
      { x: templateSelectRect.right - templatesSectionRect.left , y: templateSelectRect.bottom + 4 - templatesSectionRect.top  },
     // { x: templateSelectRect.right - templatesSectionRect.left  , y: templateSelectRect.top - templatesSectionRect.top  },
     // { x: templateSelectRect.left - templatesSectionRect.left, y: templateSelectRect.top - templatesSectionRect.top }
    ];
  
    let progress = 0;
    const speed = 8;
    const radius = 10;
  
    const animate = () => {
      if (progress < path.length - 1) {
        const start = path[progress];
        const end = path[progress + 1];
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = distance / speed;
        let step = 0;
  
        const drawStep = () => {
          if (step <= steps) {
            this.templatesCtx!.clearRect(0, 0, this.templatesCanvas!.width, this.templatesCanvas!.height);
            this.templatesCtx!.beginPath();
            this.templatesCtx!.moveTo(path[0].x, path[0].y);
  
            for (let i = 0; i < progress; i++) {
              const p1 = path[i];
              const p2 = path[i + 1];
              this.templatesCtx!.lineTo(p2.x, p2.y);
            }
            const x = start.x + (dx * step) / steps;
            const y = start.y + (dy * step) / steps;
            this.templatesCtx!.lineTo(x, y);
            this.templatesCtx!.stroke();
            step++;
            requestAnimationFrame(drawStep);
          } else {
            progress++;
            if (progress < path.length - 1) {
              const next = path[progress + 1];
              this.templatesCtx!.arcTo(end.x, end.y, next.x, next.y, radius);
            }
            animate();
          }
        };
  
        drawStep();
      } else {
        // Call the method to change the button background when the animation is almost finished
       // this.changeBuyNowButtonBackground();
      }
    };
  
    this.templatesCtx!.beginPath();
    this.templatesCtx!.moveTo(path[0].x, path[0].y);
    animate();
  }

  showPaymentPopup = false;

  onBuyNowClick() {
    const selectedTemplate = this.filteredTemplates[this.currentTemplateIndex];
    if (selectedTemplate.category === 'Custom') {
      window.open('https://wa.me/962785929375', '_blank');
    } else {
      this.showPaymentPopup = true;
      setTimeout(() => {
        const paymentPopupContent = document.querySelector('.paymentPopupContent') as HTMLElement;
        if (paymentPopupContent) {
          paymentPopupContent.classList.add('show');
        }
      }, 10);
    }
  }

  closePaymentPopup() {
    this.showPaymentPopup = false;
    this.email = '';
    this.password = '';
    this.showPayPalForm = false;
  }

  loadPayPalScript() {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AeXz_wjTxXYDUc1Pi_v4n02Cf7SeEG11ZrPIcDQ5bCfjzGGEL7lclGIbJdmWdWeTwz_sS_2iOes3nftM';
    script.onload = () => {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          const selectedTemplate = this.filteredTemplates[this.currentTemplateIndex];
          const price = selectedTemplate.price.split(' ')[0]; 
          return actions.order.create({
            purchase_units: [{
              amount: { value: price }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log('Payment Successful!', order);

          // Extract customer information
          const customerInfo = {
            name: order.payer.name.given_name + ' ' + order.payer.name.surname,
            email: order.payer.email_address,
            payerId: order.payer.payer_id,
            address: order.purchase_units[0].shipping.address
          };

          console.log('Customer Info:', customerInfo);

          Swal.fire({
            title: 'Payment Successful!',
            text: 'Thank you for your purchase.',
            icon: 'success',
            confirmButtonColor: '#FF416C',
            background: '#fff',
            customClass: {
              popup: 'swal-popup',
              title: 'swal-title',
              confirmButton: 'swal-confirm-button'
            }
          }).then(() => {
            this.showPaymentPopup = false;
          });
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          Swal.fire({
            title: 'Payment Failed!',
            text: 'Please try again.',
            icon: 'error',
            confirmButtonColor: '#FF416C',
            background: '#fff',
            customClass: {
              popup: 'swal-popup',
              title: 'swal-title',
              confirmButton: 'swal-confirm-button'
            }
          });
        }
      }).render('#paypal-button-container');
    };
    document.body.appendChild(script);
  }

  onSubmit() {
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      this.loadPayPalScript();

    } else {
      console.error('Form is invalid');
    }
  }

  onNext() {
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      this.showPayPalForm = true;
      setTimeout(() => {
        const paypalContainer = document.querySelector('#paypal-button-container') as HTMLElement;
        if (paypalContainer) {
          paypalContainer.classList.add('show');
        }
      }, 10);
      this.loadPayPalScript();
    } else {
      console.error('Form is invalid');
    }
  }
}
declare var paypal: any;