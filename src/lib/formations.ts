/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PositionConfig {
  id: string;
  label: string;
  x: number; // 0-100 (Left to Right)
  y: number; // 0-100 (Top to Bottom - Top is Attacking)
}

export interface FormationConfig {
  name: string;
  positions: PositionConfig[];
}

export const FORMATIONS: Record<string, FormationConfig> = {
  "4-3-3": {
    name: "4-3-3",
    positions: [
      { id: "gk", label: "GK", x: 50, y: 90 },
      { id: "lb", label: "LB", x: 15, y: 70 },
      { id: "lcb", label: "CB", x: 38, y: 75 },
      { id: "rcb", label: "CB", x: 62, y: 75 },
      { id: "rb", label: "RB", x: 85, y: 70 },
      { id: "cdm", label: "CDM", x: 50, y: 60 },
      { id: "lcm", label: "CM", x: 30, y: 45 },
      { id: "rcm", label: "CM", x: 70, y: 45 },
      { id: "lw", label: "LW", x: 20, y: 20 },
      { id: "st", label: "ST", x: 50, y: 15 },
      { id: "rw", label: "RW", x: 80, y: 20 },
    ],
  },
  "4-4-2": {
    name: "4-4-2",
    positions: [
      { id: "gk", label: "GK", x: 50, y: 90 },
      { id: "lb", label: "LB", x: 15, y: 70 },
      { id: "lcb", label: "CB", x: 38, y: 75 },
      { id: "rcb", label: "CB", x: 62, y: 75 },
      { id: "rb", label: "RB", x: 85, y: 70 },
      { id: "lm", label: "LM", x: 15, y: 45 },
      { id: "lcm", label: "CM", x: 38, y: 45 },
      { id: "rcm", label: "CM", x: 62, y: 45 },
      { id: "rm", label: "RM", x: 85, y: 45 },
      { id: "lst", label: "ST", x: 35, y: 20 },
      { id: "rst", label: "ST", x: 65, y: 20 },
    ],
  },
  "3-5-2": {
    name: "3-5-2",
    positions: [
      { id: "gk", label: "GK", x: 50, y: 90 },
      { id: "lcb", label: "CB", x: 25, y: 75 },
      { id: "cb", label: "CB", x: 50, y: 75 },
      { id: "rcb", label: "CB", x: 75, y: 75 },
      { id: "lm", label: "LM", x: 15, y: 45 },
      { id: "ldm", label: "CDM", x: 35, y: 55 },
      { id: "cdm", label: "CDM", x: 50, y: 45 },
      { id: "rdm", label: "CDM", x: 65, y: 55 },
      { id: "rm", label: "RM", x: 85, y: 45 },
      { id: "lst", label: "ST", x: 35, y: 20 },
      { id: "rst", label: "ST", x: 65, y: 20 },
    ],
  },
  "5-3-2": {
    name: "5-3-2",
    positions: [
      { id: "gk", label: "GK", x: 50, y: 90 },
      { id: "lwb", label: "LWB", x: 15, y: 60 },
      { id: "lcb", label: "CB", x: 30, y: 75 },
      { id: "cb", label: "CB", x: 50, y: 75 },
      { id: "rcb", label: "CB", x: 70, y: 75 },
      { id: "rwb", label: "RWB", x: 85, y: 60 },
      { id: "lcm", label: "CM", x: 30, y: 45 },
      { id: "cdm", label: "CDM", x: 50, y: 50 },
      { id: "rcm", label: "CM", x: 70, y: 45 },
      { id: "lst", label: "ST", x: 35, y: 20 },
      { id: "rst", label: "ST", x: 65, y: 20 },
    ],
  },
};
