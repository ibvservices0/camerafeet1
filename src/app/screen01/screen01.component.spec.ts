import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen01Component } from './screen01.component';

describe('Screen01Component', () => {
  let component: Screen01Component;
  let fixture: ComponentFixture<Screen01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen01Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Screen01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
