import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinatoricsComponent } from './combinatorics.component';

describe('CombinatoricsComponent', () => {
  let component: CombinatoricsComponent;
  let fixture: ComponentFixture<CombinatoricsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombinatoricsComponent]
    });
    fixture = TestBed.createComponent(CombinatoricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
