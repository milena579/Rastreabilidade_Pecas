import { RouterModule, Routes } from '@angular/router';
import { PecasComponent } from './pages/pecas/pecas.component';
import { EstacoesComponent } from './pages/estacoes/estacoes.component';
import { MovimentacoesComponent } from './pages/movimentacoes/movimentacoes.component';
import { NgModule } from '@angular/core';
import { FormularioPecaComponent } from './components/formulario-peca/formulario-peca.component';
import { CadastrarPecaComponent } from './pages/pecas/cadastrar-peca/cadastrar-peca.component';
import { CadastrarEstacaoComponent } from './pages/estacoes/cadastrar-estacao/cadastrar-estacao.component';


export const routes: Routes = [
  { path: 'pecas', component: PecasComponent },
  { path: 'cadastrarPeca', component: CadastrarPecaComponent },
  { path: 'estacoes', component: EstacoesComponent },
  { path: 'cadastrarEstacao', component: CadastrarEstacaoComponent},
  { path: 'movimentacoes', component: MovimentacoesComponent },
  { path: '**', redirectTo: 'pecas' }
];
