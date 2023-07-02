import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDiagramComponent } from './system-diagram.component';

describe('SystemDiagramComponent', () => {
  let component: SystemDiagramComponent;
  let fixture: ComponentFixture<SystemDiagramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemDiagramComponent]
    });
    fixture = TestBed.createComponent(SystemDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
