import { Role } from "@prisma/client";
export declare class CreateReq {
    emailId: string;
    password: string;
    role: Role;
}
