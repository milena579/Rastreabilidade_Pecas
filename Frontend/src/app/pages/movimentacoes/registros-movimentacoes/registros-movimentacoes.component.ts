import { Component, OnInit } from '@angular/core';
import { MovimentacaoService } from '../../../core/services/movimentacao.service';
import { PecaService } from '../../../core/services/peca.service';
import { EstacaoService } from '../../../core/services/estacao.service';
import { Peca } from '../../../core/models/peca.model';
import { Estacao } from '../../../core/models/estacao.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registros-movimentacoes',
  templateUrl: './registros-movimentacoes.component.html',
  styleUrls: ['./registros-movimentacoes.component.css'],
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
})
export class RegistrosMovimentacoesComponent implements OnInit {

  movimentacaoForm!: FormGroup;
  pecas: Peca[] = [];
  estacoes: Estacao[] = [];

  constructor(
    private pecaService: PecaService,
    private estacaoService: EstacaoService,
    private movimentacaoService: MovimentacaoService
  ) {}

  ngOnInit(): void {
    this.movimentacaoForm = new FormGroup({
      pecaId: new FormControl('', Validators.required),
      origem: new FormControl({ value: '', disabled: true }),
      destino: new FormControl({ value: '', disabled: true }),
      responsavel: new FormControl('', Validators.required),
      dataMovimentacao: new FormControl(
        { value: this.hoje(), disabled: true },
        Validators.required
      )
    });

    this.estacaoService.GetEstacao().subscribe(lista => {
      this.estacoes = lista.dados;
      
      this.pecaService.GetPecas().subscribe(ret => {
        this.pecas = ret.dados;
      });
      
      this.movimentacaoForm.get('pecaId')!.valueChanges
        .subscribe(pecaId => this.atualizaEstacoes(pecaId));
    });
  }

  private hoje(): string {
    return new Date().toISOString().split('T')[0];
  }

  private atualizaEstacoes(pecaId: number) {
    if (!pecaId || this.estacoes.length === 0) {
      this.movimentacaoForm.patchValue({ origem: '', destino: '' });
      return;
    }

    this.movimentacaoService.GetMovimentacoesByPecaId(pecaId).subscribe(resp => {
      const movs = resp.dados;
      console.log(resp.dados)

      let origemName: string;
      let destinoName: string;

      console.log(movs.length)

      if (movs.length == 0) {
        origemName = '';
        const primeira = this.estacoes.find(e => e.ordem === 1)!;
        destinoName = primeira.nome;
        console.log(destinoName )
      } 
      else {
        const ultima = movs
          .sort((a, b) => 
            new Date(b.data).getTime() - new Date(a.data).getTime()
          )[0];

        origemName = ultima.destino.nome ?? '';
        console.log(origemName)
        const proxima = this.estacoes
          .find(e => e.ordem === ultima.destino.ordem + 1);

        destinoName = proxima
          ? proxima.nome
          : '';

        console.log(destinoName)
      }
      
      this.movimentacaoForm.patchValue({
        origem: origemName,
        destino: destinoName
      });
      
    });
  }

  enviar() {

    if (this.movimentacaoForm.invalid) return;
    const pecaId = this.movimentacaoForm.get('pecaId')!.value;
    const responsavel = this.movimentacaoForm.get('responsavel')!.value;
    const data = this.movimentacaoForm.get('dataMovimentacao')!.value;

    const origem = this.estacoes.find(
      e => e.nome === this.movimentacaoForm.get('origem')!.getRawValue()
      
    );
    console.log(origem + "skdhsaj")

    const destino = this.estacoes.find(
      e => e.nome === this.movimentacaoForm.get('destino')!.getRawValue()
    );

    const dto = {
      pecaId,
      origemId: origem?.id ?? null,
      destinoId: destino?.id ?? 0,
      responsavel,
      data
    };
    
    console.log(this.movimentacaoForm.value + "testeeee")

    this.movimentacaoService.InserirMovimentacao(dto).subscribe({
      next: () => {
        console.log('Movimentação enviada com sucesso!');
        this.movimentacaoForm.get('responsavel')!.reset();
      },
      error: err => {
        console.error('Erro ao enviar movimentação:', err);
      }
    });
    this.atualizaEstacoes(dto.pecaId); 

  }
}
