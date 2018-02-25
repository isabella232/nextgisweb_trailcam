export interface IModal {
  getValues(): object;

  open(object: object, editable: boolean): void;

  close(): void;
}
