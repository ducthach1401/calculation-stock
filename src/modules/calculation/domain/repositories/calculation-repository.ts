export abstract class CalculationRepository {
  abstract calculateBenjamin(): Promise<Record<string, any>>;
}
