import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpHeadersComponent } from './http-headers.component';

describe('HttpHeadersComponent', () => {
  let component: HttpHeadersComponent;
  let fixture: ComponentFixture<HttpHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpHeadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
