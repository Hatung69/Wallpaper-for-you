export class User {
  uid: string;
  displayName: string;
  photoURL: string;
  provider: string;

  constructor() {
    this.displayName = '';
    this.photoURL = '';
    this.provider = '';
  }
}
