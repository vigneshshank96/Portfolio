import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Highlight {
  title: string;
  description: string;
}

export interface Experience {
  date: string;
  role: string;
  company: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Skills {
  devops: SkillCategory[];
  additional: SkillCategory[];
}

export interface About {
  intro: string;
  whatIDo?: string;
  strengths?: string[];
  mission?: string;
}

export interface PortfolioData {
  about: About;
  skills: Skills;
  highlights: Highlight[];
  experience: Experience[];
  projects: Project[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>(this.dataUrl);
  }
}
