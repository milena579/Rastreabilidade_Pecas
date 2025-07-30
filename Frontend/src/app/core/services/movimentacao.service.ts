import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimentacao } from '../models/movimentacao.model';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  ApiUrl = environment.urlApiMovimentacao;

  constructor(private http : HttpClient) { }

  GetMovimentacoes(): Observable<Response<Movimentacao[]>>{
    return this.http.get<Response<Movimentacao[]>>(this.ApiUrl)
  }

  InserirMovimentacao(movimentacao : Movimentacao) : Observable<Response<Movimentacao[]>>{
    return this.http.post<Response<Movimentacao[]>>(this.ApiUrl, movimentacao)
  }
}
