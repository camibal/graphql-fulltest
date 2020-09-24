import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Teams } from '../interface/teams';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { Apollo } from "apollo-angular";

const GET_TEAMS = gql`
{
  teamsList{
    id
    equipment
    ligue
    country
  }
}
`;

const CREATE_TEAM = gql`
  mutation addTeam($equipment: String!, $ligue: String!, $country: String!) {
    addTeam(teams: { equipment: $equipment, ligue: $ligue, country: $country }) {
    id
    equipment
    ligue
    country
    }
  }
`;

const UPDATE_TEAM = gql`
  mutation updateTeam($equipment: String!, $ligue: String!, $country: String!) {
    updateTeam(teams: { equipment: $equipment, ligue: $ligue, country: $country }) {
    id
    equipment
    ligue
    country
    }
  }
`;

const DELETE_TEAM = gql`
  mutation deleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      id
      equipment
      ligue
      country
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private endpoint: string = environment.endpoint + 'teams';

  constructor(private httpClient: HttpClient, private _apollo: Apollo) { }

  getTeams() {
    return this._apollo.watchQuery({ query: GET_TEAMS })
  }

  saveTeam(teams: Teams): Observable<any> {
    return this._apollo.mutate({
      mutation: CREATE_TEAM,
      variables: {
        equipment: teams.equipment,
        ligue: teams.ligue,
        country: teams.country
      }
    });
  }

  deleteTeam(id) {
    return this._apollo
      .mutate({
        mutation: DELETE_TEAM,
        refetchQueries: [{ query: GET_TEAMS }],
        variables: {
          id: id,
        },
      })
  }

  updateTeam(teams: Teams) {
    return this._apollo.mutate({
      mutation: UPDATE_TEAM,
      refetchQueries: [{ query: GET_TEAMS }],
      variables: {
        id: teams.id,
        equipment: teams.equipment,
        ligue: teams.ligue,
        country: teams.country
      }
    });
  }
}
