import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  private subscription: Subscription;
    message: any;

    constructor(private errorService: ErrorService) { }

    ngOnInit() {
        this.subscription = this.errorService.getMessage().subscribe(message => { 
            this.message = message; 
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
