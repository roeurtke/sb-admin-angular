import { Routes } from '@angular/router';
import { LayoutComponent }  from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: DashboardComponent },
          // Add more routes here, e.g., { path: 'tables', component: TablesComponent }
        ]
      }
];
