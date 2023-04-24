export const ACTIVE: "ACTIVE" = "ACTIVE";

export type TActiveAction = {
  active: string;
  readonly type: typeof ACTIVE;
};

export type TAppHeaderActions = TActiveAction;
