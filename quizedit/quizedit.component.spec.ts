import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizeditComponent } from './quizedit.component';

describe('QuizeditComponent', () => {
  let component: QuizeditComponent;
  let fixture: ComponentFixture<QuizeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizeditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
