import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit{
  title = 'loginApp';

  ngOnInit() {
      firebase.initializeApp({
          apiKey: "AIzaSyBiltOOHrlPVugiy_AXYv_yB7e3DvDQyKE",
          authDomain: "todoapp-f64ba.firebaseapp.com",
          databaseURL: "https://todoapp-f64ba.firebaseio.com"
      })
  }
}
