import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDataLayoutComponent } from './dynamic-data-layout.component';

describe('DynamicDataLayoutComponent', () => {
  let component: DynamicDataLayoutComponent;
  let fixture: ComponentFixture<DynamicDataLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDataLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDataLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
