import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeCategoriesComponent } from './income-categories.component';

describe('IncomeCategoriesComponent', () => {
  let component: IncomeCategoriesComponent;
  let fixture: ComponentFixture<IncomeCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
