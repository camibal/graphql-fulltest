import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Teams } from 'src/app/interface/teams';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.scss']
})
export class DeleteTeamComponent implements OnInit {

  displayModal: boolean;

  @Output() send = new EventEmitter<any>();

  @Input() teams: Teams = {
    id: 0,
    equipment: '',
    ligue: '',
    country: ''
  }

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
  }

  showModalDialog() {
    this.displayModal = true;
  }

  deleteTeam() {
    this.teamsService.deleteTeam(this.teams.id).subscribe(() => {
      this.displayModal = false;
      alert('Deleted City');
      this.send.emit(this.teams);
    }, err => console.error(err)
    )
  }


}