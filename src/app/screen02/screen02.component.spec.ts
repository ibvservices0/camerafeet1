import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen02Component } from './screen02.component';

describe('Screen02Component', () => {
  let component: Screen02Component;
  let fixture: ComponentFixture<Screen02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen02Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Screen02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
