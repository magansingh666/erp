/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { controller2_HealthCheckResponse } from '../models/controller2_HealthCheckResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UtilityService {

    /**
     * get the status of server.
     * @param metadata Meta data about request
     * @returns controller2_HealthCheckResponse OK
     * @throws ApiError
     */
    public static getOHealthCheck(
        metadata?: string,
    ): CancelablePromise<controller2_HealthCheckResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/o/health-check',
            headers: {
                'Metadata': metadata,
            },
        });
    }

}
