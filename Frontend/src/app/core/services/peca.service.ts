import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Peca } from '../models/peca.model';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class PecaService {

  ApiUrl = environment.urlApiPeca;

  constructor(private http : HttpClient) {}

  GetPecas(): Observable<Response<Peca[]>>{
    return this.http.get<Response<Peca[]>>(this.ApiUrl);
  }

  ExcluirPeca(id: number | undefined) : Observable<Response<Peca>>{
    return this.http.delete<Response<Peca>>(`${this.ApiUrl}?pecaId=${id}`);
  }

  CadastrarPeca(peca : Peca): Observable<Response<Peca[]>>{
    return this.http.post<Response<Peca[]>>(this.ApiUrl,peca);
  }
}
