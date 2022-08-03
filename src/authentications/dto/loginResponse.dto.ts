export class LoginResponseDto {

    constructor(_token: string){
        this.token = _token
    }
    token : string;
}