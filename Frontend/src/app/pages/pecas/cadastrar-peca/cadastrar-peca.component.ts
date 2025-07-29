import { Component } from '@angular/core';
import { FormularioPecaComponent } from '../../../components/formulario-peca/formulario-peca.component';
import { PecaService } from '../../../core/services/peca.service';
import { Router } from '@angular/router';
import { Peca } from '../../../core/models/peca.model';

@Component({
  selector: 'app-cadastrar-peca',
  imports: [FormularioPecaComponent],
  templateUrl: './cadastrar-peca.component.html',
  styleUrl: './cadastrar-peca.component.css'
})
export class CadastrarPecaComponent {

  constructor(private pecaService: PecaService, private router: Router){}
  
  
  cadastrarPeca(peca : Peca){
    this.pecaService.CadastrarPeca(peca).subscribe(retorno => {
    this.router.navigate(['/peca'])
  })
}
}
