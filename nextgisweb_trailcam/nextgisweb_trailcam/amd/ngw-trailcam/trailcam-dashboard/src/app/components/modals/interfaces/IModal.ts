export interface IModal {
  getValues(): object;

  open(object: object): void;

  close(): void;
}
