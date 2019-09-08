import { Component } from '@angular/core';
import { FaqsService } from './services/faqs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackeps2019';

  constructor(private faqService: FaqsService) {
    // faqService.all().subscribe(console.log); TODO: uncomment before commit
  }
}
