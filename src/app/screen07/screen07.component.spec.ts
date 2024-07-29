import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen07Component } from './screen07.component';

describe('Screen07Component', () => {
  let component: Screen07Component;
  let fixture: ComponentFixture<Screen07Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen07Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Screen07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
