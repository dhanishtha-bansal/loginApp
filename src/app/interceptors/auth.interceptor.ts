import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (req.url.endsWith('register') && req.method === 'POST') {
            
            let user = req.body;

            let duplicateUser = users.filter(user => { return user.username === user.username; }).length;
            
            if (duplicateUser) {
                return throwError({ error: { message: 'Username "' + user.username + '" is already taken' } });
            }

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return of(new HttpResponse({ status: 200 }));
        }
        return next.handle(req);
    }

}