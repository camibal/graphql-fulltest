import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cities } from '../interface/cities';
import { Observable } from 'rxjs';
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";

const GET_CITIES = gql`
{
  citiesList{
    id
    city
    country
    continent
  }
}
`;

const CREATE_CITY = gql`
  mutation addCity($city: String!, $country: String!, $continent: String!) {
    addCity(cities: { city: $city, country: $country, continent: $continent }) {
      id
      city
      country
      continent
    }
  }
`;

const UPDATE_CITY = gql`
  mutation updateCity($id: ID!, $city: String!, $country: String!, $continent: String!) {
    updateCity(cities: {id: $id, city: $city, country: $country, continent: $continent }) {
        id
        city
        country
        continent
    }
  }
`;

const DELETE_CITY = gql`
  mutation deleteCity($id: ID!) {
    deleteCity(id: $id) {
      id
      city
      country
      continent
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private httpClient: HttpClient, private _apollo: Apollo) { }

  getCities() {
    return this._apollo.watchQuery({ query: GET_CITIES })
  }

  saveCity(citiesForm: Cities): Observable<any> {
    return this._apollo.mutate({
      mutation: CREATE_CITY,
      variables: {
        city: citiesForm.city,
        country: citiesForm.country,
        continent: citiesForm.continent
      }
    });
  }

  deleteCity(id) {
    return this._apollo
      .mutate({
        mutation: DELETE_CITY,
        refetchQueries: [{ query: GET_CITIES }],
        variables: {
          id: id,
        },
      })
  }

  updateCity(cities: Cities) {
    return this._apollo.mutate({
      mutation: UPDATE_CITY,
      refetchQueries: [{ query: GET_CITIES }],
      variables: {
        id: cities.id,
        city: cities.city,
        country: cities.country,
        continent: cities.continent
      }
    });
  }
}
