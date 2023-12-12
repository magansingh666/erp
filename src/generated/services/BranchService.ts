/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { entity_BranchCreateInput } from '../models/entity_BranchCreateInput';
import type { entity_BranchCreateOutput } from '../models/entity_BranchCreateOutput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BranchService {

    /**
     * Create New Branch in Database
     * @param branchCreateInput branch create input
     * @param metadata meta data about request
     * @returns entity_BranchCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgBranchCreate(
        branchCreateInput: entity_BranchCreateInput,
        metadata?: string,
    ): CancelablePromise<entity_BranchCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/branch/create',
            headers: {
                'Metadata': metadata,
            },
            body: branchCreateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * delete a branch by providing its id
     * @param metadata Meta data about request
     * @param id provide branch id
     * @returns entity_BranchCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgBranchDelete(
        metadata: string,
        id: string,
    ): CancelablePromise<entity_BranchCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/branch/delete',
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
     * get a branch data by providing its id
     * @param id provide branch id
     * @param metadata Meta data about request
     * @returns entity_BranchCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgBranchGet(
        id: string,
        metadata: string,
    ): CancelablePromise<entity_BranchCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/branch/get',
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
     * get all branch data
     * @param metadata Meta data about request
     * @returns entity_BranchCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgBranchGetAll(
        metadata: string,
    ): CancelablePromise<Array<entity_BranchCreateOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/branch/get-all',
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
     * Update a branch in Database
     * @param branchUpdateInput branch update input
     * @param metadata meta data about request
     * @returns entity_BranchCreateOutput OK
     * @throws ApiError
     */
    public static postPOrgBranchUpdate(
        branchUpdateInput: entity_BranchCreateOutput,
        metadata?: string,
    ): CancelablePromise<entity_BranchCreateOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p/org/branch/update',
            headers: {
                'Metadata': metadata,
            },
            body: branchUpdateInput,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
