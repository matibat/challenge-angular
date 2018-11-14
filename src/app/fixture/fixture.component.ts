import { FixtureGeneratorService } from './../fixture-generator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent {
  fixture: Array<any>;

  constructor(private fixtureGenerator: FixtureGeneratorService) {
    fixtureGenerator.getTeams().subscribe(() => this.resetFixture());
  }

  public resetFixture(): void {
    this.fixture = [];
  }

  public refreshFixture(): void {
    this.fixture = this.fixtureGenerator.getFixture();
  }

  public isAbleToRefresh(): boolean {
    return this.fixtureGenerator.isDataReady();
  }

  public getTeamName(id: number) {
    return this.fixtureGenerator.getTeamName(id);
  }
}
