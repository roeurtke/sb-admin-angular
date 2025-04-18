import { Routes } from '@angular/router';
import { LayoutComponent }  from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomesComponent } from './pages/incomes/incomes.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { IncomeCategoriesComponent } from './pages/income-categories/income-categories.component';
import { ExpenseCategoriesComponent } from './pages/expense-categories/expense-categories.component';
import { UsersComponent } from './pages/users/users.component';
import { RolesComponent } from './pages/roles/roles.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'pages/incomes', component: IncomesComponent },
          { path: 'pages/expenses', component: ExpensesComponent },
          { path: 'pages/income_categories', component: IncomeCategoriesComponent },
          { path: 'pages/expense_categories', component: ExpenseCategoriesComponent },
          { path: 'pages/users', component: UsersComponent },
          { path: 'pages/roles', component: RolesComponent },
          { path: 'pages/permissions', component: PermissionsComponent }
        ]
      }
];
