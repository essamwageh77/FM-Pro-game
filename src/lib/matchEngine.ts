import { MatchState, Team, Player, MatchEvent } from "../types";

/**
 * A simple yet dynamic match simulation engine.
 * It uses team ratings and tactics to generate events.
 */
export class MatchEngine {
  private state: MatchState;
  private homeTeam: Team;
  private awayTeam: Team;
  private homePlayers: Player[];
  private awayPlayers: Player[];

  constructor(
    match: MatchState,
    homeTeam: Team,
    awayTeam: Team,
    homePlayers: Player[],
    awayPlayers: Player[]
  ) {
    this.state = { ...match };
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homePlayers = homePlayers;
    this.awayPlayers = awayPlayers;
  }

  /**
   * Simulates a single minute of the match.
   */
  public simulateMinute(): MatchState {
    if (this.state.status !== 'Live' || this.state.minute >= 90) {
      this.state.status = 'Finished';
      return this.state;
    }

    this.state.minute += 1;

    // Basic logic for chance generation based on team ratings and tactics
    const homePower = this.calculateTeamPower(this.homeTeam, this.homePlayers);
    const awayPower = this.calculateTeamPower(this.awayTeam, this.awayPlayers);

    const totalPower = homePower + awayPower;
    const chance = Math.random() * totalPower;

    if (chance < homePower * 0.1) {
      this.handleChance('home');
    } else if (chance > totalPower - (awayPower * 0.1)) {
      this.handleChance('away');
    }

    // Possession simulation (simple swing)
    const possessionDiff = (homePower - awayPower) / totalPower * 20;
    this.state.stats.homePossession = Math.max(30, Math.min(70, 50 + possessionDiff + (Math.random() * 10 - 5)));
    this.state.stats.awayPossession = 100 - this.state.stats.homePossession;

    return this.state;
  }

  private calculateTeamPower(team: Team, players: Player[]): number {
    const avgRating = players.reduce((sum, p) => sum + p.rating, 0) / players.length;
    let power = avgRating;

    // Apply tactics
    if (team.tactics.mentality === 'Attacking') power *= 1.1;
    if (team.tactics.mentality === 'Defensive') power *= 0.9;

    return power;
  }

  private handleChance(side: 'home' | 'away') {
    const teamId = side === 'home' ? this.state.homeTeamId : this.state.awayTeamId;
    const teamName = side === 'home' ? this.homeTeam.name : this.awayTeam.name;
    const isGoal = Math.random() < 0.2; // 20% conversion rate

    if (side === 'home') this.state.stats.homeShots++;
    else this.state.stats.awayShots++;

    if (isGoal) {
      if (side === 'home') this.state.homeScore++;
      else this.state.awayScore++;

      const event: MatchEvent = {
        minute: this.state.minute,
        type: 'Goal',
        teamId: teamId,
        description: `GOAL! ${teamName} have scored in the ${this.state.minute}' minute!`
      };
      this.state.events.push(event);
    }
  }

  public getState(): MatchState {
    return this.state;
  }
}
