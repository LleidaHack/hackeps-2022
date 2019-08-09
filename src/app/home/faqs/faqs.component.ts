import { FaqsService } from '../../shared/services/faqs.service';
import { FAQ } from './../../shared/models/faq';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  public faqs: FAQ[] = []

  constructor(private faqService: FaqsService) { }

  ngOnInit() {
    this.faqService.all()
      .subscribe(faqs => {
        this.faqs = faqs;
      });
  }

}
