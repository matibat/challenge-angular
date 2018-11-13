import { FixtureGeneratorService } from './../fixture-generator.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-team-form-component',
  templateUrl: './new-team-form-component.component.html',
  styleUrls: ['./new-team-form-component.component.css']
})
export class NewTeamFormComponentComponent {
  public nameForm: FormGroup;
  newTeamName: string;

  constructor (private fixtureGenerator: FixtureGeneratorService) {
    this.nameForm = new FormGroup({
      teamName: new FormControl(this.newTeamName,
        [
          this.fixtureGenerator.noRepeatNameValidator,
          Validators.required
        ]
      )
    });
  }

  public addNewTeam() {
    const teamName = this.nameForm.controls['teamName'].value;
    this.nameForm.controls['teamName'].setValue('');
    this.fixtureGenerator.addTeam(teamName);
  }
}
