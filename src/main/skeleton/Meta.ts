import app from '../../app.json';

export class Meta {
  private static instance: Meta;

  public name: string;
  public signature: string;
  public version: string;
  public build: string;
  public isProduction: boolean;

  public static get() {
    if (Meta.instance) {
      return Meta.instance;
    }

    const meta = new Meta();
    meta.name = app.name ?? 'app';
    meta.signature = app.signature ?? 'app';
    meta.version = app.version ?? '0.0.0';
    meta.build = app.build ?? '0';
    meta.isProduction = process.env.NODE_ENV === 'production';
    Meta.instance = meta;

    return meta;
  }
}
