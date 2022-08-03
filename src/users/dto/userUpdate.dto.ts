export class UserUpdateDto{
    constructor(_firstName : string,_lastName:string){
        this.firstName = _firstName;
        this.lastName = _lastName;
    }
    firstName:string;
    lastName:string;
   
}