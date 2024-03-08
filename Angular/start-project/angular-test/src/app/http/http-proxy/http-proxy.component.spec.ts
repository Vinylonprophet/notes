import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpProxyComponent } from './http-proxy.component';

describe('HttpProxyComponent', () => {
  let component: HttpProxyComponent;
  let fixture: ComponentFixture<HttpProxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpProxyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
