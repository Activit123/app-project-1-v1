import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { SkillsComponent } from '../../skills/skills.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; // Import MatDialogRef and MAT_DIALOG_DATA
import { AuthService } from '../../../../services/authService/auth.service';
import { SkillService } from '../../../../services/skillService/skill.service';
import { ProjectService } from '../../../../services/projectService/project.service';
import { RolesService } from '../../../../services/roleService/roles.service';
@Component({
  selector: 'app-update-project-popup',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule,MatInputModule,MatDatepickerModule,NgxPaginationModule],
  templateUrl: './update-project-popup.component.html',
  styleUrl: './update-project-popup.component.css'
})
export class UpdateProjectPopupComponent {
addCustomRole() {
throw new Error('Method not implemented.');
}
adminId: any;
createProject() {
throw new Error('Method not implemented.');
}
addSkillRequirement() {
throw new Error('Method not implemented.');
}
selectedRole: any;
roles: any;
roleNumber: any;
skills: any;
selectedSkill: any;
level: any;
delete() {
    
}
  updatedProject: any; // Holds the updated project data

  constructor(
    private dialog: MatDialog,private route:ActivatedRoute,private router:Router, private authService:AuthService,private skillService: SkillService,private projectService:ProjectService,private roleService:RolesService,public dialogRef: MatDialogRef<UpdateProjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updatedProject = { ...data.project };
    this.skills = {...data.skills}
    this.roles = {...data.roles} // Copy the project data
  }

  update() {
    // Implement update logic here
    console.log("Updated Project:", this.updatedProject);
    this.dialogRef.close(); // Close the modal popup
  }

  close() {
    this.dialogRef.close(); // Close the modal popup
  }
  yourData = {
    addedRoles: [] as { key: string, value: string }[],
    addedSkills: [] as { key: string, value: string}[]
  };
 /* viewSkills(): void{
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
   }*/
}