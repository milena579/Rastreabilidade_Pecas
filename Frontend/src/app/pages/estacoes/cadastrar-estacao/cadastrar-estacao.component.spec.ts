import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEstacaoComponent } from './cadastrar-estacao.component';

describe('CadastrarEstacaoComponent', () => {
  let component: CadastrarEstacaoComponent;
  let fixture: ComponentFixture<CadastrarEstacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarEstacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEstacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
