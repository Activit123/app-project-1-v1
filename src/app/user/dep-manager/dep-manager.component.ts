import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsComponent } from '../skills/skills.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { DepartmentService } from '../../../services/departmentService/department.service';
import { SkillService } from '../../../services/skillService/skill.service';
import { MemberAssignmentService } from '../../../services/teamAssignment/member-assignment.service';
import { TeamFinderServiceService } from '../../../services/teamFinderService/team-finder-service.service';
import Chart from 'chart.js/auto';
import { StatisticsPopupComponent } from './statistics-popup/statistics-popup.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-dep-manager',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule],
  templateUrl: './dep-manager.component.html',
  styleUrl: './dep-manager.component.css'
})
export class DepManagerComponent implements OnInit,OnDestroy{
notificationCount: any;
showSkillsStatisticsPopup() {
  this.skillService.getSkillStatistics(this.employeeDetails.id).subscribe(
    (dataa: any) => {
      const dialogRef = this.dialog.open(StatisticsPopupComponent, {
        width: '500px',
        data: dataa
      });
    },
    (error) => {
      console.error('Error fetching skill statistics:', error);
    }
  );
}
showSkillsStatistics() {
this.showSkillsStatisticsSection = !this.showSkillsStatisticsSection;
}
  proposedEmployee:any;
comment: any;
teamid:any;
showSkillsStatisticsSection =false;
confirmProposal(arg0: any, type: any, comment: any) {
  this.proposedEmployee = arg0;
  console.log("Comment:", comment);
  this.proposedEmployee.comment = comment;
  console.log("Type:", type);
  this.proposedEmployee.type = type;
  console.log("Proposed Employee:", this.proposedEmployee);

  this.assignmentProposalService.updateDeleteAssignmentProposal(
    this.proposedEmployee.userID,
    this.proposedEmployee.id,
    this.proposedEmployee.projectID,
    this.proposedEmployee.workHours,
    this.proposedEmployee.customRoles,
    this.proposedEmployee.comment,
    type
  ).subscribe(
    (data) => {
      console.log("Update/Delete Proposal Data:", data);
      this.handleAdditionalOperations(type);
    },
    (error) => {
      console.log("Update/Delete Proposal Error:", error);
      this.loadAssignmentProposals();
    }
  );
}
skillStatistics: any[] = []; // Array to store skill statistics data
totalCountChart: any;
levelCharts: any[] = [];
fetchSkillStatistics(): void {
  this.skillService.getSkillStatistics(this.adminId).subscribe(
    (data: any) => { // Explicitly specify the type of data as any
      this.skillStatistics = Object.entries(data).map(([skillName, stats]: [string, any]) => ({
        skillName,
        totalCount: stats.TotalUsers,
        levelCounts: [stats.Level1, stats.Level2, stats.Level3, stats.Level4, stats.Level5]
      }));
      this.createTotalCountPieChart();
      this.createLevelBasedPieCharts();
    },
    (error) => {
      console.error('Error fetching skill statistics:', error);
    }
  );
}

createTotalCountPieChart(): void {
  const totalCountData = this.skillStatistics.map(skill => skill.totalCount);
  const labels = this.skillStatistics.map(skill => skill.skillName);
  const ctx = document.getElementById('totalCountPieChart') as HTMLCanvasElement;
  this.totalCountChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: totalCountData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ]
      }]
    }
  });
}

createLevelBasedPieCharts(): void {
  this.skillStatistics.forEach((skill, index) => {
    const levelData = skill.levelCounts;
    const labels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
    const ctx = document.getElementById(`level${index + 1}PieChart`) as HTMLCanvasElement;
    const levelChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: levelData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ]
        }]
      }
    });
    this.levelCharts.push(levelChart);
  });
}
handleAdditionalOperations(type: any) {
  if (type) {
    console.log("Project ID:", this.proposedEmployee.projectID);
    this.teamService.getTeamForProject(this.proposedEmployee.projectID).subscribe(
      (data) => {
        console.log("Team Data:", data);
        console.log("Inside get team");
        this.teamid = data[0].id; // Initialize to empty object if data is null
        console.log("Team ID:", this.teamid);
        this.updateTeam(this.teamid);
      },
      (error) => {
        console.log("Get Team Error:", error);
        this.loadAssignmentProposals();
      }
    );
  }
}

updateTeam(teamid:any) {
  const teami = teamid;
  console.log("Team ID:", teami); // Logging here to ensure this.teamid is defined
  this.teamService.updateTeamForProject(
    this.proposedEmployee.projectID,
    teami,
    this.proposedEmployee.userID,
    this.proposedEmployee.workHours,
    this.proposedEmployee.customRoles
  ).subscribe(
    (data) => {
      console.log("Update Team Data:", data);
      this.loadAssignmentProposals();
    },
    (error) => {
      console.log("Update Team Error:", error);
    }
  );
}


showAssignmentProposals: boolean = false;
assignmentProposals:any // Initialize with empty array

selectedSkillCategoryUpdate: any;
type: any;
toggleAssignmentProposals(): void {
  this.showAssignmentProposals = !this.showAssignmentProposals;
  // Load assignment proposals if needed when the section is opened
  if (this.showAssignmentProposals) {
    this.loadAssignmentProposals();
  }
}
  loadAssignmentProposals() {
    this.assignmentProposalService.getProposalsByDepartment(this.employeeDetails.depId).subscribe(data=>{
      console.log(data);
      this.assignmentProposals = data;
      this.notificationCount = this.assignmentProposals.length;
    },error=>{
      console.log(error);
    })
  }
addSkillCategory() {
    this.skillService.createSkillCategory(this.skillCategoryy).subscribe(data=>{
      console.log(data);
      this.getSkillCategories();
     },error=>{
      this.getSkillCategories();
     
     });
}
skillsFromOtherDeps: any;
skillCategoryy: any;
  skillCategories!: any[];
selectedSkillCategory: any;
getSkillsFromOtherDeps(){
  this.skillService.getUnendorsedSkills(this.employeeDetails.userID).subscribe(data=>{
    console.log(data);
    this.skillsFromOtherDeps = data;
   },error=>{
    console.log(error);
   
   });
}
async getSkillCategories() {
  this.skillService.getSkillCategories().subscribe(data=>{
    this.skillCategories = data;
  },error=>{
    console.log()
  });
}
assignSkillToDepartment(skillID:any) {
  if(skillID){
    this.skillService.assignSkillToDep(this.adminId,skillID).subscribe(data=>{
      console.log(data);
      this.getSkillsFromOtherDeps();
      this.getDepartmentSkills();
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
  this.skillService.updateSkillDep(this.adminId,skillid,this.newskillName,this.newskillDescription,this.selectedSkillCategoryUpdate.name).subscribe(data=>{
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
  constructor(private dialog: MatDialog,private teamService:TeamFinderServiceService, private route:ActivatedRoute,private assignmentProposalService:MemberAssignmentService, private router:Router, private authService:AuthService,private deptService:DepartmentService,private skillService:SkillService){}
addSkillToDepartment() {
   this.skillService.createSkill(this.adminId,this.skillName,this.skillDescription,this.selectedSkillCategory.name,[this.employeeDetails.depId]).subscribe(data=>{
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
          this.getSkillCategories();
          this.fetchSkillStatistics();
          this.loadAssignmentProposals();
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
