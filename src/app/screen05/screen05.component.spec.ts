import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen05Component } from './screen05.component';

describe('Screen05Component', () => {
  let component: Screen05Component;
  let fixture: ComponentFixture<Screen05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen05Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Screen05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
