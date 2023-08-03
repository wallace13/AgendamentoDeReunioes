import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuniaoComponent } from './reuniao.component';

describe('ReuniaoComponent', () => {
  let component: ReuniaoComponent;
  let fixture: ComponentFixture<ReuniaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReuniaoComponent]
    });
    fixture = TestBed.createComponent(ReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
