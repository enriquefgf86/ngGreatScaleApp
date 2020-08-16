import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyImgComponent } from './modify-img.component';

describe('ModifyImgComponent', () => {
  let component: ModifyImgComponent;
  let fixture: ComponentFixture<ModifyImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
