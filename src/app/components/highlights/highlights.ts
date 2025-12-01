import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { industryKnowledge } from '../../services/data.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlights.html',
  styleUrl: './highlights.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HighlightsComponent {
  @Input() data: industryKnowledge[] = [];
}
