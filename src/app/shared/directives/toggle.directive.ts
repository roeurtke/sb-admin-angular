import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {

  constructor(private el: ElementRef) {}

  @HostListener('click')
  onToggleClick() {
    const sidebar = this.el.nativeElement;
    sidebar?.classList.toggle('toggled');
  }

}
