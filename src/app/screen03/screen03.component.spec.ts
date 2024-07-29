import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen03Component } from './screen03.component';

describe('Screen03Component', () => {
  let component: Screen03Component;
  let fixture: ComponentFixture<Screen03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen03Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Screen03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
