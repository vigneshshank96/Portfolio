import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { fadeInAnimation } from '../../animations';
import { About } from '../../services/data.service';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
  animations: [fadeInAnimation]
})
export class AboutComponent {
  @Input() data: About | null = null;
}
