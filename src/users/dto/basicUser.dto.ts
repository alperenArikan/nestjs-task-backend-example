export class BasicUserDto{
    constructor(_firstName : string,_lastName:string,_id:number){
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.id = _id;
    }
    firstName:string;
    lastName:string;
    id:number;
}