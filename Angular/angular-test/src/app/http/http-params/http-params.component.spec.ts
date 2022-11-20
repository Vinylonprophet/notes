import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpParamsComponent } from './http-params.component';

describe('HttpParamsComponent', () => {
  let component: HttpParamsComponent;
  let fixture: ComponentFixture<HttpParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
