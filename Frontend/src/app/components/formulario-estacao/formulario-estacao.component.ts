import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Estacao } from '../../core/models/estacao.model';

@Component({
  selector: 'app-formulario-estacao',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-estacao.component.html',
  styleUrl: './formulario-estacao.component.css'
})
export class FormularioEstacaoComponent implements OnInit{

  @Output() onSubmit = new EventEmitter<Estacao>();

  estacaoForm!: FormGroup;

  ngOnInit(): void {
    this.estacaoForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl(''),
      ordem: new FormControl('')
    });
  }

  enviar(){
    this.onSubmit.emit(this.estacaoForm.value)
  }
}
