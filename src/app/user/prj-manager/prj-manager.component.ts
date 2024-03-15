import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillsComponent } from '../skills/skills.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../../services/authService/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../services/projectService/project.service';
import { RolesService } from '../../../services/roleService/roles.service';
import { SkillService } from '../../../services/skillService/skill.service';
interface Project {
  id?: string;
  name?: string;
  orgId?: string;
  prPeriod?: string;
  StartD?: string;
  EndD?: string;
  PrStatus?: string;
  description?: string;
  TehStack?: string[];
  projectManagerID?: string;
  customRoles?: { key: string; value: string }[];
  skillRequirements?: { key: string; value: string }[];
}

@Component({
  selector: 'app-prj-manager',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule,MatInputModule,MatDatepickerModule],
  templateUrl: './prj-manager.component.html',
  styleUrl: './prj-manager.component.css'
})
export class PrjManagerComponent implements OnInit,OnDestroy{
  projects: any;
projectss: any;

  convertDatesToText() {
    // Convert start date to text format
    this.formattedStartDate = this.startDate ? this.startDate.toDateString() : '';
    this.project.StartD = this.formattedStartDate;

    // Convert end date to text format
    this.formattedEndDate = this.endDate ? this.endDate.toDateString() : '';
    this.project.EndD = this.formattedEndDate;
  }
selectedRole: any;
  startDate!: Date;
  endDate!: Date;
  formattedStartDate!: string;
  formattedEndDate!: string;
roles:any;
addedRoles: string[] = [];
selectedSkill: any;
skills: any;
experience: any;
level: any;

onSubmit() {
  console.log(this.project);
  this.project.customRoles = this.addedRoles;
  this.convertDatesToText();
  const prjj = this.projectss[0];

  this.projectService.createProject(this.employeeDetails.id,this.project )
  .subscribe(response => {
    console.log('Project created successfully:', response);
    // Handle response as needed
  }, error => {
    console.error('Error creating projectsss:', error);
    // Handle error as needed
  });

}
addSkill() {
  if (this.selectedSkill) {
    console.log(this.selectedSkill);
    this.project.skillRequirements.push({ key: this.selectedSkill, value:this.experience });
  }
}

addRole() {
  if (this.selectedRole && !this.project.customRoles.includes(this.selectedRole)) {
    this.project.customRoles.push({key:this.selectedRole,value:2}); // Push selected role to customRoles array
  }
}
project: any = { name: '', orgId: '', prPeriod: '', StartD: '', EndD: '', PrStatus: '', description: '', projectManagerID: '', customRoles: [], skillRequirements: [] }; // Initialize project object with empty values
  constructor(private route:ActivatedRoute,private router:Router, private authService:AuthService,private skillService: SkillService,private projectService:ProjectService,private roleService:RolesService){

  }
  employeeDetails: any;
  adminId: any ;
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    console.log("intra aici");
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).
    subscribe(params =>{
      console.log("intra admin");
      this.adminId = params.get('employeeId');
      if(this.adminId){
        
        this.employeeDetails = this.authService.getEmployeeDetails(this.adminId).subscribe((data: any) => {
          // Assuming data is an array of skills
            this.employeeDetails = data;
            this.project.orgId = this.employeeDetails.orgId;
            this.project.projectManagerID = this.employeeDetails.orgId;
           this.fetchTeamRoles();
           this.viewSkills();
           
           // console.log(this.deptName);
            //this.employeeDetails.depId = this.deptName;

        });
        this.projectService.getProjects(this.adminId)
      .subscribe(data=> {
        this.projectss = data;
      }, error => {
        console.error('Error fetching projects:', error);
        // Handle error as needed
      });
      }
    });
  }
  viewSkills(): void{
   // Toggle visibility on click
    if (this.employeeDetails.id) {
      this.skillService.getAllSkills(this.employeeDetails.id)
      .subscribe((data: any) => {
        // Assuming data is an array of skills
        console.log("intra");
        this.skills = data;
        
      });
    }
  }
  fetchTeamRoles() {
    this.roleService.getCustomRolesByOrganization(this.adminId) // Replace with logic to get admin ID
      .subscribe(data => {
        console.log(data);
        this.roles = data;
      }, error => {
        console.error('Error fetching team roles:', error);
      });
  }
  ngOnDestroy(): void {
     // Unsubscribe from the subscription to avoid memory leaks
     this.unsubscribe$.next();
     this.unsubscribe$.complete();
  }

logout(): void {
  this.router.navigate(['/login']);
}

}
