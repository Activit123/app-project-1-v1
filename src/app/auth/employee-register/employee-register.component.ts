import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsComponent } from '../../user/skills/skills.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { EmpIdService } from '../../../services/idService/emp-id.service';
import { EmployeeDetailsService } from '../../../services/detailsService/employee-details.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-register',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css'
})
export class EmployeeRegisterComponent implements OnInit,OnDestroy {
orgDetails: any;
message: any;
  constructor(private authService: AuthService,
    private empIdService: EmpIdService,
    private employeeDetailsService: EmployeeDetailsService,
    private router: Router,private route: ActivatedRoute){}
orgName:any;
empName: any;
empEmail: any;
empPassword: any;
orgID:any
login() {
  this.router.navigate(['/login']);
}
register() {
  if(this.orgID){
   this.authService.createEmployee(this.empName,this.empEmail,this.empPassword,this.orgID).subscribe(data=>{
    console.log(data);
    this.message = "Register Succesful";
   },error=>{
    console.log(error);
    this.message = "Error on registration"
   });
  }
}
signupForm: any;
private unsubscribe$ = new Subject<void>();
ngOnInit() {

  // Retrieve query parameters from the activated route
  this.route.paramMap.
  pipe(takeUntil(this.unsubscribe$)).
  subscribe(params => {
    console.log("intra");
    this.orgID = params.get('orgId');
    console.log(this.orgID);
    this.authService.getOrgName(this.orgID).subscribe(data=>{
      console.log(data);
      this.orgName = JSON.parse(data);
    },error=>{
      console.log(error);
    })
    
  });

  // Subscribe to changes in employeeDetails 
}

ngOnDestroy(){
  // Unsubscribe from the subscription to avoid memory leaks
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
