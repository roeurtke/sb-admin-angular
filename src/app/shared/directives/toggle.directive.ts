import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {

  constructor(private el: ElementRef) {}

  @HostListener('click')
  onToggleClick() {
    const sidebar = document.querySelector('#toggleTopbar');
    sidebar?.classList.toggle('toggled');
  }

}
