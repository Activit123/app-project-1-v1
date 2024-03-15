// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api218backend.azurewebsites.net';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/LoginCheck?providedEmail=${email}&providedPassword=${password}`);
  }
  getOrgName(orgID:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetOrganizationName?orgId=${orgID}`);
  }
  createAdmin(name:string,email:string,password:string,orgID:string): Observable<any> {
    const body = {
      "id": "string",
      "name": name,
      "email": email,
      "password": password,
      "roles": [
        "string"
      ],
      "orgId": "string",
      "depId": "string",
      "skills": [
        {
          "key": "string",
          "value": [
            "string"
          ]
        }
      ]
    }
    return this.http.post<any>(`${this.apiUrl}/AddAdminAccount?organizationId=${orgID}`,body);
  }
  createEmployee(name:string,email:string,password:string,orgID:string): Observable<any> {
    const body = {
      "id": "string",
      "name": name,
      "email": email,
      "password": password,
      "roles": [
        "string"
      ],
      "orgId": "string",
      "depId": "string",
      "skills": [
        {
          "key": "string",
          "value": [
            "string"
          ]
        }
      ]
    }
    return this.http.post<any>(`${this.apiUrl}/AddEmployee?organizationId=${orgID}`,body);
  }
  
  // Function to fetch employee details
  getEmployeeDetails(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetEmployee?employeeId=${employeeId}`);
  }
  getEmployeeOrganization(adminId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetEmployeeOrganization?employeeId=${adminId}`);
  }
  getDepartmenteName(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/DepartamentName?userId=${employeeId}`);
  }
 

}
