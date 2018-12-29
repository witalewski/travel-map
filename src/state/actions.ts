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
  destinations: Destination[];
}

export const next: () => Next = () => ({
  type: "NEXT"
});

export const prev: () => Prev = () => ({
  type: "PREV"
});

export const receiveDestinations: (
  destinations: Destination[]
) => ReceiveDestinations = destinations => ({
  type: "RECEIVE_DESTINATIONS",
  destinations
});

export type TravelMapAction = ReceiveDestinations | Next | Prev;
