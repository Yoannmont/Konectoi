import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  let totalRequests = 0;
  let loader = inject(LoadingService)
  totalRequests++;
  loader.setLoading(true);
  return next(req).pipe(
    finalize(() => {
      totalRequests--;
      if (totalRequests == 0){
        loader.setLoading(false);
      }
    }
  ));
};
