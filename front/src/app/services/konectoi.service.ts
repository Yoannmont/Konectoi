import { Injectable } from "@angular/core";
import { UserCard } from "../usercard/usercard.model";

@Injectable({
    providedIn: 'root'
})

export class KonectoiService{
    private usercards : UserCard[] =[{
        id : 1,
        name : "Yoann",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0606060606"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }, 
    {
        id : 2,
        name : "Kevin",
        surname : "injji",
        email : "balalf",
        creationDate : new Date(),
        phoneNumber : "0707070707"
    }]

    public connected : boolean = false;

    public getAllUserCards() : UserCard[] {
        return this.usercards;
    }
};