export interface MovimentacaoDto {
  pecaId: number;
  origemId: number | null; 
  destinoId: number;
  responsavel: string;
  data: string;
}
