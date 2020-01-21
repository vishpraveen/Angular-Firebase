import { Injectable, DoBootstrap } from '@angular/core';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { UserModel, UserProvider } from './user_model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { SharedPref } from './shared-pref'
import { CategoryModel } from './category-model';

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
  saveCategory(cateogry: CategoryModel): void {
    this.db.database.ref(this.sharedPref.TBL_CATEGORIES+'/').push({
      categoryName: cateogry.categoryName,
      categoryImage: cateogry.categoryImage,
      categoryStatus: cateogry.categoryStatus
    });
  }
}
