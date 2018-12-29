interface Action {
  type: string;
}

export class Next implements Action {
  readonly type = "NEXT";
}

export class Prev implements Action {
  readonly type = "PREV";
}

export class ReceiveDestinations implements Action {
  readonly type = "RECEIVE_DESTINATIONS";
  constructor(public destinations: Destination[]) {}
}

export const next: () => Action = () => ({
  type: "NEXT"
});

export const prev: () => Action = () => ({
  type: "PREV"
});

export const receiveDestinations: (
  destinations: Destination[]
) => Action = destinations => ({
  type: "RECEIVE_DESTINATIONS",
  destinations
});

export type TravelMapAction = ReceiveDestinations | Next | Prev;
