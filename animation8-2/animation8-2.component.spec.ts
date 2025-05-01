import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation72Component } from './animation8-2.component';

describe('Animation72Component', () => {
  let component: Animation72Component;
  let fixture: ComponentFixture<Animation72Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation72Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation72Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
