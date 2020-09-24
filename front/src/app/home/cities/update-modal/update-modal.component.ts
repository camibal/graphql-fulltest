import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { Cities } from 'src/app/interface/cities';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  displayModal: boolean;

  @Output() send = new EventEmitter<any>(); 
  
  @Input() cities: Cities = {
    id: 0,
    city: '',
    country: '',
    continent: '',
  };

  edit: boolean = false;
  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
  }

  showModalDialog() {
    this.displayModal = true;
  }

  closedModal(){
    this.displayModal=false
    this.send.emit(this.cities);
  }

  updateCity() {
      this.citiesService.updateCity(this.cities).subscribe(() => {
        this.displayModal = false;
        alert('Update City');
        this.send.emit(this.cities);
      }, err => console.error(err)
      )
  }
}
