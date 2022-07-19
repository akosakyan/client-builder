import { JsonObject } from 'type-fest';

export class IdentityVerificationModel {
  documentType!: DocumentType;
  series!: string | null;
  number!: number;
  issuedBy!: string | null;
  dateOfIssue!: Date;
  file!: any;

  private constructor() {}

  static fromJson(json: any): IdentityVerificationModel {
    return Object.assign(new IdentityVerificationModel(), {
      documentType: json.document_type,
      series: json.series,
      number: json.number,
      issuedBy: json.issued_by,
      dateOfIssue: json.date_of_issue,
      file: json.file,
    });
  }

  static toJson(model: IdentityVerificationModel): JsonObject {
    return {};
  }

}

export enum DocumentType {
  Passport = 'Passport',
  BirthCertificate = 'Birth Certificate',
  DrivingLicense = 'Driving license'
}
