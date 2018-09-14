import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly baseAppUrl: string = 'http://localhost:4201/';
    isLoggedIn: boolean = false;
}