import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen31accComponent } from './screen31acc.component';

describe('Screen31accComponent', () => {
  let component: Screen31accComponent;
  let fixture: ComponentFixture<Screen31accComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen31accComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Screen31accComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
