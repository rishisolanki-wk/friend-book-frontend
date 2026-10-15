import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('friendbook_token');

  const publicUrls = [
    '/auth/login',
    '/register',
    '/auth/test'
  ];

  const isPublicApi = publicUrls.some(url =>
    req.url.includes(url)
  );

  if (!token || isPublicApi) {
    return next(req);
  }
  if (token) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authRequest);
  }

  return next(req);
};
