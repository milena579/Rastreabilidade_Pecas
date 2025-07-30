import { Component } from '@angular/core';
import { Estacao } from '../../../core/models/estacao.model';
import { EstacaoService } from '../../../core/services/estacao.service';
import { Router } from '@angular/router';
import { FormularioEstacaoComponent } from '../../../components/formulario-estacao/formulario-estacao.component';

@Component({
  selector: 'app-cadastrar-estacao',
  imports: [FormularioEstacaoComponent],
  templateUrl: './cadastrar-estacao.component.html',
  styleUrl: './cadastrar-estacao.component.css'
})
export class CadastrarEstacaoComponent {

  constructor(private estacaoService : EstacaoService, private router : Router){}

  cadastrarEstacao(estacao : Estacao){
    this.estacaoService.CadastrarEstacao(estacao).subscribe(retorno => {
      this.router.navigate(['/estacao'])
    })
  }
}
