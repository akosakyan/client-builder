import { JsonObject } from 'type-fest';

export class ClientModel {
  lastName!: string;
  name!: string;
  middleName!: string | null;
  dateOfBirth!: Date;
  phoneNumber!: number;
  gender!: string;
  clientGroup!: ClientGroup[];
  coordinator!: string | null;
  sendSMS!: boolean;

  private constructor() {}

  static fromJSON(json: any): ClientModel {
    return Object.assign(new ClientModel(), {
      lastName: json.last_name,
      name: json.name,
      middleName: json.middle_name || null,
      dateOfBirth: new Date(json.date_of_birth),
      phoneNumber: json.phone_number,
      gender: json.gender,
      clientGroup: json.client_group,
      coordinator: json.coordinator || null,
      sendSMS: Boolean(json.sent_sms),
    });
  }

  static toJSON(model: ClientModel): JsonObject {
    return {
      last_name: model.lastName,
      name: model.name,
      middle_name: model.middleName || null,
      date_of_birth: model.dateOfBirth.toUTCString(),
      phone_number: model.phoneNumber,
      gender: model.gender,
      client_group: model.clientGroup,
      coordinator: model.coordinator || null,
      sent_sms: model.sendSMS,
    };
  }
}

export enum ClientGroup {
  VIPClients = 'VIP Clients',
  LoyalClients = 'Loyal Clients',
  NewClients = 'New Clients'
}
