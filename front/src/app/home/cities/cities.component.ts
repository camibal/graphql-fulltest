import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: Observable<any>;

  constructor(private citiesService: CitiesService, private _apollo: Apollo) { }

  ngOnInit() {
    this.getCities()
  }

  getCities() {
    this.cities = this.citiesService.getCities().valueChanges.pipe(
      map((result: any) => {
        // console.log(result.data.citiesList);
        return result.data.citiesList;
      }));
  }

  getEvent(cities) {
    this.getCities();
  }
}

