import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { Cities } from 'src/app/interface/cities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss']
})
export class SaveModalComponent implements OnInit {
  @Output() send = new EventEmitter<any>(); 
  
  displayModal: boolean;
  citiesForm: FormGroup;
  cities: Cities = {
    id: 0,
    city: '',
    country: '',
    continent: ''
  }
  constructor(public formbuilder: FormBuilder, private citiesService: CitiesService) {
    //validate form
    this.citiesForm = this.formbuilder.group({
      id: 0,
      city: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      continent: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
  }

  showModalDialog() {
    this.displayModal = true;
  }

  saveCity(): void {
    if (this.citiesForm.valid) {
      this.citiesService.saveCity(this.citiesForm.value).subscribe(() => {
        this.displayModal = false;
        alert('Saved city');
        this.send.emit(this.cities);
      }, error => {
        console.error(error)
      });
    }
  }

  get city() { return this.citiesForm.get('city'); }
  get country() { return this.citiesForm.get('country'); }
  get continent() { return this.citiesForm.get('continent'); }

}
