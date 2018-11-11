import { FixtureGeneratorService } from './fixture-generator.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'challenge-angular';
  nameForm: FormGroup;
  newTeamName: string;

  constructor (private fixtureGenerator: FixtureGeneratorService) { }

  ngOnInit(): void {
    this.nameForm = new FormGroup({
      teamName: new FormControl(this.newTeamName,
        [
          this.fixtureGenerator.noRepeatNameValidator
        ]
      )
    });
    console.log('ngOnInit just run');
  }

  public addNewTeam() {
    this.fixtureGenerator.addTeam(this.nameForm.get('teamName').value);
  }
}
