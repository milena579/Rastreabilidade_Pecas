import { Component, OnInit } from '@angular/core';
import { Peca } from '../../core/models/peca.model';
import { MovimentacaoService } from '../../core/services/movimentacao.service';
import { Movimentacao } from '../../core/models/movimentacao.model';
import { RouterModule } from '@angular/router';
import { HistoricoMovimentacoesComponent } from './historico-movimentacoes/historico-movimentacoes.component';
import { RegistrosMovimentacoesComponent } from './registros-movimentacoes/registros-movimentacoes.component';

@Component({
  selector: 'app-movimentacoes',
  standalone: true,
  imports: [RouterModule, HistoricoMovimentacoesComponent, RegistrosMovimentacoesComponent],
  templateUrl: './movimentacoes.component.html',
  styleUrl: './movimentacoes.component.css'
})

export class MovimentacoesComponent implements OnInit{

  mostrarRegistro = true;

  movimentacoesGeral : Movimentacao[] = [];
  movimentacoes: Movimentacao[] = [];
  pecas : Peca[] = [];

  constructor(private moviService : MovimentacaoService){}

  ngOnInit(): void {
    this.moviService.GetMovimentacoes().subscribe(retorno => {
      this.movimentacoes = retorno.dados;
      this.movimentacoesGeral = retorno.dados;
    })
  }

  searchMoviPeca(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value.toLowerCase();

  this.movimentacoes = this.movimentacoesGeral.filter(mov => {
    const peca = this.pecas.find(p => p.id === mov.pecaId);
    const nomePeca = peca ? peca.codigo.toLowerCase() : '';

    return nomePeca.includes(value);
  });
}


}
