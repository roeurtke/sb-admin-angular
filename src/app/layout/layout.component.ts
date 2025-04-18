import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  navItems = [
    { icon: 'fas fa-fw fa-tachometer-alt', label: 'Dashboard', link: '/', active: true },
    // Add more nav items as needed, e.g., { icon: 'fas fa-table', label: 'Tables', link: '/tables' }
  ];
}
