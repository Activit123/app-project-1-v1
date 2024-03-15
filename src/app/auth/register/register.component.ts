import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
orgDetails: any;
message: any;

  signupForm=this.formBuilder.nonNullable.group({
    name:['',Validators.required],
    address:['',Validators.required]
  })

 
  signupResponse: string = ''; // Property to store the response message
  showTableView: boolean = true; // Toggle variable for table view
empName: any;
empEmail: any;
empPassword: any;
orgName: any;
orgAddress: any;
orgId:any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router,private authService:AuthService) {}
  login() {
    this.router.navigate(['/login']);
  }
  register() {
   

    const organizationData ={
      "id": "string",
      "name": this.orgName,
      "address": this.orgAddress
    }
    this.http.post<any>('https://api218backend.azurewebsites.net/AddOrganization', organizationData)
      .subscribe(
        response => {
          console.log('Organization signup successful:', response);
          
          // Refresh organization details after signup
         // this.loadOrganizationDetails();
        },
        error => {
          console.error('Error signing up organization:', error);
          // Set the error message to display on the label
          this.signupResponse = 'Error signing up organization. Please try again.';
          this.orgId = error.id;
          // Set the response message to display on the label
          this.signupResponse = error.id;
          if(this.orgId){
            this.authService.createAdmin(this.empName,this.empEmail,this.empPassword,this.orgId).subscribe(data=>{
             console.log(data);
             this.message = "Register Succesful";
            },error=>{
             console.log(error);
             this.message = "Error on registration"
            });
           }
        }
      );
  }
}
