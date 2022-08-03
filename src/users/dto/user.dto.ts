export class UserDto{
    constructor(_firstName : string,_lastName:string,_email:string){
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.email = _email;
    }
    firstName:string;
    lastName:string;
    email:string;
}