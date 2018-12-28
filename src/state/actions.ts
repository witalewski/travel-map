export interface Action {
  readonly type: string;
}

export const next: () => Action = () => ({
  type: "NEXT"
});

export const prev: () => Action = () => ({
  type: "PREV"
});
