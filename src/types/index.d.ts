interface Team {
  id: number;
  name: string;
  types: any[];
  image: string;
  stats: any[];
  about: {
    type: any[];
    heigh: number;
    weight: number;
    ability: any[];
  };
  evolution: any;
}

interface TeamState {
  teams: Team[];
}
