import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPecaComponent } from './formulario-peca.component';

describe('FormularioPecaComponent', () => {
  let component: FormularioPecaComponent;
  let fixture: ComponentFixture<FormularioPecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
