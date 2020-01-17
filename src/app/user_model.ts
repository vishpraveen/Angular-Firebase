export class UserModel {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    phoneNumber: string;
    providerData: UserProvider[];

    constructor(
        uid: string,
        displayName: string,
        photoURL: string,
        email: string,
        phoneNumber: string,
        providerData: UserProvider[]
    ){
        this.uid = uid;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.providerData = providerData;
    }

}

export class UserProvider {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    phoneNumber: string;
    providerId: string;
}
