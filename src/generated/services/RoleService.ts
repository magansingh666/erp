/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { entity_RoleCreateInput } from '../models/entity_RoleCreateInput';
import type { entity_RoleCreateOutput } from '../models/entity_RoleCreateOutput';
import type { entity_UserRoleInOrgCreateInput } from '../models/entity_UserRoleInOrgCreateInput';
import type { entity_UserRoleInOrgCreateOutput } from '../models/entity_UserRoleInOrgCreateOutput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoleService {

    /**
     * assign a role to user in org
     * @param userRoleInOrgCreate provide roleId, userId and orgId
     * @returns entity_UserRoleInOrgCreateOutput OK
     * @throws ApiError
     */
    public static postPRoleAssignUserRole(
        userRoleInOrgCreate: entity_UserRoleInOrgCreateInput,
    ): CancelablePromise<entity_UserRoleInOrgCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/role/assign-user-role',
            body: userRoleInOrgCreate,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create New Role in Database
     * @param roleCreateInput role create input
     * @param metaData meta data about request
     * @returns entity_RoleCreateOutput OK
     * @throws ApiError
     */
    public static postPRoleCreate(
        roleCreateInput: entity_RoleCreateInput,
        metaData?: string,
    ): CancelablePromise<entity_RoleCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/role/create',
            headers: {
                'metaData': metaData,
            },
            body: roleCreateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * delete a role by providing its id
     * @param id provide role id
     * @returns entity_RoleCreateOutput OK
     * @throws ApiError
     */
    public static postPRoleDelete(
        id: string,
    ): CancelablePromise<entity_RoleCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/role/delete',
            body: id,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get role data by providing its id
     * @param id provide role id
     * @returns entity_RoleCreateOutput OK
     * @throws ApiError
     */
    public static postPRoleGet(
        id: string,
    ): CancelablePromise<entity_RoleCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/role/get',
            body: id,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get all role data
     * @returns entity_RoleCreateOutput OK
     * @throws ApiError
     */
    public static postPRoleGetAll(): CancelablePromise<Array<entity_RoleCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/role/get-all',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update a Role in Database
     * @param roleUpdateInput role update input
     * @param metaData meta data about request
     * @returns entity_RoleCreateOutput OK
     * @throws ApiError
     */
    public static postPRoleUpdate(
        roleUpdateInput: entity_RoleCreateOutput,
        metaData?: string,
    ): CancelablePromise<entity_RoleCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/role/update',
            headers: {
                'metaData': metaData,
            },
            body: roleUpdateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
