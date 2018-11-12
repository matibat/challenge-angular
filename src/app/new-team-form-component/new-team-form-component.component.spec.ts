import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeamFormComponentComponent } from './new-team-form-component.component';

describe('NewTeamFormComponentComponent', () => {
  let component: NewTeamFormComponentComponent;
  let fixture: ComponentFixture<NewTeamFormComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTeamFormComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTeamFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
