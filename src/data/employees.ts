export type Status = 'active' | 'onboarding' | 'on leave' | 'alumni';

export interface Employee {
  id: number;
  name: string;
  email: string;
  team: string;
  role: string;
  location: string;
  status: Status;
  salary: number;
  performance: number;
  startDate: string;
}

const FIRST = [
  'Amara', 'Bo', 'Camille', 'Dev', 'Elif', 'Frida', 'Gustavo', 'Hana', 'Ilya',
  'Jun', 'Kwame', 'Lena', 'Mateo', 'Nadia', 'Omar', 'Priya', 'Quinn', 'Rafael',
  'Sora', 'Tomas', 'Uma', 'Viktor', 'Wren', 'Xiu', 'Yara', 'Zane',
];

const LAST = [
  'Okafor', 'Lindqvist', 'Moreau', 'Patel', 'Demir', 'Kahlo', 'Ribeiro',
  'Sato', 'Volkov', 'Park', 'Mensah', 'Novak', 'Alvarez', 'Haddad', 'Rahman',
  'Iyer', 'Brennan', 'Costa', 'Tanaka', 'Kovacs',
];

const TEAMS = ['Platform', 'Design', 'Growth', 'Data', 'Support', 'Security'];

const ROLES = [
  'Engineer', 'Senior Engineer', 'Staff Engineer', 'Product Designer',
  'Engineering Manager', 'Analyst', 'Technical Writer',
];

const LOCATIONS = [
  'Paris', 'Lisbon', 'Berlin', 'Remote — EU', 'Montreal', 'Singapore', 'Austin',
];

const STATUSES: Status[] = ['active', 'active', 'active', 'onboarding', 'on leave', 'alumni'];

/** Deterministic PRNG so the demo data is identical on every render and reload. */
function makeRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function generate(count: number): Employee[] {
  const random = makeRandom(20260720);
  return Array.from({ length: count }, (_, index) => {
    const first = FIRST[Math.floor(random() * FIRST.length)];
    const last = LAST[Math.floor(random() * LAST.length)];
    const year = 2016 + Math.floor(random() * 10);
    const month = 1 + Math.floor(random() * 12);
    const day = 1 + Math.floor(random() * 28);

    return {
      id: index + 1,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      team: TEAMS[Math.floor(random() * TEAMS.length)],
      role: ROLES[Math.floor(random() * ROLES.length)],
      location: LOCATIONS[Math.floor(random() * LOCATIONS.length)],
      status: STATUSES[Math.floor(random() * STATUSES.length)],
      salary: 45_000 + Math.floor(random() * 95_000),
      performance: Math.round((2.5 + random() * 2.5) * 10) / 10,
      startDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    };
  });
}

export const employees = generate(180);

export const statusColor: Record<Status, 'success' | 'info' | 'warning' | 'default'> = {
  active: 'success',
  onboarding: 'info',
  'on leave': 'warning',
  alumni: 'default',
};
