import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { httpInterceptorProviders } from './interceptors';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    httpInterceptorProviders
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
