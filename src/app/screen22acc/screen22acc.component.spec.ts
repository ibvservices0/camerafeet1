import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen22accComponent } from './screen22acc.component';

describe('Screen22accComponent', () => {
  let component: Screen22accComponent;
  let fixture: ComponentFixture<Screen22accComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen22accComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Screen22accComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
