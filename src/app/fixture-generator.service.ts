import { Observable, Observer } from 'rxjs';
import { FormControl, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixtureGeneratorService {
  // private const MIN_TEAMS_QUANTITY = 4;
  // private const MAX_TEAMS_QUANTITY = 20;

  private teams: Array<any> = [ // todo: femove fake data
    {id: 0, name: 'batman'},
    {id: 1, name: 'mati'},
    {id: 2, name: 'cacho'},
    {id: 3, name: 'pepe'},
  ];
  private nextTeamId = 0;
  private teamsObservers: Array<Observer<any>> = [];

  constructor() {
    this.noRepeatNameValidator = this.noRepeatNameValidator.bind(this);
  }

  private getMatchesSortedByDay(): Array<any> { // todo: re-write me completely (-:
    const sortedMatches: Array<any> = [];
    for (let dayIndex = 0; dayIndex < this.totalOfRounds(); dayIndex++) {
      sortedMatches.push(this.getMatchesForDay(dayIndex));
    }
    return sortedMatches;
  }

  private getMatchesForDay(dayIndex: number): Array<string> {
    const matchesForDay = [];
    const lastTeamIndex = this.teams.length - 1;
    let match = [1, lastTeamIndex - dayIndex + 1];
    for (let matchIndex = 0; matchIndex < this.totalOfMatchesByDay(); matchIndex++) {
      matchesForDay.push(match);
      match = this.getParallelMatch(match);
    }
    return matchesForDay;
  }

  private getParallelMatch(match: Array<number>): Array<number> {
    const parallelMatch: Array<number> = [];
    if (match[0] === 1) {
      parallelMatch[0] = this.cyclicSum(match[1], 1);
      parallelMatch[1] = this.cyclicSum(match[1], -1);
    } else {
      parallelMatch[0] = this.cyclicSum(match[0], +1);
      parallelMatch[1] = this.cyclicSum(match[1], -1);
    }
    return parallelMatch;
  }

  private cyclicSum(a: number, b: number): number {
    let sum: number;
    if (b > 0) {
      sum = (a + b) % (this.teams.length + 1);
      if (this.isLastTeamOfCycle(a)) { sum = 2; }
    } else {
      // if (a === 2) debugger;
      sum = (a + b) % (this.teams.length + 1);
      if (this.isFirstTeamOfCycle(sum)) { sum = this.teams.length; }
    }
    return sum;
  }

  private isFirstOrLastTeamIndex(index: number): boolean {
    return index === 0 || index === 1 || index === 2 || index === this.teams.length;
  }

  private isFirstTeamOfCycle(index: number) {
    return index < 2;
  }

  private isLastTeamOfCycle(index: number) {
    return index === this.teams.length;
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

  private totalOfMatchesByDay(): number {
    return this.teams.length / 2;
  }

  private totalOfRounds(): number {
    return this.teams.length - 1;
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

  // PUBLIC ACCESS MEMBERS

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
