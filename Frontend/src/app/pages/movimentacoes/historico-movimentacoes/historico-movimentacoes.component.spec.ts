import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMovimentacoesComponent } from './historico-movimentacoes.component';

describe('HistoricoMovimentacoesComponent', () => {
  let component: HistoricoMovimentacoesComponent;
  let fixture: ComponentFixture<HistoricoMovimentacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoMovimentacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoMovimentacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
