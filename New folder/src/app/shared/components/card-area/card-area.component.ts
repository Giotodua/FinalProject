import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css'],
})
export class CardAreaComponent {
  @Input() swiperData?: string[] | null;
  @Input('itemId') itemId?: string | null;

  constructor(private sanitizer: DomSanitizer) {}

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
