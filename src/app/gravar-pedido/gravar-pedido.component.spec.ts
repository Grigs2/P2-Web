import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravarPedidoComponent } from './gravar-pedido.component';

describe('GravarPedidoComponent', () => {
  let component: GravarPedidoComponent;
  let fixture: ComponentFixture<GravarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GravarPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GravarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
