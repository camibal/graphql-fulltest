import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTeamComponent } from './save-team.component';

describe('SaveTeamComponent', () => {
  let component: SaveTeamComponent;
  let fixture: ComponentFixture<SaveTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
