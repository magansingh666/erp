/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { controller2_GetRosterBInput } from '../models/controller2_GetRosterBInput';
import type { controller2_IdDataInput } from '../models/controller2_IdDataInput';
import type { entity_PunchInInput } from '../models/entity_PunchInInput';
import type { entity_PunchInOutput } from '../models/entity_PunchInOutput';
import type { entity_RosterCreateInput } from '../models/entity_RosterCreateInput';
import type { entity_RosterCreateOutput } from '../models/entity_RosterCreateOutput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RosterService {

    /**
     * Create New Roster in Database
     * @param rosterCreateInput Roster create input
     * @param metadata meta data about request
     * @returns entity_RosterCreateOutput OK
     * @throws ApiError
     */
    public static postPRosterCreate(
        rosterCreateInput: entity_RosterCreateInput,
        metadata: string,
    ): CancelablePromise<entity_RosterCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/roster/create',
            headers: {
                'Metadata': metadata,
            },
            body: rosterCreateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * delete an Roster by providing its id
     * @param rosterDeleteInput At least provide Roster id
     * @param metadata Meta data about request
     * @returns entity_RosterCreateOutput OK
     * @throws ApiError
     */
    public static postPRosterDelete(
        rosterDeleteInput: entity_RosterCreateOutput,
        metadata: string,
    ): CancelablePromise<entity_RosterCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/roster/delete',
            headers: {
                'Metadata': metadata,
            },
            body: rosterDeleteInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get Roster data by providing its id
     * @param id provide Roster id. ignore other parameters
     * @returns entity_RosterCreateOutput OK
     * @throws ApiError
     */
    public static postPRosterGet(
        id: entity_RosterCreateOutput,
    ): CancelablePromise<entity_RosterCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/roster/get',
            body: id,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get all Roster data
     * @param metadata Meta data about request
     * @returns entity_RosterCreateOutput OK
     * @throws ApiError
     */
    public static postPRosterGetAll(
        metadata: string,
    ): CancelablePromise<Array<entity_RosterCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/roster/get-all',
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
     * Get User Roster between two time points
     * @param getRosterBetweenInput Get Roster Between Input
     * @param metadata meta data about request
     * @returns entity_RosterCreateOutput OK
     * @throws ApiError
     */
    public static postPRosterGetBetween(
        getRosterBetweenInput: controller2_GetRosterBInput,
        metadata: string,
    ): CancelablePromise<Array<entity_RosterCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/roster/get-between',
            headers: {
                'Metadata': metadata,
            },
            body: getRosterBetweenInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * get all Roster data by providing roster ids
     * @param metadata Meta data about request
     * @param ids provide ids of all required roster
     * @returns entity_RosterCreateOutput OK
     * @throws ApiError
     */
    public static postPRosterGetByIds(
        metadata: string,
        ids: controller2_IdDataInput,
    ): CancelablePromise<Array<entity_RosterCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/roster/get-by-ids',
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
     * punch in out
     * @param metadata Meta data about request
     * @param punchInOutInput provide location id and time string
     * @returns entity_PunchInOutput OK
     * @throws ApiError
     */
    public static postPRosterPunchInOut(
        metadata: string,
        punchInOutInput: entity_PunchInInput,
    ): CancelablePromise<entity_PunchInOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/roster/punch-in-out',
            headers: {
                'Metadata': metadata,
            },
            body: punchInOutInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update an Roster in Database
     * @param rosterUpdateInput Roster update input
     * @param metadata Meta data about request
     * @returns entity_RosterCreateOutput OK
     * @throws ApiError
     */
    public static postPRosterUpdate(
        rosterUpdateInput: entity_RosterCreateOutput,
        metadata: string,
    ): CancelablePromise<entity_RosterCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/roster/update',
            headers: {
                'Metadata': metadata,
            },
            body: rosterUpdateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
