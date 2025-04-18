import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSidebarToggle]'
})
export class SidebarToggleDirective {

  constructor(private el: ElementRef) {}

  @HostListener('click')
  toggleSidebar() {
    const sidebar = document.querySelector('#accordionSidebar');
    sidebar?.classList.toggle('toggled');
  }

}
