import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Experience } from '../../services/data.service';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  animations: [
    trigger('timelineAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(300, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ 
          opacity: 0, 
          transform: 'translateY(30px) scale(0.95)',
          boxShadow: '0 0 0 rgba(99, 102, 241, 0)'
        }),
        animate('0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', style({ 
          opacity: 1, 
          transform: 'translateY(0) scale(1)',
          boxShadow: '0 10px 40px rgba(99, 102, 241, 0.2)'
        }))
      ])
    ])
  ]
})
export class ExperienceComponent {
  @Input() data: Experience[] = [];

  getBulletPoints(description: string): string[] {
    if (!description) return [];
    // Split by newline and filter out empty strings, then clean up bullet points
    return description
      .split('\n')
      .map(point => point.trim())
      .filter(point => point.length > 0)
      .map(point => point.replace(/^•\s*/, '').trim())
      .filter(point => point.length > 0);
  }
}
