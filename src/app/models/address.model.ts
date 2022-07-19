import { JsonObject } from 'type-fest';

export class AddressModel {
  index!: number | null;
  country!: string;
  area!: string | null;
  city!: string;
  street!: string | null;
  house!: string | null;

  private constructor() {}

  static fromJSON(json: any): AddressModel {
    return Object.assign(new AddressModel(), {
      index: json.index || null,
      country: json.country,
      area: json.area || null,
      city: json.city,
      street: json.street || null,
      house: json.house || null,
    });
  }

  static toJSON(model: AddressModel): JsonObject {
    return {
      index: model.index,
      country: model.country,
      area: model.area,
      city: model.city,
      street: model.street,
      house: model.house,
    };
  }
}
