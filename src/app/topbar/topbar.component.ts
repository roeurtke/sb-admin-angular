import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToggleDirective } from '../shared/directives/toggle.directive';

@Component({
  selector: 'app-topbar',
  imports: [ToggleDirective],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Input() userName: string = 'User Name';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
    }
  }
}
