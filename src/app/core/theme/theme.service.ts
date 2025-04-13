import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme, ThemeMode } from './theme.model';
import { lightTheme, darkTheme } from './themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme = new BehaviorSubject<Theme>(lightTheme);
  private themeMode = new BehaviorSubject<ThemeMode>('light');

  constructor() {
    this.loadTheme();
  }

  setTheme(mode: ThemeMode) {
    const theme = mode === 'dark' ? darkTheme : lightTheme;
    this.themeMode.next(mode);
    this.activeTheme.next(theme);
    this.applyTheme(theme);
    localStorage.setItem('theme', mode);
  }

  toggleTheme() {
    const newMode = this.themeMode.value === 'light' ? 'dark' : 'light';
    this.setTheme(newMode);
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('theme') as ThemeMode || 'light';
    this.setTheme(savedTheme);
  }

  private applyTheme(theme: Theme) {
    Object.keys(theme.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        theme.properties[property]
      );
    });
    document.documentElement.classList.toggle('dark', theme.name === 'dark');
  }
}