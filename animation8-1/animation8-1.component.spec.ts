import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation81Component } from './animation8-1.component';

describe('Animation81Component', () => {
  let component: Animation81Component;
  let fixture: ComponentFixture<Animation81Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation81Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation81Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
