import { Injectable, DoBootstrap } from '@angular/core';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { UserModel, UserProvider } from './user_model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { SharedPref } from './shared-pref'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  sharedPref = new SharedPref();

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, public storage: AngularFireStorage){
  }

  async getDbRef(childUrl: string) {
     return this.db.database.ref(childUrl);
  }

  async login(): Promise<User> {
    try {
      return (await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())).user;   
    } catch (error) {
      console.error(error);
    }         
  }
  
  saveUser(user: UserModel): void {
    this.db.database.ref(this.sharedPref.TBL_USERS+'/' + user.uid).set({
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerData: user.providerData,
    });
  }

  async getCurrentUser(): Promise<User>{
    try {
      return this.afAuth.auth.currentUser;   
    } catch (error) {
      console.error(error);
    }  
  }

  getUsers(): Observable<any[]>{
    return this.db.list(this.sharedPref.TBL_USERS).valueChanges();
  }

  getUserFromLocalStorage(): Observable<string>{
    var displayName = localStorage.getItem('DISPLAY_NAME');
    console.log(`Local User: ${displayName}`)
    return of(displayName);
  }

  signOutUser(){
    localStorage.clear();
    this.afAuth.auth.signOut();
  }

  // category services

  // category detail services
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.putString(file);

     // observe percentage changes
    //  this.uploadPercent = task.percentageChanges();
     // get notified when the download URL is available
    //  task.snapshotChanges().pipe(
    //      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    //   )
    //  .subscribe()
  }
  
}
