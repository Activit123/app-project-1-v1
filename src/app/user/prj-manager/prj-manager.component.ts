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
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateProjectPopupComponent } from './update-project-popup/update-project-popup.component';
import { TeamFinderPopupComponent } from './team-finder-popup/team-finder-popup.component';
import { TeamFinderServiceService } from '../../../services/teamFinderService/team-finder-service.service';
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
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule,MatInputModule,MatDatepickerModule,NgxPaginationModule,MatDialogModule],
  templateUrl: './prj-manager.component.html',
  styleUrl: './prj-manager.component.css'
})
export class PrjManagerComponent implements OnInit,OnDestroy{
projectUsers: any;
notificationCount: any;
createTeam(projectID:any) {
const projectid = projectID;
this.teamFindService.createTeamForProject(projectid).subscribe(data=>{
  console.log(data);
  this.showTeamMembers(projectID);
},error=>{
  console.log(error);
  this.showTeamMembers(projectID);
})
}
showTeamMembers(id:any){
  const prjid = id;
  this.teamFindService.getTeamForProject(prjid).subscribe(data=>{
    this.projectUsers = data;
    console.log(data);
  },error=>{
    console.log(error);
  });
}
assignmentProposals: any;
showProjectTeam: any;
projectTeam: any;
showAssignmentProposals: any;
confirmProposal(_t160: any) {
throw new Error('Method not implemented.');
}
toggleProjectTeam(arg:any) {
this.showProjectTeam = !this.showProjectTeam;
const prjid = arg;
console.log(prjid);
this.showTeamMembers(prjid);
}
toggleAssignmentProposals() {
this.showAssignmentProposals = !this.showAssignmentProposals;
}
  openTeamFinderPopup(orgID:any,adminId: string, project: any): void {
    if(orgID){
      const dialogRef = this.dialog.open(TeamFinderPopupComponent, {
        width: '300px', // Adjust width as needed
        data: { adminId, project,orgID } // Pass adminId and project data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // Handle result if needed
      });
    }
   
  }
deleteProject(_t160: any) {
throw new Error('Method not implemented.');
}
updateProject(_t160: any) {
throw new Error('Method not implemented.');
}
  pagedProjects: any[] = [];
currentPage: number = 1; // Current page number
itemsPerPage: number = 10; // Number of items per page
onPageChange(pageNumber: number) {
  this.setPage(pageNumber);
}
setPage(pageNumber: number) {
  // Ensure the requested page number is within valid bounds
  if (pageNumber < 1 || pageNumber > Math.ceil(this.projectss.length / this.itemsPerPage)) {
    return;
  }

  this.currentPage = pageNumber;
  // Calculate start and end index of items for the selected page
  const startIndex = (pageNumber - 1) * this.itemsPerPage;
  const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.projectss.length - 1);
  // Slice the projects array to get the items for the selected page
  this.pagedProjects = this.projectss.slice(startIndex, endIndex + 1);
}
projectName = "";
projectPeriod ="";
projectStatus ="";
projectDescription=""
techStack = "";

toggleProjectDetails() {
this.showProjectDetails = !this.showProjectDetails;
}
showCreateProject=false;
showProjectDetails=false;
toggleCreateProject() {
this.showCreateProject = !this.showCreateProject;
}
roleNumber: any;
addSkillRequirement() {
  const exists = this.yourData.addedSkills.some(skill => skill.key === this.selectedSkill);
  
  // If the skill doesn't exist, add it to the array
  if (!exists) {
    this.yourData.addedSkills.push({ key: this.selectedSkill, value: this.level });
  }
}
removeSkillRequirement(_t118: number) {
throw new Error('Method not implemented.');
}
addCustomRole() {
  const exists = this.yourData.addedRoles.some(role => role.key === this.selectedRole);
  
  // If the role doesn't exist, add it to the array
  if (!exists) {
    this.yourData.addedRoles.push({ key: this.selectedRole, value: this.roleNumber });
  }
}
removeCustomRole(_t95: number) {
throw new Error('Method not implemented.');
}
  projects: any;
projectss: any[] = [];
;
customRole: any;
number: any;
selectedPeriod: any;
selectedStatus: any;

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
 yourData = {
  addedRoles: [] as { key: string, value: string }[],
  addedSkills: [] as { key: string, value: string}[]
};
//addedRoles: any[] = [];
//addedSkills: any[] = [];
selectedSkill: any;
skills: any;
experience: any;
level: any;
openUpdateProjectPopup(project: any,skills:any,roles:any) {
  this.viewSkills();
  this.fetchTeamRoles();
  this.viewProjects();
  // Open the modal popup
  skills = this.skills;
  roles = this.roles;
  const admin = this.adminId;
  const dialogRef = this.dialog.open(UpdateProjectPopupComponent, {
    width: '400px', // Adjust the width as needed
    data: { project,skills,roles,admin}
   // Pass project data to the popup component
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log("intra");
    this.ngOnInit();
  });
  console.log("intra aici");
 
}
onSubmit() {
  console.log(this.project);
 // this.project.customRoles = this.addedRoles;
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
  if (this.selectedRole) {
    this.project.customRoles.push({key:this.selectedRole,value:2}); // Push selected role to customRoles array
  }
}
employeeDetails: any = "";

project: any = { name: '', orgId: '', prPeriod: '', StartD: '', EndD: '', PrStatus: '', description: '', projectManagerID: '', customRoles: [], skillRequirements: [] }; // Initialize project object with empty values
  constructor(private dialog: MatDialog,private route:ActivatedRoute,private router:Router, private authService:AuthService,private teamFindService:TeamFinderServiceService, private skillService: SkillService,private projectService:ProjectService,private roleService:RolesService){

  }

  adminId: any ;
  private unsubscribe$ = new Subject<void>();
  createProject() {
    const projec = {
      "id": "string",
      "name": this.projectName,
      "orgId": this.employeeDetails.orgId,
      "prPeriod": this.projectPeriod,
      "startD": this.startDate,
      "endD": this.endDate,
      "prStatus": this.projectStatus,
      "description": this.projectDescription,
      "tehStack": [
        this.techStack
      ],
      "projectManagerID": this.employeeDetails.id,
      "customRoles": this.yourData.addedRoles,
      "skillRequirements": this.yourData.addedSkills
    }
    console.log(projec);
    this.projectService.createProject(this.adminId,projec).subscribe(data=>{
      console.log(data);
      this.showCreateProject = !this.showCreateProject;
      this.viewProjects();
    },error=>{
      console.log(error);
    })
  }
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
           this.viewProjects();
           // console.log(this.deptName);
            //this.employeeDetails.depId = this.deptName;

        });
       
      }
    });
  }
  viewProjects(){
    this.projectService.getProjects(this.adminId)
      .subscribe(data=> {
        this.projectss = data;
        this.setPage(this.currentPage);
      }, error => {
        console.error('Error fetching projects:', error);
        // Handle error as needed
      });
  }
  viewSkills(): void{
   // Toggle visibility on click
    if (this.employeeDetails.id) {
      this.skillService.getAllSkills(this.employeeDetails.orgId)
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
