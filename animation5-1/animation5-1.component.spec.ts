import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation51Component } from './animation5-1.component';

describe('Animation51Component', () => {
  let component: Animation51Component;
  let fixture: ComponentFixture<Animation51Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation51Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation51Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
