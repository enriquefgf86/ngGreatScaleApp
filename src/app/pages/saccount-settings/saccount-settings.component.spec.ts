import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaccountSettingsComponent } from './saccount-settings.component';

describe('SaccountSettingsComponent', () => {
  let component: SaccountSettingsComponent;
  let fixture: ComponentFixture<SaccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
