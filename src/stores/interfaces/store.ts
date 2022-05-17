export type StoreKey = `${string}Store`;

export interface IStore {
  readonly storeKey: StoreKey;
}
