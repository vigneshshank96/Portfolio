import { Component, Input } from '@angular/core';
import { fadeInAnimation } from '../../animations';
import { About } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
  animations: [fadeInAnimation]
})
export class AboutComponent {
  @Input() data: About | null = null;
}
