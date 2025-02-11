export type Coordinate = [number, number];

export interface Place {
  id: string;
  center: Coordinate;
  place_name: string;
  place_type: string[];
}
