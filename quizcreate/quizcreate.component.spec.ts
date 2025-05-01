import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizcreateComponent } from './quizcreate.component';

describe('QuizcreateComponent', () => {
  let component: QuizcreateComponent;
  let fixture: ComponentFixture<QuizcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizcreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
