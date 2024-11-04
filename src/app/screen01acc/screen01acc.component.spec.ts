import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen01accComponent } from './screen01acc.component';

describe('Screen01accComponent', () => {
  let component: Screen01accComponent;
  let fixture: ComponentFixture<Screen01accComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen01accComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Screen01accComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
