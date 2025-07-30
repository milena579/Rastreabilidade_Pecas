import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Peca } from '../../core/models/peca.model';

@Component({
  selector: 'app-formulario-peca',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-peca.component.html',
  styleUrl: './formulario-peca.component.css'
})
export class FormularioPecaComponent implements OnInit{

  @Output() onSubmit = new EventEmitter<Peca>();

  pecaForm!: FormGroup;

  ngOnInit(): void {
    this.pecaForm = new FormGroup({
      id: new FormControl(0),
      codigo: new FormControl(''),
      status: new FormControl('')
    });
  }

  enviar(){
    this.onSubmit.emit(this.pecaForm.value)
  }
}
