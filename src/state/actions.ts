export class NextAction {
  readonly type = "NEXT";
}

export type Action = NextAction;

export const next: () => NextAction = () => ({
  type: "NEXT"
});
