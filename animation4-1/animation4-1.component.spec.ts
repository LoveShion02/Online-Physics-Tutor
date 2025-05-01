import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation41Component } from './animation4-1.component';

describe('Animation41Component', () => {
  let component: Animation41Component;
  let fixture: ComponentFixture<Animation41Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation41Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
