import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen04Component } from './screen04.component';

describe('Screen04Component', () => {
  let component: Screen04Component;
  let fixture: ComponentFixture<Screen04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen04Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Screen04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
