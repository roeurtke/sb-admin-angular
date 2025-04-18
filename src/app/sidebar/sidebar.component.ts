// src/app/sidebar/sidebar.component.ts
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() navItems: {
    icon: string;
    label: string;
    link?: string;
    subItems?: { label: string; link: string }[];
    collapsed?: boolean;
  }[] = [
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
      collapsed: false
    },
    {
      icon: 'fas fa-fw fa-cog',
      label: 'Settings',
      subItems: [
        { label: 'User', link: '/pages/users' },
        { label: 'Role', link: '/pages/roles' },
        { label: 'Permission', link: '/pages/permissions' }
      ],
      collapsed: false
    }
  ];

  constructor(private router: Router) {
    this.setInitialCollapseState();
  }

  setInitialCollapseState() {
    const currentUrl = this.router.url;
    this.navItems.forEach(item => {
      if (item.subItems) {
        item.collapsed = !item.subItems.some(subItem => currentUrl.includes(subItem.link));
      }
    });
  }

  toggleCollapse(item: any) {
    item.collapsed = !item.collapsed;
  }
}