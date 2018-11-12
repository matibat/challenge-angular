import { Observable, Observer } from 'rxjs';
import { FormControl, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixtureGeneratorService {
  // private const MIN_TEAMS_QUANTITY = 4;
  // private const MAX_TEAMS_QUANTITY = 20;

  private teams: Array<any> = [];
  private nextTeamId = 0;
  private teamsObservers: Observer<any>[] = [];

  constructor() {
    this.noRepeatNameValidator = this.noRepeatNameValidator.bind(this);
  }

  private isDataReady(): boolean {
    return true;
  }

  private isTeamAlreadyAdded(themeName: string): boolean {
    for (let teamIndex = 0; teamIndex < this.teams.length; teamIndex++) {
      const team = this.teams[teamIndex];
      if (team.name === themeName) {
        return true;
      }
    }
    return false;
  }

  private getIndexFromPositionInFixture() {

  }

  private getFixtureStructure() {
    const structure: Array<any> = [];

    const numberOfDates = this.teams.length - 1;
    const matchesPerDate = this.teams.length / 2;
    for (let dateIndex = 0; dateIndex < numberOfDates; dateIndex++) {
      for (let matchIndex = 0; matchIndex <= matchesPerDate; matchIndex++) {
        structure[dateIndex].push([ ]);
      }
    }

    return structure;
  }

  private getMatchesArray(): Array<any> {
    const matches: Array<any> = [];
    const lastTeamIndex = this.teams.length - 1;

    for (let team1Index = 0; team1Index < lastTeamIndex - 1; team1Index++) {
      for (let team2Index = team1Index + 1; team2Index < lastTeamIndex; team2Index++) {
        matches.push([team1Index, team2Index]);
      }
    }

    return matches;
  }

  private getMatchesSortedByDay(): Array<any> { // todo: re-write me completely (-:
    const sortedMatches: Array<any> = [];
    return sortedMatches;
  }

  private handleTeamsUpdate(observer: Observer<any>) {
    observer.next(this.teams);
  }

  private notifyTeamsUpdate() {
    for (let index = 0; index < this.teamsObservers.length; index++) {
      const observer = this.teamsObservers[index];
      this.handleTeamsUpdate(observer);
    }
  }

  public getTeams(): Observable<any> {
    return new Observable((observer) => {
      this.handleTeamsUpdate(observer);
      this.teamsObservers.push(observer);
    });
  }

  public addTeam(name: string): void {
    this.teams.push({
      name: name,
      id: this.nextTeamId++
    });
    this.notifyTeamsUpdate();
  }

  public removeTeam(id: number): void {
    for (let index = 0; index < this.teams.length; index++) {
      const team = this.teams[index];
      if (team.id === id) {
        this.teams.splice(index, 1);
        this.notifyTeamsUpdate();
      }
    }
  }

  public noRepeatNameValidator(c: AbstractControl) {
    return this.isTeamAlreadyAdded(c.value) ? {alreadyAdded: true} : null;
  }

  public getFixture(): any {
    if (this.isDataReady()) {
      return this.getMatchesSortedByDay();
    }
  }
}
