import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { fadeInAnimation } from '../../animations';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  animations: [fadeInAnimation]
})
export class ContactComponent {
  isSubmitting = false;
  submitStatus = '';

  constructor(private translate: TranslateService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.isSubmitting = true;
      this.submitStatus = '';

      const { name, email, message } = form.value;
      // Create mailto link
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:vigneshshank96@zohomail.in?subject=${subject}&body=${body}`;

      // Open default email client
      window.location.href = mailtoLink;

      // Reset form after a short delay
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitStatus = this.translate.instant('CONTACT.EMAIL_OPENED_STATUS');
        form.reset();

        // Clear status message after 5 seconds
        setTimeout(() => {
          this.submitStatus = '';
        }, 5000);
      }, 1000);
    }
}
