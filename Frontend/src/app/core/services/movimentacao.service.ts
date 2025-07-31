import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimentacao } from '../models/movimentacao.model';
import { Response } from '../models/response';
import { MovimentacaoDto } from '../models/movimentacaoDto.model';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  ApiUrl = environment.urlApiMovimentacao;

  constructor(private http : HttpClient) { }

  GetMovimentacoes(): Observable<Response<Movimentacao[]>>{
    return this.http.get<Response<Movimentacao[]>>(this.ApiUrl)
  }

  GetMovimentacoesByPecaId(pecaId: number): Observable<{ dados: Movimentacao[] }> {
    return this.http.get<{ dados: Movimentacao[] }>(`${this.ApiUrl}/${pecaId}`);
  }
  
  InserirMovimentacao(movimentacao : MovimentacaoDto) : Observable<Response<Movimentacao[]>>{
    return this.http.post<Response<Movimentacao[]>>(this.ApiUrl, movimentacao)
  }
}
