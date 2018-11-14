import { FixtureGeneratorService } from './../fixture-generator.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-list-component',
  templateUrl: './team-list-component.component.html',
  styleUrls: ['./team-list-component.component.scss']
})
export class TeamListComponentComponent {
  public teamsList: any;
  public selectedTeam: number = null;

  constructor (private fixtureGenerator: FixtureGeneratorService) {
    fixtureGenerator.getTeams().subscribe({
      next: (teams) => this.teamsList = teams
    });
  }

  public selectTeam(id) {
    if (this.selectedTeam === id) {
      this.selectedTeam = null;
    } else {
      this.selectedTeam = id;
    }
  }

  public removeSelectedTeam() {
    if (this.selectedTeam !== null) {
      this.fixtureGenerator.removeTeam(this.selectedTeam);
      this.selectedTeam = null;
    }
  }

  public selectedClass(id): any {
    return {'app-selected-team': this.selectedTeam === id};
  }

  public isTeamSelected() {
    return (this.selectedTeam !== null);
  }
}
