import { Observable, Observer } from 'rxjs';
import { FormControl, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixtureGeneratorService {
  private MIN_TEAMS_AMOUNT = 4;
  private MAX_TEAMS_AMOUNT = 20;

  private teams: Array<any> = [ ];
  // private nextTeamId = 1;
  private teamsObservers: Array<Observer<any>> = [];

  constructor() {
    this.noRepeatNameValidator = this.noRepeatNameValidator.bind(this);
    this.noExeedMaxiValidator = this.noExeedMaxiValidator.bind(this);
  }

  public addTeam(name: string): void {
    this.teams.push(name);
    this.notifyTeamsUpdate();
  }

  public removeTeam(id: number): void {
    this.teams.splice(id, 1);
    this.notifyTeamsUpdate();
  }

  public getTeams(): Observable<any> {
    return new Observable((observer) => {
      this.handleTeamsUpdate(observer);
      this.teamsObservers.push(observer);
    });
  }

  public getTeamName(id: number): string {
    return this.teams[id - 1];
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

  private isFirstTeamOfCycle(index: number) {
    return index < 2;
  }

  private isLastTeamOfCycle(index: number) {
    return index === this.teams.length;
  }

  private isTeamAlreadyAdded(themeName: string): boolean {
    for (let teamIndex = 0; teamIndex < this.teams.length; teamIndex++) {
      const team = this.teams[teamIndex];
      if (team === themeName) {
        return true;
      }
    }
    return false;
  }

  public isDataReady(): boolean {
    return (
      this.isTeamAmountPair() &&
      this.isTeamAmountNotBiggerThanMax() &&
      this.isTeamAmountNotSmallerThanMin()
    );
  }

  private isTeamAmountPair() {
    return (this.teams.length % 2) === 0;
  }

  private isTeamAmountNotBiggerThanMax() {
    return this.teams.length <= this.MAX_TEAMS_AMOUNT;
  }

  private isTeamAmountNotSmallerThanMin() {
    return this.teams.length >= this.MIN_TEAMS_AMOUNT;
  }

  public isTeamAmountSmallerThanMax() {
    return this.teams.length < this.MAX_TEAMS_AMOUNT;
  }

  public isTeamAmountBiggerThanMin() {
    return this.teams.length > this.MIN_TEAMS_AMOUNT;
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

  public noRepeatNameValidator(c: AbstractControl) {
    return this.isTeamAlreadyAdded(c.value) ? {alreadyAdded: true} : null;
  }

  public noExeedMaxiValidator(c: AbstractControl) {
    return !this.isTeamAmountSmallerThanMax() ? {maximumAmountReached: true} : null;
  }

  public getFixture(): any {
    if (this.isDataReady()) {
      return this.getMatchesSortedByDay();
    }
  }
}
