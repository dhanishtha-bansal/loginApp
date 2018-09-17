import { ToDo } from "./todo.model";

export class User {
    constructor(
        public userID: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public todoList: ToDo[]
    ){
        
    }
}