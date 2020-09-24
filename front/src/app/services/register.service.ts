import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Register } from '../interface/register';

const createUser_M = gql`mutation addUsers($username: String!, $password: String!, $role: String!) {
  addUsers(user: {username: $username, password: $password, role: $role}){
    username
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _apollo: Apollo) { }

  createUser(register: Register) {
    // console.log(register)
    return this._apollo.mutate({
      mutation: createUser_M,
      variables: {
        username: register.username,
        password: register.password,
        role: register.role
      }
    });
  }
}
