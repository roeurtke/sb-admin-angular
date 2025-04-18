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
    {
      icon: 'fas fa-fw fa-tachometer-alt',
      label: 'Dashboard',
      link: '/dashboard'
    },
    {
      icon: 'fas fa-fw fa-suitcase',
      label: 'Cash Flow',
      subItems: [
        { label: 'Income', link: '/pages/incomes' },
        { label: 'Expense', link: '/pages/expenses' },
        { label: 'Income Category', link: '/pages/income_categories' },
        { label: 'Expense Category', link: '/pages/expense_categories' }
      ],
      collapsed: false // Show by default
    },
    {
      icon: 'fas fa-fw fa-cog',
      label: 'Settings',
      subItems: [
        { label: 'User', link: '/pages/users' },
        { label: 'Role', link: '/pages/roles' },
        { label: 'Permission', link: '/pages/permissions' }
      ],
      collapsed: false // Show by default
    }
  ];
}
