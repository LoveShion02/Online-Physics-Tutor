import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation22Component } from './animation2-2.component';

describe('Animation22Component', () => {
  let component: Animation22Component;
  let fixture: ComponentFixture<Animation22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation22Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
