import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation21Component } from './animation2-1.component';

describe('Animation21Component', () => {
  let component: Animation21Component;
  let fixture: ComponentFixture<Animation21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation21Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
