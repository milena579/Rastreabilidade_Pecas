import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPecaComponent } from './cadastrar-peca.component';

describe('CadastrarPecaComponent', () => {
  let component: CadastrarPecaComponent;
  let fixture: ComponentFixture<CadastrarPecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarPecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
