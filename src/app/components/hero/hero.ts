import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PortfolioData } from '../../services/data.service';
import { fadeInAnimation } from '../../animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  animations: [fadeInAnimation]
})
export class HeroComponent implements AfterViewInit {
  @Input() data: PortfolioData | null = null;
  @ViewChild('minecraftChar', { static: false }) minecraftChar!: ElementRef;

  ngAfterViewInit() {
    this.makeMinecraftMovable();
  }

  makeMinecraftMovable() {
    const character = document.getElementById('minecraftChar');
    const container = character?.parentElement;
    
    if (!character || !container) return;

    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      initialX = e.clientX - currentX;
      initialY = e.clientY - currentY;
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        
        const maxX = container.offsetWidth / 2 - character.offsetWidth / 2;
        const maxY = container.offsetHeight / 2 - character.offsetHeight / 2;
        
        currentX = Math.max(-maxX, Math.min(maxX, currentX));
        currentY = Math.max(-maxY, Math.min(maxY, currentY));
        
        character.style.transform = `translate(${currentX}px, ${currentY}px)`;
        character.style.animation = 'none';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      if (character) {
        character.style.animation = 'floatRotate 8s ease-in-out infinite, pulse 2s ease-in-out infinite';
      }
    });

    // Touch support for mobile
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      const touch = e.touches[0];
      initialX = touch.clientX - currentX;
      initialY = touch.clientY - currentY;
    });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        currentX = touch.clientX - initialX;
        currentY = touch.clientY - initialY;
        
        const maxX = container.offsetWidth / 2 - character.offsetWidth / 2;
        const maxY = container.offsetHeight / 2 - character.offsetHeight / 2;
        
        currentX = Math.max(-maxX, Math.min(maxX, currentX));
        currentY = Math.max(-maxY, Math.min(maxY, currentY));
        
        character.style.transform = `translate(${currentX}px, ${currentY}px)`;
        character.style.animation = 'none';
      }
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
      if (character) {
        character.style.animation = 'floatRotate 8s ease-in-out infinite, pulse 2s ease-in-out infinite';
      }
    });
  }
}
