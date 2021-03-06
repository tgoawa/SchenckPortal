import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface SchenckAppConfig {
    calcErrorMessage: string;
    serverErrorMessage: string;
}

export const AppConfig: SchenckAppConfig = {
    calcErrorMessage: 'Invalid value used for test',
    serverErrorMessage: 'Error communicating with server, please contact the help desk',
};
