export type SubscriptionListener<T> = (event: T) => void;

export interface Subscription {
  dispose: () => void;
}
