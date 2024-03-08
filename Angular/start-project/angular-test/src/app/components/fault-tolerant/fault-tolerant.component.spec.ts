import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultTolerantComponent } from './fault-tolerant.component';

describe('FaultTolerantComponent', () => {
  let component: FaultTolerantComponent;
  let fixture: ComponentFixture<FaultTolerantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultTolerantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaultTolerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
