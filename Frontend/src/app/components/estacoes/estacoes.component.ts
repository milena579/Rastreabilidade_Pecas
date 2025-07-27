import { Component } from '@angular/core';

@Component({
  selector: 'app-estacoes',
  standalone: true,
  imports: [],
  templateUrl: './estacoes.component.html',
  styleUrl: './estacoes.component.css'
})
export class EstacoesComponent {
  modalAdd: boolean = false;
  modalEdit: boolean = false;

  items = [
    { id: 1, codigo: 'PC001', status: 'Ativo' },
    { id: 2, codigo: 'PC002', status: 'Inativo' },
    { id: 3, codigo: 'PC003', status: 'Em espera' }
  ];

  novoCodigo: string | null = null;
  novoStatus: string = '';

  abrirFormAdd(): void {
    this.modalAdd = true;
  }

  fecharFormAdd(): void {
    this.modalAdd = false;
    this.novoCodigo = null;
    this.novoStatus = '';
  }

  abrirFormEdit(): void{
    this.modalEdit = true
  }

  fecharFormEdit(): void {
    this.modalEdit = false
    this.novoCodigo = null;
    this.novoStatus = '';
  }

  deletarItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  cadastrar(): void {
    if (this.novoCodigo && this.novoStatus.trim() !== '') {
      const novoId = this.items.length > 0 ? Math.max(...this.items.map(i => i.id)) + 1 : 1;
      const codigoFormatado = 'PC' + this.novoCodigo.toString().padStart(3, '0');

      this.items.push({
        id: novoId,
        codigo: codigoFormatado,
        status: this.novoStatus.trim()
      });

      this.fecharFormAdd();
    } else {
      alert('Por favor, preencha todos os campos');
    }
  }
}


