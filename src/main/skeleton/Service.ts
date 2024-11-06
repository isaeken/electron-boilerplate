export abstract class Service {
  public abstract load(): void;

  public abstract unload(): void;

  public name(): string {
    return this.constructor.name;
  }
}
