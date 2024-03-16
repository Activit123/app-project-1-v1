import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsComponent } from '../skills/skills.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { DepartmentService } from '../../../services/departmentService/department.service';
import { SkillService } from '../../../services/skillService/skill.service';

@Component({
  selector: 'app-dep-manager',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule],
  templateUrl: './dep-manager.component.html',
  styleUrl: './dep-manager.component.css'
})
export class DepManagerComponent implements OnInit,OnDestroy{
skillsFromOtherDeps: any;
getSkillsFromOtherDeps(){
  this.skillService.getUnendorsedSkills(this.adminId).subscribe(data=>{
    console.log(data);
    this.skillsFromOtherDeps = data;
   },error=>{
    console.log(error);
   
   });
}
assignSkillToDepartment(skillID:any) {
  if(skillID){
    this.skillService.assignSkillToDep(this.adminId,skillID).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    });
    
  }
   
}
deleteSkillDepartment(skillID: any) {
  this.skillService.deleteSkillDep(this.adminId,skillID).subscribe(data=>{
    console.log(data);
    this.getDepartmentSkills();
   },error=>{
    console.log(error);
    this.getDepartmentSkills();
   });
}
newskillCategory: any;
  
updateSkillDepartment(skillid:any) {
  this.skillService.updateSkillDep(this.adminId,skillid,this.newskillDescription,this.newskillDescription,this.newskillCategory).subscribe(data=>{
    console.log(data);
    this.getDepartmentSkills();
   },error=>{
    console.log(error);
    this.getDepartmentSkills();
   });
}
skills: any;
newskillName: any;
newskillDescription: any;
  constructor(private route:ActivatedRoute,private router:Router, private authService:AuthService,private deptService:DepartmentService,private skillService:SkillService){}
addSkillToDepartment() {
   this.skillService.createSkill(this.adminId,this.skillName,this.skillDescription,this.skillCategory,[this.employeeDetails.depId]).subscribe(data=>{
    console.log(data);
    this.getDepartmentSkills();
   },error=>{
    console.log(error);
    this.getDepartmentSkills();
   });
}
showManageSkills = false;
skillName: any;
skillDescription: any;
skillCategory: any;

toggleManageSkills() {
   this.showManageSkills = !this.showManageSkills;
}
addMember(empID: any) {
  this.deptService.manageDepartmentMembers(this.adminId,this.employeeDetails.depId,true,[empID]).subscribe(data =>{
    console.log(data);
    this.getDeptEmployees();
    this.getUnassignedEmployees();
  },error =>{
    console.log(error);
    this.getDeptEmployees();
    this.getUnassignedEmployees();
  })
}
removeMember(empID:any) {
    this.deptService.manageDepartmentMembers(this.adminId,this.employeeDetails.depId,false,[empID]).subscribe(data =>{
      console.log(data);
      this.getDeptEmployees();
    this.getUnassignedEmployees();
    },error =>{
      console.log(error);
      this.getDeptEmployees();
    this.getUnassignedEmployees();
    })
}
employeesNotAssigned: any;
toggleUnassignedDepartmentMembers() {
  this.showNotDepartmentMembers = !this.showNotDepartmentMembers;
  
}
employees: any;
showNotDepartmentMembers= false;
  logout(): void {
    this.router.navigate(['/login']);
  }
  private unsubscribe$ = new Subject<void>();
  adminId: any;
  employeeDetails: any;
  showDepartmentMembers: boolean = false;
  getDeptEmployees(){
    this.deptService.getEmployeeDepartmentMembers(this.employeeDetails.depId).subscribe(data =>{
      this.employees = data;
    },error =>{
      console.log(error);
    });
  }
  
  toggleDepartmentMembers(): void {
    this.showDepartmentMembers = !this.showDepartmentMembers;
   
    
  }

 
ngOnInit(): void {
  console.log("intra aici");
  this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).
  subscribe(params =>{
    console.log("intra departament");
    this.adminId = params.get('employeeId');
    if(this.adminId){
      
      this.employeeDetails = this.authService.getEmployeeDetails(this.adminId).subscribe((data: any) => {
        // Assuming data is an array of skills
          this.employeeDetails = data;
          this.getDeptEmployees();
          this.getUnassignedEmployees();
          this.getDepartmentSkills();
          this.getSkillsFromOtherDeps()
         // console.log(this.deptName);
          //this.employeeDetails.depId = this.deptName;

      });
    }
  });
}
getDepartmentSkills(){
  this.skillService.getSkillsForDepartment(this.adminId).subscribe(data=>{
    this.skills = data;
    console.log(this.skills);
  },error=>{
    console.log(error);
  });
}
getUnassignedEmployees(){
  this.deptService.getUsersWithoutDepartment(this.employeeDetails.orgId).subscribe(data=>{
    this.employeesNotAssigned = data;
  },error=>{
    console.log(error);
  })
}
ngOnDestroy(): void {
   // Unsubscribe from the subscription to avoid memory leaks
   this.unsubscribe$.next();
   this.unsubscribe$.complete();
}
}
