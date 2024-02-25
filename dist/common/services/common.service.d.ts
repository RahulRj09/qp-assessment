import { ReqDecoded } from "../dto/ReqDecoded";
export declare class CommonService {
    private configService;
    getHash(str: string): string;
    getAccessTokenNew(dataToEncode: ReqDecoded): string;
    private getJwtTokenNew;
}
