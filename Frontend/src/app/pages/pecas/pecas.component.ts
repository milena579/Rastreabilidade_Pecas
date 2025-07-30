import { Component, OnInit} from '@angular/core';
import { PecaService } from '../../core/services/peca.service';
import { Peca } from '../../core/models/peca.model';
import { FormularioPecaComponent } from "../../components/formulario-peca/formulario-peca.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pecas',
  standalone: true,
  templateUrl: './pecas.component.html',
  styleUrls: ['./pecas.component.css'],
  imports: [RouterModule]
})
export class PecasComponent implements OnInit{

  pecas : Peca[] = [];
  pecasGeral: Peca[] = [];

  constructor(private pecaService: PecaService){}

  ngOnInit(): void {
    this.pecaService.GetPecas().subscribe(retorno => {
      console.log(retorno.dados);
      this.pecas = retorno.dados;
      this.pecasGeral = retorno.dados;

      console.log(retorno.dados)
    });
  }

  searchPeca(event:Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.pecas = this.pecasGeral.filter(peca => {
      return peca.codigo.toLowerCase().includes(value);
    })
  }

  excluirPeca(id:number | undefined){
    this.pecaService.ExcluirPeca(id).subscribe(retorno => {
      window.location.reload();
    })
  }
}
