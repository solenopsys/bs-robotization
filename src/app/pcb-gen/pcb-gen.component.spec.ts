import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcbGenComponent } from './pcb-gen.component';

describe('PcbGenComponent', () => {
  let component: PcbGenComponent;
  let fixture: ComponentFixture<PcbGenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PcbGenComponent]
    });
    fixture = TestBed.createComponent(PcbGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
