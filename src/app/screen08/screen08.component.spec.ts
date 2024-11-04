import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen08Component } from './screen08.component';

describe('Screen08Component', () => {
  let component: Screen08Component;
  let fixture: ComponentFixture<Screen08Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Screen08Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Screen08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
