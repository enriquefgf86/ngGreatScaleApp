import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RXJSComponentComponent } from './rxjscomponent.component';

describe('RXJSComponentComponent', () => {
  let component: RXJSComponentComponent;
  let fixture: ComponentFixture<RXJSComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RXJSComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RXJSComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
