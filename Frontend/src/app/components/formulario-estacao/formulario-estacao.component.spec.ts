import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioEstacaoComponent } from './formulario-estacao.component';


describe('FormularioEstacaoComponent', () => {
  let component: FormularioEstacaoComponent;
  let fixture: ComponentFixture<FormularioEstacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEstacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEstacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
