import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation31Component } from './animation3-1.component';

describe('Animation31Component', () => {
  let component: Animation31Component;
  let fixture: ComponentFixture<Animation31Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation31Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
