export interface MovimentacaoDto {
  pecaId: number;
  origemId: number | null; // pode ser null se for a primeira estação
  destinoId: number;
  responsavel: string;
  data: string;
}
