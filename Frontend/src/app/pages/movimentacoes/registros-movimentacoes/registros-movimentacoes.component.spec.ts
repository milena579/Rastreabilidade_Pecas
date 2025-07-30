import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosMovimentacoesComponent } from './registros-movimentacoes.component';

describe('RegistrosMovimentacoesComponent', () => {
  let component: RegistrosMovimentacoesComponent;
  let fixture: ComponentFixture<RegistrosMovimentacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosMovimentacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosMovimentacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
