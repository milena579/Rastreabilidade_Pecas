import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Movimentacao } from '../../../core/models/movimentacao.model';
import { MovimentacaoService } from '../../../core/services/movimentacao.service';
import { PecaService } from '../../../core/services/peca.service';
import { Peca } from '../../../core/models/peca.model';
import { Estacao } from '../../../core/models/estacao.model';
import { EstacaoService } from '../../../core/services/estacao.service';

@Component({
  selector: 'app-registros-movimentacoes',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registros-movimentacoes.component.html',
  styleUrl: './registros-movimentacoes.component.css'
})
export class RegistrosMovimentacoesComponent  implements OnInit{
  
  @Output() onSubmit = new EventEmitter<Movimentacao>();

  movimentacaoForm!: FormGroup;

  pecas : Peca[] = [];
  estacoes : Estacao[] = [];

  
  constructor(private movimentacaoService: MovimentacaoService, private pecaService : PecaService, private estacaoService : EstacaoService){}
  
  ngOnInit(): void {
    this.pecaService.GetPecas().subscribe(retorno => {
      this.pecas = retorno.dados;
    })
    this.movimentacaoForm = new FormGroup({
      pecaId: new FormControl(''),
      origem: new FormControl({ value: '', disabled: true }),
      destino: new FormControl({ value: '', disabled: true }),
      responsavel: new FormControl(''),
      dataMovimentacao: new FormControl(''),
    });

  }

  enviar(){
    this.onSubmit.emit(this.movimentacaoForm.value)
  }
}
