export abstract class CalculationRepository {
  abstract calculateBenjamin(): Promise<boolean>;
  abstract getBenjamin(): Promise<any>;
}
