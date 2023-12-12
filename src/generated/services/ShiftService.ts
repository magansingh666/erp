/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { entity_ShiftCreateInput } from '../models/entity_ShiftCreateInput';
import type { entity_ShiftCreateOutput } from '../models/entity_ShiftCreateOutput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ShiftService {

    /**
     * Create New Shift for an org
     * @param shiftCreateInput shift create input
     * @param metadata meta data about request
     * @returns entity_ShiftCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgShiftCreate(
        shiftCreateInput: entity_ShiftCreateInput,
        metadata?: string,
    ): CancelablePromise<entity_ShiftCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/shift/create',
            headers: {
                'Metadata': metadata,
            },
            body: shiftCreateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * delete a shift by providing its id
     * @param id provide shift id
     * @param metadata Meta data about request
     * @returns entity_ShiftCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgShiftDelete(
        id: string,
        metadata: string,
    ): CancelablePromise<entity_ShiftCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/shift/delete',
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
     * get a shift data by providing its id
     * @param id provide shift id
     * @param metadata Meta data about request
     * @returns entity_ShiftCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgShiftGet(
        id: string,
        metadata: string,
    ): CancelablePromise<entity_ShiftCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/shift/get',
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
     * get all shift data
     * @param metadata Meta data about request
     * @returns entity_ShiftCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgShiftGetAll(
        metadata: string,
    ): CancelablePromise<Array<entity_ShiftCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/shift/get-all',
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
     * Update a shift in Database
     * @param shiftUpdateInput shift update input
     * @param metadata meta data about request
     * @returns entity_ShiftCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgShiftUpdate(
        shiftUpdateInput: entity_ShiftCreateOutput,
        metadata?: string,
    ): CancelablePromise<entity_ShiftCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/shift/update',
            headers: {
                'Metadata': metadata,
            },
            body: shiftUpdateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
