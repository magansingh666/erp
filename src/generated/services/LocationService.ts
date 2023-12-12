/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { controller2_IdDataInput } from '../models/controller2_IdDataInput';
import type { entity_LocationCreateInput } from '../models/entity_LocationCreateInput';
import type { entity_LocationCreateOutput } from '../models/entity_LocationCreateOutput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LocationService {

    /**
     * Create New Location within a Branch
     * @param metadata Meta data about request
     * @param locationCreateInput location create input
     * @param metaData meta data about request
     * @returns entity_LocationCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgLocationCreate(
        metadata: string,
        locationCreateInput: entity_LocationCreateInput,
        metaData?: string,
    ): CancelablePromise<entity_LocationCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/location/create',
            headers: {
                'Metadata': metadata,
                'metaData': metaData,
            },
            body: locationCreateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * delete a location by providing its id
     * @param id provide location id
     * @param metadata Meta data about request
     * @returns entity_LocationCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgLocationDelete(
        id: string,
        metadata: string,
    ): CancelablePromise<entity_LocationCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/location/delete',
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
     * get a loaction data by providing its id
     * @param metadata Meta data about request
     * @param id provide branch id
     * @returns entity_LocationCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgLocationGet(
        metadata: string,
        id: string,
    ): CancelablePromise<entity_LocationCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/location/get',
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
     * get all location data
     * @param metadata Meta data about request
     * @returns entity_LocationCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgLocationGetAll(
        metadata: string,
    ): CancelablePromise<Array<entity_LocationCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/location/get-all',
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
     * get all location data by providing  ids
     * @param metadata Meta data about request
     * @param ids provide ids of all required roster
     * @returns entity_LocationCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgLocationGetByIds(
        metadata: string,
        ids: controller2_IdDataInput,
    ): CancelablePromise<Array<entity_LocationCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/location/get-by-ids',
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
     * Update a location in Database
     * @param metadata Meta data about request
     * @param locationUpdateInput location update input
     * @param metaData meta data about request
     * @returns entity_LocationCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgLocationUpdate(
        metadata: string,
        locationUpdateInput: entity_LocationCreateOutput,
        metaData?: string,
    ): CancelablePromise<entity_LocationCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/location/update',
            headers: {
                'Metadata': metadata,
                'metaData': metaData,
            },
            body: locationUpdateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
