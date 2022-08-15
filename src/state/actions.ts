interface Action {
  type: string;
}

export class ShowNextSlideAction implements Action {
  readonly type = "SHOW_NEXT_SLIDE_ACTION";
}

export class ShowPreviousSlideAction implements Action {
  readonly type = "SHOW_PREVIOUS_SLIDE_ACTION";
}

export class ReceiveDestinations implements Action {
  readonly type = "RECEIVE_DESTINATIONS_ACTION";
  destinations: Destination[];
}

export const showNextSlide: () => ShowNextSlideAction = () => ({
  type: "SHOW_NEXT_SLIDE_ACTION"
});

export const showPreviousSlide: () => ShowPreviousSlideAction = () => ({
  type: "SHOW_PREVIOUS_SLIDE_ACTION"
});

export const receiveDestinations: (
  destinations: Destination[]
) => ReceiveDestinations = destinations => ({
  type: "RECEIVE_DESTINATIONS_ACTION",
  destinations
});

export type TravelMapAction = ReceiveDestinations | ShowNextSlideAction | ShowPreviousSlideAction;
