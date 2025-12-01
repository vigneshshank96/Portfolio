import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface industryKnowledge {
  title: string;
  description: string;
  icon?: string;
  color?: string;
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
}

export interface About {
  intro: string;
  whatIDo?: string;
  strengths?: string[];
  mission?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  logo?: string;
  issued: string;
  expires?: string;
  skills?: string[];
  credentialUrl?: string;
  verified: boolean;
}

export interface PortfolioData {
  about: About;
  skills: Skills;
  industryKnowledge: industryKnowledge[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
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
