import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'https://api218backend.azurewebsites.net';
  getOrganizationDepartments(adminID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetOrganizationDepartments?userId=${adminID}`);
  }
  addDepartment(adminID: string,deptName:string): Observable<any> {
    const body = {
      "id": "string",
      "name": "string",
      "orgId": "string",
      "managerId": "not yet assigned"
    }
    return this.http.post<any>(`${this.apiUrl}/AddDepartment?userId=${adminID}&department_name=${deptName}`,body);
  }
  updateDepartment(adminID: string,deptID:string,newDeptName:string): Observable<any> {
    const body = {
      "id": "string",
      "name": "string",
      "orgId": "string",
      "managerId": "not yet assigned"
    }
    return this.http.put<any>(`${this.apiUrl}/UpdateDepartment?userId=${adminID}&departmentId=${deptID}&department_name=${newDeptName}`,body);
  }
  deleteDepartment(adminID: string,deptID:string): Observable<any> {
    const body = {
      "id": "string",
      "name": "string",
      "orgId": "string",
      "managerId": "not yet assigned"
    }
    return this.http.delete<any>(`${this.apiUrl}/DeleteDepartment?userId=${adminID}&departmentId=${deptID}`);
  }
  assignDepartmentManager(adminID: string,deptID:string,newDeptManagerId:string): Observable<any> {
    const body = {
      "id": "string",
      "name": "string",
      "orgId": "string",
      "managerId": "not yet assigned"
    }
    return this.http.put<any>(`${this.apiUrl}/AssignDepartmentManager?adminUserId=${adminID}&departmentId=${deptID}&newManagerUserId=${newDeptManagerId}`,body);
  }
  getEmployeeDepartmentMembers(deptID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetEmployeeDepartmentMembers?departmentId=${deptID}`);
  }
  manageDepartmentMembers(depManagerId: string,depID:string,addOrRemove:boolean,members:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ManageDepartmentMembers?managerUserId=${depManagerId}&departmentId=${depID}&addMembers=${addOrRemove}`,members);
  }
  getUsersWithoutDepartment(orgId:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetUsersWithoutDepartment?orgId=${orgId}`);
  }
}
