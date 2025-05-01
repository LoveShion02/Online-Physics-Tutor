import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation71Component } from './animation7-1.component';

describe('Animation71Component', () => {
  let component: Animation71Component;
  let fixture: ComponentFixture<Animation71Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation71Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation71Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
