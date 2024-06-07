import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  Four: boolean = false;
  final: boolean = false;
  five: boolean = false;
  back: boolean = false;
  rememberThis: boolean = false;
  wordDelays: { word: string, delay: number }[] = [
    { word: 'There are those of us who like to venture to the unexplored', delay: 500 },
    { word: 'to see the beauty and the strange', delay: 5800 },
    { word: 'and unKnown', delay: 8900 },
    { word: 'those of us who go out there', delay: 11800 },
    { word: ' with a sense of', delay: 14200 },
    { word: 'Wonder', delay: 16400 }
  ];
  wordsDelays: { word: string, delay: number , timeoutId: any }[] = [
    { word: 'في عَيْنَيْكِ يكمن الليل والنُّجوم تتَلأَلأ', delay: 500 ,timeoutId : 0},
    { word: 'كَأَنَّ السَّمَاء حلَّت في عَيْنَيْكِ تمَامًا', delay: 4600 ,timeoutId : 0},
    { word: 'أَتَساءَل في صَمْت عَن الأَسْرار الخَفِيَّة', delay: 7800,timeoutId : 0 },
    { word: 'في زَمَن مَعَلَّق بَين شَفَتَيْكِ يَتَمَوَّج', delay: 10900 ,timeoutId : 0},
    { word: 'كُلَّما تَنَفَّسْتِ يَتْلاشى الزَّمَان والمَكان', delay: 14300 ,timeoutId : 0},
    { word: 'فَأَجِد نَفْسِي داخِل حِكايَة عَيْنِكِ السِّحْرِيَّة', delay: 17600 ,timeoutId : 0},
    { word: 'تَتَدَاخَل الأَلْوَان والأَحْلام في مَحِيط عَيْنَيْكِ', delay: 20800 ,timeoutId : 0},
    { word: 'وكُلَّما تَعَمَّقْتُ بِهَا اشتَدَّت دَهْجَتِي وانغِماسِي', delay: 24600,timeoutId : 0 },
    { word: 'كَأَنَّهَا ثَقْبٌ أَسْوَد تَلْتَقِط كُلَّ الضُّوء', delay: 28500 ,timeoutId : 0},
    { word: 'سِحْر يَجْذُب، قُوَّة لا مَفَرَّ مِنْهَا', delay: 31600 ,timeoutId : 0},
    { word: 'رِحْلَة سَماوِيَّة بِدُون نِيَّة', delay: 34800 ,timeoutId : 0},
    { word: 'أَنَا مَأْسُور كُلَّمَا قاوَمَت زادَت الجاذِبِيَّة', delay: 37500 ,timeoutId : 0},
    { word: 'وفي أَعْماقِهَا تَكْتَشِف كَوْنًا آخَرَ', delay: 41500 ,timeoutId : 0},
    { word: 'قَصَص لَمْ تَحْكَ، أَسْرار مَحْتَجَزَة، عَوالِم مُخْتَلِفَة', delay: 44900 ,timeoutId : 0}
  ];

  displayedWord: string= "";
  displayedWords: string[]= [];
  currentIndex: number = 0;
  fontSize: number = 0;
  constructor(private http: HttpClient){

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
 
  remember(){
    this.one = false;
    this.two = false;
    this.three = false;
    this.Four = false;
    this.rememberThis = true;
    this.audio.pause()
  }
  playAudioThree() {
    this.audio.pause();
    this.one = false;
    this.final = false;
    this.five = false;
    this.two = false;
    this.three = true;
    this.Four = false;
    this.rememberThis = false;
    this.audio = new Audio('../assets/y2mate.is - indila___love_story-DF3XjEhJ40Y-192k-1707846556_[cut_230sec].mp3');
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

    this.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    this.bubbles.forEach(bubble => {
      this.context!.beginPath();
      this.context!.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      this.context!.fillStyle = `rgba(${bubble.color}, ${bubble.opacity})`;
      this.context!.fill();
    });

    const allFadedOut = this.bubbles.every(bubble => bubble.opacity === 0.4);
    if (allFadedOut) {
      clearInterval(fadeOutInterval);
   console.log("worked")
      this.one =false;
      this.two = false;
    this.three = true;
    }
  }, 50); 
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
  loveLatter(){
      this.three = false;
      this.Four = true;
      this.audio.pause();

    
      // setTimeout(() => {
      //   this.displayWords2WithDelay();
      //   this.audio = new Audio('../assets/love latter.mp3');
      // this.audio.autoplay = true;
      // }, 4000);
      
  }
 
  displayWords2WithDelay() {
    this.final = false;
    this.back = true;
    
    this.audio.pause();
    this.displayedWords = [];
    this.audio = new Audio('../assets/love latter.mp3');
    this.audio.autoplay = true;
    
    this.wordsDelays.forEach((wordDelay,index) => {
      clearTimeout(wordDelay.timeoutId);
      wordDelay.timeoutId = setTimeout(() => {
        this.displayedWords.push(wordDelay.word);
        console.log(this.displayedWords[index]);
      }, wordDelay.delay);
    });
    setTimeout(() => {
      this.displayedWords = [];
      this.back = false;
      this.final = true;
      this.audio = new Audio('../assets/x2mate.com - Frank Sinatra - L.O.V.E. (lyrics) (128 kbps).mp3');
      this.audio.autoplay = true;
    }, 50000); 
  }


  playAudioFour(){
    this.five = true;
    this.back = false;
    this.final = false;
    this.three = false;
    this.Four = false;
    this.one =false;
    this.two = false;
    this.audio.pause();
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
