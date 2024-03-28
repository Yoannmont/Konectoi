export class UserCard{
    constructor(
        public id : number,
        public username:string,
        public password : string,
        public email : string,
        public birthdate : Date,
        public phonenumber : string
        )
    {}
}