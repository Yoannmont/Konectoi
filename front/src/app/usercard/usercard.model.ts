export class UserCard{
    constructor(
        public id : number,
        public name:string,
        public surname : string,
        public email : string,
        public creationDate : Date,
        public phoneNumber : string
        )
    {}
}