import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skills } from '../../services/data.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { fadeInAnimation } from '../../animations';

interface SkillIcon {
  icon: string;
  color: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  animations: [
    fadeInAnimation,
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SkillsComponent {
  @Input() data: Skills | null = null;

  // Icon mapping for different skill categories with colors - Bootstrap Icons
  skillIcons: { [key: string]: SkillIcon } = {
    'Cloud Platform': { icon: 'bi-cloud', color: '#3b82f6' },
    'Containerization & Orchestration': { icon: 'bi-box', color: '#06b6d4' },
    'CI/CD, Artifact & Secret Management': { icon: 'bi-rocket-takeoff', color: '#10b981' },
    'Infrastructure as Code': { icon: 'bi-code-slash', color: '#f59e0b' },
    'Version Control': { icon: 'bi-git', color: '#ef4444' },
    'Monitoring & Observability': { icon: 'bi-graph-up', color: '#8b5cf6' },
    'Agile Methodologies': { icon: 'bi-kanban', color: '#ec4899' },
    'Operating System': { icon: 'bi-server', color: '#14b8a6' },
    'Scripting & Automation': { icon: 'bi-terminal', color: '#06b6d4' },
    'Backend Technologies': { icon: 'bi-database', color: '#3b82f6' },
    'Web Technologies': { icon: 'bi-globe', color: '#10b981' },
    'Testing Framework': { icon: 'bi-flask', color: '#f59e0b' }
  };

  getSkillIcon(category: string): SkillIcon {
    return this.skillIcons[category] || { icon: 'bi-gear', color: '#06b6d4' };
  }
}
