import { RouterModule, Routes } from '@angular/router';
import { PecasComponent } from './components/pecas/pecas.component';
import { EstacoesComponent } from './components/estacoes/estacoes.component';
import { MovimentacoesComponent } from './components/movimentacoes/movimentacoes.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: 'pecas', component: PecasComponent },
  { path: 'estacoes', component: EstacoesComponent },
  { path: 'movimentacoes', component: MovimentacoesComponent },
  { path: '**', redirectTo: 'pecas' }
];
