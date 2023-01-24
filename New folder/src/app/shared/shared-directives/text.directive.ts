import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appText]'
})
export class TextDirective implements OnInit {
  @Input('appText')
  color!: string;

  @Input()
  afterClickColor!: string;
  constructor(private render: Renderer2, private elemRef: ElementRef) { }

  ngOnInit(): void {
    this.render.setStyle(this.elemRef.nativeElement, 'color', this.color);
  }


  @HostListener('click') onClikc() {
    this.render.setStyle(this.elemRef.nativeElement, 'color', this.afterClickColor)
  }
}
