import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Register } from '../../interface/register';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
    register: Register = {
        username: '',
        password: '',
        role: ''
    }
    state: string = '';
    idtaken = false;
    error: any;
    dataLoading: boolean = false;
    brokenNetwork = false;
    savedChanges = false;
    data;
    private querySubscription;

    constructor(private registerService: RegisterService, private router: Router) {
    }

    // routeLoginPage() {
    //     this.router.navigate(['/login']);
    // }

    onRegister() {
        this.querySubscription = this.registerService.createUser(this.register).subscribe(res => {
            if (res.data["addUser_M"]["email"] != "") {
                this.idtaken = false;
                this.savedChanges = true;
                this.dataLoading = false;
            } else {
                this.idtaken = true;
                this.dataLoading = false;
            }
        },
            (error) => {
                this.error = error;
                this.brokenNetwork = true;
            },
            () => {
                this.error = false;
                this.dataLoading = false;
                this.brokenNetwork = false;
            }
        );
    }
    ngOnDestroy() {
        // this is not needed when mydata observable is used, in this case, we are registering user on subscription, this is why it's called
        // if (this.querySubscription) {
        //     this.querySubscription.unsubscribe();
        // }
    }
}