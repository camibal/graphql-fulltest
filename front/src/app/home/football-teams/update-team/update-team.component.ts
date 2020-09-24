import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Teams } from 'src/app/interface/teams';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {
  displayModal: boolean;

  @Output() send = new EventEmitter<any>();

  @Input() teams: Teams = {
    id: 0,
    equipment: '',
    ligue: '',
    country: '',
  };

  edit: boolean = false;
  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
  }

  showModalDialog() {
    this.displayModal = true;
  }

  closedModal() {
    this.displayModal = false
    this.send.emit(this.teams);
  }

  updateTeam() {
    this.teamsService.updateTeam(this.teams).subscribe(res => {
      this.displayModal = false;
      alert('Team Saved');
      this.send.emit(this.teams);
    }, err => console.error(err)
    )
  }
}
