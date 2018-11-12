import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListComponentComponent } from './team-list-component.component';

describe('TeamListComponentComponent', () => {
  let component: TeamListComponentComponent;
  let fixture: ComponentFixture<TeamListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
