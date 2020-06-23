import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowShoppingComponent } from './window-shopping.component';

describe('WindowShoppingComponent', () => {
  let component: WindowShoppingComponent;
  let fixture: ComponentFixture<WindowShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
