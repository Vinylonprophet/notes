import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxExampleOneComponent } from './ngrx-example-one.component';

describe('NgrxExampleOneComponent', () => {
  let component: NgrxExampleOneComponent;
  let fixture: ComponentFixture<NgrxExampleOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxExampleOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxExampleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
