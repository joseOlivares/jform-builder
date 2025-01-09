import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'form-builder',
        loadComponent: () => import('./pages/form-builder/form-builder.component').then(m => m.FormBuilderComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    }

];
