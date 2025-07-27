import { Estacao } from "./estacao.model";

export interface Movimentacao {
  id: number;
  data: string;
  origem?: Estacao;
  destino: Estacao;
  responsavel: string;
  pecaId: number;
}