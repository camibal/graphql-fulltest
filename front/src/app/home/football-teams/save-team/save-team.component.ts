import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { Teams } from 'src/app/interface/teams';

@Component({
  selector: 'app-save-team',
  templateUrl: './save-team.component.html',
  styleUrls: ['./save-team.component.scss']
})
export class SaveTeamComponent implements OnInit {
  @Output() send = new EventEmitter<any>();

  displayModal: boolean;
  TeamsForm: FormGroup;
  teams: Teams = {
    id: 0,
    equipment: '',
    ligue: '',
    country: ''
  }
  constructor(public formbuilder: FormBuilder, private teamsService: TeamsService) {
    //validate form
    this.TeamsForm = this.formbuilder.group({
      id: 0,
      equipment: ['', [Validators.required, Validators.minLength(3)]],
      ligue: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
  }

  showModalDialog() {
    this.displayModal = true;
  }

  saveTeam(): void {
    if (this.TeamsForm.valid) {
      this.teamsService.saveTeam(this.TeamsForm.value).subscribe(() => {
        this.TeamsForm.reset();
        this.displayModal = false;
        alert('Team saved');
        this.send.emit(this.teams);
      }, error => {
        console.error(error)
      });
    }
  }

  get equipment() { return this.TeamsForm.get('equipment'); }
  get ligue() { return this.TeamsForm.get('ligue'); }
  get country() { return this.TeamsForm.get('country'); }

}
