import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Utility } from '../utility';

@Component({
  selector: 'app-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit {

  @Input()
  title: string;
  
  currentUser: string;
  utility = new Utility();

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.setUser();
  }

  setUser() {
    this.firebaseService.getUserFromLocalStorage().subscribe(displayName => {
      if(displayName!= null){
        this.currentUser = displayName;
      }
    });
  }
  logout(){
    this.firebaseService.signOutUser();
    this.currentUser=null;
    this.utility.showDevLog('User Logout Successful.');
  }
}
