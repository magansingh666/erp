/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { controller2_IdDataInput } from '../models/controller2_IdDataInput';
import type { controller2_LoginParams } from '../models/controller2_LoginParams';
import type { controller2_LoginResponse } from '../models/controller2_LoginResponse';
import type { entity_UserCreateInput } from '../models/entity_UserCreateInput';
import type { entity_UserCreateOutput } from '../models/entity_UserCreateOutput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Create New User in Database
     * @param userCreateInput user create input
     * @param metadata Meta data about request
     * @returns entity_UserCreateOutput OK
     * @throws ApiError
     */
    public static postOUserCreate(
        userCreateInput: entity_UserCreateInput,
        metadata: string,
    ): CancelablePromise<entity_UserCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/o/user/create',
            headers: {
                'Metadata': metadata,
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
     * Login.
     * @param loginInput login input
     * @param metadata Meta data about request
     * @returns controller2_LoginResponse OK
     * @throws ApiError
     */
    public static postOUserLogin(
        loginInput: controller2_LoginParams,
        metadata: string,
    ): CancelablePromise<controller2_LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/o/user/login',
            headers: {
                'Metadata': metadata,
            },
            body: loginInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get User Detail
     * @param metadata Meta data about request
     * @returns entity_UserCreateOutput OK
     * @throws ApiError
     */
    public static postPUserGet(
        metadata: string,
    ): CancelablePromise<entity_UserCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/user/get',
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
     * Get List of all users in Database
     * @param metadata Meta data about request
     * @returns entity_UserCreateOutput OK
     * @throws ApiError
     */
    public static postPUserGetAll(
        metadata: string,
    ): CancelablePromise<Array<entity_UserCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/user/get-all',
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
     * get all Users data by providing roster ids
     * @param metadata Meta data about request
     * @param ids provide ids of all required users
     * @returns entity_UserCreateOutput OK
     * @throws ApiError
     */
    public static postPUserGetByIds(
        metadata: string,
        ids: controller2_IdDataInput,
    ): CancelablePromise<Array<entity_UserCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/user/get-by-ids',
            headers: {
                'Metadata': metadata,
            },
            body: ids,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Updatea user in Database. password and email update not allowed. These fields are ignored if set.
     * @param userUpdateInput user update input
     * @param metadata Meta data about request
     * @returns entity_UserCreateOutput OK
     * @throws ApiError
     */
    public static postPUserUpdate(
        userUpdateInput: entity_UserCreateOutput,
        metadata: string,
    ): CancelablePromise<entity_UserCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/user/update',
            headers: {
                'Metadata': metadata,
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
