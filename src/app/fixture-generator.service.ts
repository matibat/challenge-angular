import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixtureGeneratorService {
  private const MIN_TEAMS_QUANTITY = 4;
  private const MAX_TEAMS_QUANTITY = 20;

  private teams: Array<any> = [];
  private lastTeamId = 0;

  constructor() { }

  private IsDataReady(): boolean {
    return true;
  }

  private GetMatches(): Array<any> {
    const matches: Array<any> = [];
    const lastTeamIndex = this.teams.length - 1;

    for (let team1Index = 0; team1Index < lastTeamIndex - 1; team1Index++) {
      for (let team2Index = team1Index + 1; team2Index < lastTeamIndex; team2Index++) {
        matches.push([team1Index, team2Index]);
      }
    }

    return matches;
  }

  private GetMatchesByDay(): Array<any> {
    return [];
  }

  public GetTeams(): Array<any> {
    return this.teams.slice();
  }

  public AddTeam(name: string): void {
    this.teams.push({
      name: name,
      id: this.lastTeamId++
    });
  }

  public RemoveTeam(id: number): void {
    for (let index = 0; index < this.teams.length; index++) {
      const team = this.teams[index];
      if (team.id === id) {
        this.teams.splice(index);
      }
    }
  }

  public GetFixture(): any {
    if (this.IsDataReady()) {
      return this.GetMatchesByDay();
    }
  }
}
