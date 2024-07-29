import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen06Component } from './screen06.component';

describe('Screen06Component', () => {
  let component: Screen06Component;
  let fixture: ComponentFixture<Screen06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen06Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Screen06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
