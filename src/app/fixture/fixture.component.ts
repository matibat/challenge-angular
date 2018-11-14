import { FixtureGeneratorService } from './../fixture-generator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent {
  fixture: Array<any>;

  constructor(private fixtureGenerator: FixtureGeneratorService) { }

  public refreshFixture() {
    this.fixture = this.fixtureGenerator.getFixture();
  }
}
