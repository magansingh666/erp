/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type entity_UserCreateOutput = {
    createdAt?: string;
    email?: string;
    firstName?: string;
    id?: string;
    imageUrl?: string;
    lastName?: string;
    phone?: string;
    systemRole?: entity_UserCreateOutput.systemRole;
    updatedAt?: string;
};

export namespace entity_UserCreateOutput {

    export enum systemRole {
        ADMIN = 'admin',
        USER = 'user',
    }


}

