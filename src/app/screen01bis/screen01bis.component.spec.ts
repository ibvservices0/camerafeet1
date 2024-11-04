import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen01bisComponent } from './screen01bis.component';

describe('Screen01bisComponent', () => {
  let component: Screen01bisComponent;
  let fixture: ComponentFixture<Screen01bisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen01bisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Screen01bisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
