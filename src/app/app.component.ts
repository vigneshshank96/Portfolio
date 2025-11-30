import { Component, OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { HighlightsComponent } from './components/highlights/highlights';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectsComponent } from './components/projects/projects';
import { ContactComponent } from './components/contact/contact';
import { SkillsComponent } from './components/skills/skills';
import { DataService, PortfolioData } from './services/data.service';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    HighlightsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    SkillsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'portfolio';
  data: PortfolioData | null = null;
  private themeSubscription?: Subscription;

  constructor(
    private dataService: DataService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }

  ngAfterViewInit(): void {
    // Wait a bit for theme to be applied
    setTimeout(() => {
      this.createSpaceElements();
    }, 100);

    // Listen for theme changes
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(() => {
      setTimeout(() => {
        this.clearAndRecreateElements();
      }, 100);
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  clearAndRecreateElements(): void {
    const spaceBg = document.getElementById('spaceBackground');
    if (spaceBg) {
      spaceBg.innerHTML = '';
      this.createSpaceElements();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.updateSpaceElementsOnScroll();
  }

  createSpaceElements(): void {
    const spaceBg = document.getElementById('spaceBackground');
    if (!spaceBg) return;

    // Only create space elements for dark theme
    if (document.body.classList.contains('dark-theme')) {
      // Create stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'space-star';
        if (i % 3 === 0) star.classList.add('large');
        else if (i % 2 === 0) star.classList.add('medium');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        spaceBg.appendChild(star);
      }

      // Create planets
      const planet1 = document.createElement('div');
      planet1.className = 'space-planet planet1';
      spaceBg.appendChild(planet1);

      const planet2 = document.createElement('div');
      planet2.className = 'space-planet planet2';
      spaceBg.appendChild(planet2);

      const planet3 = document.createElement('div');
      planet3.className = 'space-planet planet3';
      spaceBg.appendChild(planet3);

      // Create space suits
      const suit1 = document.createElement('div');
      suit1.className = 'space-suit suit1';
      spaceBg.appendChild(suit1);

      const suit2 = document.createElement('div');
      suit2.className = 'space-suit suit2';
      spaceBg.appendChild(suit2);
    } else if (document.body.classList.contains('light-theme')) {
      // Create light mode decorative elements
      for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'light-dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animationDelay = Math.random() * 5 + 's';
        dot.style.width = (Math.random() * 4 + 2) + 'px';
        dot.style.height = dot.style.width;
        spaceBg.appendChild(dot);
      }

      // Create floating shapes for light mode
      for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = 'light-shape';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 10 + 's';
        spaceBg.appendChild(shape);
      }
    }
  }

  updateSpaceElementsOnScroll(): void {
    const scrollY = window.scrollY;
    const spaceBg = document.getElementById('spaceBackground');
    if (!spaceBg) return;

    if (document.body.classList.contains('dark-theme')) {
      const stars = spaceBg.querySelectorAll('.space-star');
      const planets = spaceBg.querySelectorAll('.space-planet');
      const suits = spaceBg.querySelectorAll('.space-suit');

      // Parallax effect for stars
      stars.forEach((star, index) => {
        const speed = (index % 5 + 1) * 0.1;
        (star as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });

      // Parallax effect for planets
      planets.forEach((planet, index) => {
        const speed = (index + 1) * 0.05;
        const currentTransform = (planet as HTMLElement).style.transform || '';
        (planet as HTMLElement).style.transform = currentTransform.replace(/translateY\([^)]*\)/, '') + ` translateY(${scrollY * speed}px)`;
      });

      // Parallax effect for space suits
      suits.forEach((suit, index) => {
        const speed = (index + 1) * 0.08;
        const currentTransform = (suit as HTMLElement).style.transform || '';
        (suit as HTMLElement).style.transform = currentTransform.replace(/translateY\([^)]*\)/, '') + ` translateY(${scrollY * speed}px)`;
      });
    } else if (document.body.classList.contains('light-theme')) {
      const dots = spaceBg.querySelectorAll('.light-dot');
      const shapes = spaceBg.querySelectorAll('.light-shape');

      // Parallax effect for light dots
      dots.forEach((dot, index) => {
        const speed = (index % 3 + 1) * 0.05;
        (dot as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });

      // Parallax effect for light shapes
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.03;
        const currentTransform = (shape as HTMLElement).style.transform || '';
        (shape as HTMLElement).style.transform = currentTransform.replace(/translateY\([^)]*\)/, '') + ` translateY(${scrollY * speed}px)`;
      });
    }
  }
}
