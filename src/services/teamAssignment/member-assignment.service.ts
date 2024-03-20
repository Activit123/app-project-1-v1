import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberAssignmentService {


  private apiUrl = 'https://api218backend.azurewebsites.net';

  constructor(private http: HttpClient) { }

  assignmentProposal(managerUserId: string, projectId: string, workHours: number, customRoles: string[], comments: string): Observable<any> {
    console.log("managerUserId");

    const url = `${this.apiUrl}/AssignmentProposal?managerUserId=${managerUserId}&projectId=${projectId}&workHours=${workHours}&comments=${comments}`;
    return this.http.post<any>(url,customRoles);
  }
 
  updateDeleteAssignmentProposal(managerUserId: string, proposalId: string, projectId: string, workHours: number, customRoles: string[], comments: string, type: boolean): Observable<any> {
    const data = { managerUserId, proposalId, projectId, workHours, customRoles, comments, type };
    const url = `${this.apiUrl}/UpdateDeleteAssignmentProposal?managerUserId=${managerUserId}&proposalId=${proposalId}&projectId=${projectId}&workHours=${workHours}&comments=${comments}&type=${type}`;
    return this.http.post<any>(url,customRoles);
  }

  getProposalsByDepartment(departmentId: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/GetProposalsByDepartment?departmentId=' + departmentId);
  }

  deallocationProposal(managerUserId: string, projectId: string, reason: string): Observable<any> {
    const data = { managerUserId, projectId, reason };
    const url = `${this.apiUrl}/DeallocationProposal?managerUserId=${managerUserId}&projectId=${projectId}&reason=${reason}`;
    return this.http.post<any>(url,null);
  }

  updateDeleteDeallocationProposal(managerUserId: string, proposalId: string,projectID:string, reason: string, type: boolean): Observable<any> {
    const url = `${this.apiUrl}/UpdateDeleteDeallocationProposal?managerUserId=${managerUserId}&projectId=${projectID}&proposalId=${proposalId}&reason=${reason}&type=${type}`;
    return this.http.post<any>(url,null);
  }
}
