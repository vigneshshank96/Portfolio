import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private isDarkMode = new BehaviorSubject<boolean>(true);
    isDarkMode$ = this.isDarkMode.asObservable();

    constructor() {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.isDarkMode.next(savedTheme === 'dark');
        }
        this.applyTheme(this.isDarkMode.value);
    }

    toggleTheme() {
        const newTheme = !this.isDarkMode.value;
        this.isDarkMode.next(newTheme);
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    }

    private applyTheme(isDark: boolean) {
        if (isDark) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
    }
}
