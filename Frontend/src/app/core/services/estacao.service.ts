import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Estacao } from '../models/estacao.model';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class EstacaoService {

  ApiUrl = environment.urlApiEstacao;

  constructor(private http : HttpClient) {}

  GetEstacao(): Observable<Response<Estacao[]>>{
    return this.http.get<Response<Estacao[]>>(this.ApiUrl);
  }

  CadastrarEstacao(Estacao : Estacao): Observable<Response<Estacao[]>>{
    return this.http.post<Response<Estacao[]>>(this.ApiUrl,Estacao);
  }
}
