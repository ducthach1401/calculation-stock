export abstract class CalculationRepository {
  abstract calculateBenjamin(): Promise<boolean>;
  abstract getBenjamin(): Promise<any>;
  abstract getAllPrice(): Promise<any>;
}
