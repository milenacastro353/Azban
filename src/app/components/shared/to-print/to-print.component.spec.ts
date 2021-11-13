import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPrintComponent } from './to-print.component';

describe('ToPrintComponent', () => {
  let component: ToPrintComponent;
  let fixture: ComponentFixture<ToPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
