import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovimentacaoService } from '../../../core/services/movimentacao.service';
import { Movimentacao } from '../../../core/models/movimentacao.model';
import { Peca } from '../../../core/models/peca.model';
import { MovimentacaoDto } from '../../../core/models/movimentacaoDto.model';

@Component({
  selector: 'app-historico-movimentacoes',
  imports: [RouterModule],
  templateUrl: './historico-movimentacoes.component.html',
  styleUrl: './historico-movimentacoes.component.css'
})
export class HistoricoMovimentacoesComponent implements OnInit {
  
  movimentacoes : any[] = []
  pecas : Peca[] = [];
  pecasGeral : Peca[] = [];

  constructor(private movimentacaoService: MovimentacaoService){}
  
  ngOnInit(): void {
    this.movimentacaoService.GetMovimentacoes().subscribe(retorno =>{
      this.movimentacoes = retorno.dados;
    })
  }

  searchPeca(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.movimentacaoService.BuscarPorPeca(value).subscribe(retorno => {
      this.movimentacoes = retorno.dados;
    });
  }
}
