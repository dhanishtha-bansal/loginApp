import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (req.url.endsWith('register') && req.method === 'POST') {
            
            let user = req.body;

            let duplicateUser = users.filter(userInfo => { return userInfo.username === user.username; }).length;
            
            if (duplicateUser) {
                return throwError({ error: { message: 'Username "' + user.username + '" is already taken' } });
            }

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return of(new HttpResponse({ status: 200 }));
        }

        if (req.url.endsWith('authenticate') && req.method === 'POST') {
        
            let match = users.filter(user => {
                return ((user.username === req.body.username) && 
                        (user.password === req.body.password));
            });

            if (match.length == 1) {

                let user = match[0];
                let authUser = {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                };

                return of(new HttpResponse({ status: 200, body: authUser }));
            } else {
                return throwError({ error: { message: 'Username or password is incorrect' } });
            }
        }
        return next.handle(req);
    }

}