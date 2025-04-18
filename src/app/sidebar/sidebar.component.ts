import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() navItems: { icon: string; label: string; link: string; active?: boolean }[] = [
    { icon: 'fas fa-fw fa-tachometer-alt', label: 'Dashboard', link: '/', active: true }
  ];
}
