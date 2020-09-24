import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-football-teams',
  templateUrl: './football-teams.component.html',
  styleUrls: ['./football-teams.component.scss']
})
export class FootballTeamsComponent implements OnInit {
  getTeamss: Observable<any>;

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.getTeamss = this.teamsService.getTeams().valueChanges.pipe(
      map((result: any) => {
        return result.data.teamsList;
      }));
  }

  getEvent(cities: any) {
    this.getTeams();
  }
}

