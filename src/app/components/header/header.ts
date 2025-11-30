import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  isMenuOpen = false;
  activeSection = 'home';
  isDarkMode$: any

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollTo(sectionId: string, event: Event) {
    event.preventDefault();
    this.isMenuOpen = false;
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset for header height
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Add smooth scroll animation
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' as ScrollBehavior
      } as ScrollOptions);

      // Update active section immediately for better UX
      this.activeSection = sectionId;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['home', 'about', 'highlights', 'skills', 'experience', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 200; // Offset

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = section;
        }
      }
    }
  }
}
