/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { entity_LeaveInput } from '../models/entity_LeaveInput';
import type { entity_LeaveOutput } from '../models/entity_LeaveOutput';
import type { entity_LeaveOutputWithFBSendIds } from '../models/entity_LeaveOutputWithFBSendIds';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LeaveService {

    /**
     * Create a new Leave in Database
     * @param leaveInput leave create input
     * @param metaData meta data about request
     * @returns entity_LeaveOutputWithFBSendIds OK
     * @throws ApiError
     */
    public static postPLeaveCreate(
        leaveInput: entity_LeaveInput,
        metaData?: string,
    ): CancelablePromise<entity_LeaveOutputWithFBSendIds> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/leave/create',
            headers: {
                'metaData': metaData,
            },
            body: leaveInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * delete a leave by providing its id
     * @param leaveIdInput provide at least id of leave
     * @param metaData meta data about request
     * @returns entity_LeaveOutput OK
     * @throws ApiError
     */
    public static postPLeaveDelete(
        leaveIdInput: entity_LeaveOutput,
        metaData?: string,
    ): CancelablePromise<entity_LeaveOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/leave/delete',
            headers: {
                'metaData': metaData,
            },
            body: leaveIdInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get leave data by providing its id
     * @param leaveUpdateInput leave update input
     * @param metaData meta data about request
     * @returns entity_LeaveOutput OK
     * @throws ApiError
     */
    public static postPLeaveGet(
        leaveUpdateInput: entity_LeaveOutput,
        metaData?: string,
    ): CancelablePromise<entity_LeaveOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/leave/get',
            headers: {
                'metaData': metaData,
            },
            body: leaveUpdateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get all leave data
     * @param metaData meta data about request
     * @returns entity_LeaveOutput OK
     * @throws ApiError
     */
    public static postPLeaveGetAll(
        metaData?: string,
    ): CancelablePromise<Array<entity_LeaveOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/leave/get-all',
            headers: {
                'metaData': metaData,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * a user can get own leaves through this api
     * @param metaData meta data about request
     * @returns entity_LeaveOutput OK
     * @throws ApiError
     */
    public static postPLeaveGetMyLeaves(
        metaData?: string,
    ): CancelablePromise<Array<entity_LeaveOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/leave/get-my-leaves',
            headers: {
                'metaData': metaData,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update a leave in Database
     * @param leaveUpdateInput leave update input
     * @param metaData meta data about request
     * @returns entity_LeaveOutput OK
     * @throws ApiError
     */
    public static postPLeaveUpdate(
        leaveUpdateInput: entity_LeaveOutput,
        metaData?: string,
    ): CancelablePromise<entity_LeaveOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/leave/update',
            headers: {
                'metaData': metaData,
            },
            body: leaveUpdateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
