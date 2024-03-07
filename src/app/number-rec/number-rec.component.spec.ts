import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRecComponent } from './number-rec.component';

describe('NumberRecComponent', () => {
  let component: NumberRecComponent;
  let fixture: ComponentFixture<NumberRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberRecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
