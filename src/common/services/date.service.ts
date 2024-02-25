import { Inject, Injectable } from "@nestjs/common";
import * as moment from "moment";
import { LogService } from "./log.service";
const TIMESTAMP_STRING_FORMAT = "DD/MM/YYYY HH.mm";

@Injectable()
export class DateService {
  @Inject()
  private logService: LogService;

  getCurrentDateString(): string {
    return moment().format(TIMESTAMP_STRING_FORMAT);
  }
}
