import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen21accComponent } from './screen21acc.component';

describe('Screen21accComponent', () => {
  let component: Screen21accComponent;
  let fixture: ComponentFixture<Screen21accComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen21accComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Screen21accComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
