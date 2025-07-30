import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Movimentacao } from '../../../core/models/movimentacao.model';

@Component({
  selector: 'app-registros-movimentacoes',
  imports: [RouterModule, FormsModule],
  templateUrl: './registros-movimentacoes.component.html',
  styleUrl: './registros-movimentacoes.component.css'
})
export class RegistrosMovimentacoesComponent  implements OnInit{
  
  @Output() onSubmit = new EventEmitter<Movimentacao>();

  movimentacaoForm!: FormGroup;

  ngOnInit(): void {
    this.movimentacaoForm = new FormGroup({
      id: new FormControl(0),
      codigo: new FormControl(''),
      status: new FormControl('')
    });
  }

  enviar(){
    this.onSubmit.emit(this.movimentacaoForm.value)
  }
}
