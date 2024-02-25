export enum EnvironmentType {
  LOCAL = "local",
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export enum MiscMessages {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  ADDED = "ADDED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXIST = "ALREADY_EXIST",
}

export enum MiscCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORISED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  ALREADY_EXIST = 409,
}

export enum UserRolesEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}
