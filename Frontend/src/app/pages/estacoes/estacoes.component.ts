import { Component } from '@angular/core';
import { Estacao } from '../../core/models/estacao.model';
import { EstacaoService } from '../../core/services/estacao.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-estacoes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './estacoes.component.html',
  styleUrls: ['./estacoes.component.css']
})
export class EstacoesComponent {
 
  estacoes : Estacao[] = [];
  
  constructor(private EstacaoService: EstacaoService){}

  ngOnInit(): void {
    this.EstacaoService.GetEstacao().subscribe(retorno => {
      this.estacoes = retorno.dados;
    });
  }
}


