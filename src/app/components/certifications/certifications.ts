import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Certification } from '../../services/data.service';

@Component({
    selector: 'app-certifications',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './certifications.html',
    styleUrl: './certifications.css',
})
export class CertificationsComponent {
    @Input() data: Certification[] = [];
}
