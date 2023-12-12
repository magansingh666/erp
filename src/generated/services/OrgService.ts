/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { controller2_OrgInput } from '../models/controller2_OrgInput';
import type { entity_OrgCreateInput } from '../models/entity_OrgCreateInput';
import type { entity_OrgCreateOutput } from '../models/entity_OrgCreateOutput';
import type { entity_UserCreateOutput } from '../models/entity_UserCreateOutput';
import type { entity_UserInOrgCreateInput } from '../models/entity_UserInOrgCreateInput';
import type { entity_UserInOrgCreateOutput } from '../models/entity_UserInOrgCreateOutput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrgService {

    /**
     * add user in an org
     * @param addUserToOrgInput provide user and org id
     * @param metadata Meta data about request
     * @returns entity_UserInOrgCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgAddUser(
        addUserToOrgInput: entity_UserInOrgCreateInput,
        metadata: string,
    ): CancelablePromise<entity_UserInOrgCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/add-user',
            headers: {
                'Metadata': metadata,
            },
            body: addUserToOrgInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create New Organization in Database
     * @param userCreateInput org create input
     * @param metaData meta data about request
     * @returns entity_OrgCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgCreate(
        userCreateInput: entity_OrgCreateInput,
        metaData?: string,
    ): CancelablePromise<entity_OrgCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/create',
            headers: {
                'metaData': metaData,
            },
            body: userCreateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * delete an org by providing its id
     * @param id provide org id
     * @param metadata Meta data about request
     * @returns entity_OrgCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgDelete(
        id: string,
        metadata: string,
    ): CancelablePromise<entity_OrgCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/delete',
            headers: {
                'Metadata': metadata,
            },
            body: id,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get org data by providing its id
     * @param id provide org id
     * @param metadata Meta data about request
     * @returns entity_OrgCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgGet(
        id: string,
        metadata: string,
    ): CancelablePromise<entity_OrgCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/get',
            headers: {
                'Metadata': metadata,
            },
            body: id,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get all org data
     * @param metadata Meta data about request
     * @returns entity_OrgCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgGetAll(
        metadata: string,
    ): CancelablePromise<Array<entity_OrgCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/get-all',
            headers: {
                'Metadata': metadata,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get all linked orgs for a user
     * @param metadata Meta data about request
     * @returns entity_OrgCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgGetLinkedOrg(
        metadata: string,
    ): CancelablePromise<Array<entity_OrgCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/get-linked-org',
            headers: {
                'Metadata': metadata,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get all users in organization
     * @param orgIdInput provide org id
     * @param metadata Meta data about request
     * @returns entity_UserCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgGetUsers(
        orgIdInput: controller2_OrgInput,
        metadata: string,
    ): CancelablePromise<Array<entity_UserCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/get-users',
            headers: {
                'Metadata': metadata,
            },
            body: orgIdInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * remove user in an org
     * @param removeUserToOrgInput provide user and org id
     * @returns entity_UserInOrgCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgRemoveUser(
        removeUserToOrgInput: entity_UserInOrgCreateInput,
    ): CancelablePromise<entity_UserInOrgCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/remove-user',
            body: removeUserToOrgInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update an Organization in Database
     * @param userUpdateInput org update input
     * @param metaData meta data about request
     * @returns entity_OrgCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgUpdate(
        userUpdateInput: entity_OrgCreateOutput,
        metaData?: string,
    ): CancelablePromise<entity_OrgCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/update',
            headers: {
                'metaData': metaData,
            },
            body: userUpdateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
