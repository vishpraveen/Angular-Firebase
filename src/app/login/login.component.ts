import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { UserModel } from '../user_model';

import { Utility } from '../utility';
import { SharedPref } from '../shared-pref';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  items: Observable<any[]>;
  loading: boolean = false;
  currentUser: string;
  utility= new Utility();
  sharedPref = new SharedPref();
  
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    // this.getUsersFromDb();
    this.setUser();
  }

  saveUserToDb(user: UserModel): void {
    this.firebaseService.saveUser(user);
  }

  async onLogin(): Promise<void> {
    this.loading = true;

    var user = await this.firebaseService.login();
    
    if(user){
      this.currentUser = user.displayName;
  
      // store user data locally until user is logout
      var userModel : UserModel = {uid: user.uid, displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, photoURL: user.photoURL, providerData: user.providerData};
      
      // JSON.parse(localStorage.getItem('user'));
      this.firebaseService.getDbRef(`/users/${user.uid}/providerData`);
      this.saveUserToDb(userModel);
      this.saveUserTOLocal(userModel)
      
    }else{
      console.log('Login error occured')
    }
    this.loading = false;
    this.getCurrentUser();
  }
  saveUserTOLocal(userModel: UserModel) {
    this.utility.saveToLocal(this.sharedPref.USER_ID, userModel.uid);
    this.utility.saveToLocal(this.sharedPref.DISPLAY_NAME, userModel.displayName);
    this.utility.saveToLocal(this.sharedPref.EMAIL, userModel.email);
    this.utility.saveToLocal(this.sharedPref.PHOTO_URL, userModel.photoURL);
    this.utility.saveToLocal(this.sharedPref.PHONE_NUMBER, userModel.phoneNumber);
  }

  getCurrentUser(): void {
    this.firebaseService.getCurrentUser().then(user=>{
      // console.log(`Current Logged User:` + JSON.stringify(user));
    }).catch(error => {
      console.log(`Logged User Error: ${error}`);
    });
  }

  getUsersFromDb(): void {
    this.items = this.firebaseService.getUsers();
    this.items.forEach(item => {
      console.log('Data Received: '+ JSON.stringify( item));
    });
  }

  setUser() {
    this.firebaseService.getUserFromLocalStorage().subscribe(displayName => {
      if(displayName!= null){
        this.currentUser = displayName;
      }
    }
    );
  }

  logout(){
    this.firebaseService.signOutUser();
    this.currentUser=null;
    this.utility.showDevLog('User Logout Successful.');
  }

}
