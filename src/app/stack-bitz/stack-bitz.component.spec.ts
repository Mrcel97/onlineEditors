import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackBitzComponent } from './stack-bitz.component';

describe('StackBitzComponent', () => {
  let component: StackBitzComponent;
  let fixture: ComponentFixture<StackBitzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackBitzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackBitzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
