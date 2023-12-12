/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type entity_UserCreateInput = {
    email?: string;
    firstName: string;
    imageUrl?: string;
    lastName?: string;
    password?: string;
    phone?: string;
    systemRole?: entity_UserCreateInput.systemRole;
};

export namespace entity_UserCreateInput {

    export enum systemRole {
        ADMIN = 'ADMIN',
        _ORG_USER = ' ORG_USER',
        _ORG_ADMIN = ' ORG_ADMIN',
    }


}

