import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation61Component } from './animation6-1.component';

describe('Animation61Component', () => {
  let component: Animation61Component;
  let fixture: ComponentFixture<Animation61Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation61Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation61Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
