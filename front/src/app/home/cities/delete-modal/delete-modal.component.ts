import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { Cities } from 'src/app/interface/cities';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  displayModal: boolean;

  @Output() send = new EventEmitter<any>(); 

  @Input() cities: Cities = {
    id: 0,
    city: '',
    country: '',
    continent: ''
  }

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
  }

  showModalDialog() {
    this.displayModal = true;
  }

  deleteCity(id: Number) {
    this.citiesService.deleteCity(this.cities.id).subscribe(() => {
      this.displayModal = false;
      alert('Deleted City');
      this.send.emit(this.cities);
    }, err => console.error(err)
    )
  }


}
