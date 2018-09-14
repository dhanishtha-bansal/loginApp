import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppGlobals {
    readonly baseAppUrl: string = 'http://localhost:4201/';
    private logStatusSource = new BehaviorSubject(false);
    logStatus = this.logStatusSource.asObservable();
    isLoggedIn: boolean = false;
}