import { Routes } from '@angular/router';
import { CadastroEstacaoComponent } from './features/estacoes/cadastro-estacao/cadastro-estacao.component';
import { RegistrarComponent } from './features/movimentacoes/registrar/registrar.component';
import { HistoricoComponent } from './features/movimentacoes/historico/historico.component';
import { ListaEstacoesComponent } from './features/estacoes/lista-estacoes/lista-estacoes.component';
import { CadastroPecaComponent } from './features/pecas/cadastro-peca/cadastro-peca.component';
import { ListaPecasComponent } from './features/pecas/lista-pecas/lista-pecas.component';

export const routes: Routes = [
  { path: 'pecas', component: ListaPecasComponent },
  { path: 'pecas/novo', component: CadastroPecaComponent },
  { path: 'estacoes', component: ListaEstacoesComponent },
  { path: 'estacoes/novo', component: CadastroEstacaoComponent },
  { path: 'movimentacoes/registrar', component: RegistrarComponent },
  { path: 'movimentacoes/historico', component: HistoricoComponent },
  { path: '**', redirectTo: 'pecas' }
];
