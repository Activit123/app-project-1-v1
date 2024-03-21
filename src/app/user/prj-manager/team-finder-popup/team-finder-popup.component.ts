import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/authService/auth.service';
import { SkillService } from '../../../../services/skillService/skill.service';
import { ProjectService } from '../../../../services/projectService/project.service';
import { RolesService } from '../../../../services/roleService/roles.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgIf } from '@angular/common';
import { SkillsComponent } from '../../skills/skills.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { TeamFinderServiceService } from '../../../../services/teamFinderService/team-finder-service.service';
import { MemberAssignmentService } from '../../../../services/teamAssignment/member-assignment.service';
@Component({
  selector: 'app-team-finder-popup',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule,MatInputModule,MatDatepickerModule,NgxPaginationModule,MatDialogModule],
  templateUrl: './team-finder-popup.component.html',
  styleUrl: './team-finder-popup.component.css'
})
export class TeamFinderPopupComponent implements OnInit{
showTextArea = false;
textAreaInput: any;
updateInputState(arg0: any) {
throw new Error('Method not implemented.');
}
comment: any;
isInputActive= false;
addCustomRole() {
  if(this.selectedRole){
    for(let role of this.comparedRole){
      if(role.name === this.selectedRole){
        this.roles.push(role.id);
      }
    }
    
  }
  
}
selectedRole: any;
closePopup() {
  this.dialogRef.close(true);
}
employees: any;
workhours:any;
weeksOptions: number[] = [2, 3, 4, 5, 6];
comparedRole:any;
roles:any = [];
userID:any;
fetchTeamRoles() {
  this.roleService.getCustomRolesByOrganization(this.data.project.projectManagerID ) // Replace with logic to get admin ID
    .subscribe(data => {
      console.log(data);
      this.comparedRole = data;
    }, error => {
      console.error('Error fetching team roles:', error);
    });
}
assignmentProposal(empID: any) {
    console.log(empID);
    this.userID = empID;
   this.assignmentProposalService.assignmentProposal(this.userID,this.data.project.id,this.workhours,this.roles,this.comment).subscribe(data=>{
    console.log(data);
   },error=>{
    console.log(error);
   });
}
findTeam(enabled:boolean,prompt:any) {
 if(!enabled){
  this.employees = null;
  console.log(this.data);
  this.teamfinder.teamFinder(this.data.orgID,
    this.data.project.id,
    this.includePartiallyAvailable,
    this.weeksToProjectCompletion,
    this.includeUnavailable,
    this.includeCloseToFinish).subscribe(data=>{
      this.employees = data;
      this.fetchTeamRoles();
      console.log(data);
    },error=>{
      console.log(error);
    });
    console.log("iese");
 }else{
  this.employees = null;
  const p = prompt;
  console.log(this.data.orgID);
  console.log(this.data.project.id);
  console.log(p);
  this.teamfinder.teamFinderAI(this.data.orgID,this.data.project.id,p).subscribe(data=>{
    
    console.log(data);
    this.employees = data;
      this.fetchTeamRoles();
  },error=>{
    console.log(error);
  })
 }
 
}
  includePartiallyAvailable: boolean = false;
  weeksToProjectCompletion: number = 0;
  includeUnavailable: boolean = false;
  includeCloseToFinish: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private assignmentProposalService:MemberAssignmentService, private dialog: MatDialog,private route:ActivatedRoute,private router:Router,public dialogRef: MatDialogRef<TeamFinderPopupComponent>, private authService:AuthService,private skillService: SkillService,private projectService:ProjectService,private roleService:RolesService,private teamfinder:TeamFinderServiceService) {
    // Access passed data here
    console.log(this.data);
  }
  ngOnInit(): void {
    
  }
 
}
