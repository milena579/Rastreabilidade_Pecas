import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovimentacaoService } from '../../../core/services/movimentacao.service';
import { Movimentacao } from '../../../core/models/movimentacao.model';

@Component({
  selector: 'app-historico-movimentacoes',
  imports: [RouterModule],
  templateUrl: './historico-movimentacoes.component.html',
  styleUrl: './historico-movimentacoes.component.css'
})
export class HistoricoMovimentacoesComponent implements OnInit {
  
  movimentacoes : Movimentacao[] = []

  constructor(private movimentacaoService: MovimentacaoService){}
  
  ngOnInit(): void {
    this.movimentacaoService.GetMovimentacoes().subscribe(retorno =>{
      this
    })
  }

}
