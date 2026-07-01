/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  username: string;
  password?: string;
  email?: string;
  teamId: string | null;
}

export enum PlayerPosition {
  RWD = 'RWD',
  LFD = 'LFD',
  SS = 'SS',
  CF = 'CF',
  CMD = 'CMD',
  AMF = 'AMF',
  DMF = 'DMF',
  RB = 'RB',
  LB = 'LB',
  CB = 'CB',
  GK = 'GK'
}

export interface PlayerAttributes {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  stamina: number;
  potential: number;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  nationality: string;
  position: PlayerPosition;
  rating: number;
  attributes: PlayerAttributes;
  marketValue: number;
  salary: number;
  contractYears: number;
  teamId: string | null;
  isYouth: boolean;
  faceUrl?: string;
  history: PlayerHistory[];
  onFieldPosition?: string | null;
}

export interface PlayerHistory {
  year: number;
  teamName: string;
  apps: number;
  goals: number;
  assists: number;
  avgRating: number;
}

export interface Team {
  id: string;
  name: string;
  managerId: string | null;
  budget: number;
  stadiumCapacity: number;
  fansBase: number;
  facilitiesLevel: number;
  youthAcademyLevel: number;
  tactics: TeamTactics;
}

export interface TeamTactics {
  formation: string;
  mentality: 'Defensive' | 'Balanced' | 'Attacking';
  passingStyle: 'Short' | 'Mixed' | 'Long';
  pressingIntensity: number;
}

export interface MatchState {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: 'Scheduled' | 'Live' | 'Finished';
  events: MatchEvent[];
  stats: MatchStats;
}

export interface MatchEvent {
  minute: number;
  type: 'Goal' | 'YellowCard' | 'RedCard' | 'Substitution' | 'Injury' | 'Commentary';
  description: string;
  playerId?: string;
  teamId: string;
}

export interface MatchStats {
  homeShots: number;
  awayShots: number;
  homePossession: number;
  awayPossession: number;
}

export interface League {
  id: string;
  name: string;
  teams: string[]; // Team IDs
  standings: Standing[];
  season: number;
}

export interface Standing {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
}
