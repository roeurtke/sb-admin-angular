import { Component, Input } from '@angular/core';
import { SidebarToggleDirective } from '../shared/directives/sidebar-toggle.directive';

@Component({
  selector: 'app-topbar',
  imports: [SidebarToggleDirective],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Input() userName: string = 'User Name';
}
