import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
interface AssignedSkill {
  userId: string;
  skillId: string;
  level: number;
  experience: string;
}
@Injectable({
  providedIn: 'root'
})

export class SkillService {
  
  private apiUrl = 'https://api218backend.azurewebsites.net';

  constructor(private http: HttpClient) { }

  createSkillCategory(name: any): Observable<any> {
    const body = {
      "id": "string",
      "name": name
    }
    return this.http.post<any>(`${this.apiUrl}/CreateSkillCategory`, body);
  }
  addSkillEndorsement(userID:any,skill:any,endorsementtype:string,title:string,description:string,isLink:boolean): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/AddEndorsement?userId=${userID}&skillId=${skill}&endorsementType=${endorsementtype}&title=${title}&description=${description}&isLink=${isLink}`,null);
    
  }
  updateskillEndorsement(userID:any,skill:any,title:string,description:string): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/UpdateEndorsement?userId=${userID}&skillId=${skill}&newTitle=${title}&newDescription=${description}`,null);
    
  }
  deleteSkillEndorsement(userID:any,skill:any,title:string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/DeleteEndorsement?userId=${userID}&skillId=${skill}&title=${title}`);
    
  }
  getSkillCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetSkillCategories`);
  }

  updateSkillCategory(name:any): Observable<any> {
    const body = {
      "id": "string",
      "name": name
    }
    return this.http.put<any>(`${this.apiUrl}/UpdateSkillCategory`, body);
  }

  deleteSkillCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteSkillCategory?id=${id}`);
  }

  getAllSkills(managerUserId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetOrganizationSkills?userId=${managerUserId}`);
  }
  assignSkill(userId: string, skillId: string, level: number, experience: string): Observable<any> {
    const url = `${this.apiUrl}/AssignSkill?userId=${userId}&skillId=${skillId}&level=${level}&experience=${experience}`;
  
    return this.http.post<any>(url, null) // No request body needed since data is in URL
      
  }
  deleteSkill(userId: string, skillId: string): Observable<any> {
    const url = `${this.apiUrl}/RemoveSkillFromProfile?userId=${userId}&skillId=${skillId}`;
  
    return this.http.delete<any>(url) // No request body needed since data is in URL
      
  }
  getSkillName(skillID:string):Observable<any>{
    const url = `${this.apiUrl}/GetSkillName?&skillId=${skillID}`;
  
    return this.http.get<any>(url) // No request body needed since data is in URL
  }
  createSkill(managerID:string,name:string,description:string,category:string,department:any):Observable<any>{
    const url = `${this.apiUrl}/CreateSkill?&managerUserId=${managerID}`;
    const body = {
      "id": "string",
      "name": name,
      "description": description,
      "authorID": "string",
      "categoryID": category,
      "departments":department
    }
    return this.http.post<any>(url,body) // No request body needed since data is in URL
  }
  getSkillsForDepartment(managerID:string):Observable<any>{
    const url = `${this.apiUrl}/GetSkillsForDepartment?&managerUserId=${managerID}`;
  
    return this.http.get<any>(url) // No request body needed since data is in URL
  }
  deleteSkillDep(managerID:string,skillID:string):Observable<any>{
    const url = `${this.apiUrl}/DeleteSkill?&managerUserId=${managerID}&skillId=${skillID}`;
  
    return this.http.delete<any>(url) // No request body needed since data is in URL
  }
  updateSkillDep(managerID:string,skillID:string,name:string,description:string,category:string):Observable<any>{
    const url = `${this.apiUrl}/UpdateSkill?&managerUserId=${managerID}`;
    const body = {
      "id": skillID,
      "name": name,
      "description": description,
      "authorID": "string",
      "categoryID": category,
      "departments":["string"]
    }
    return this.http.post<any>(url,body) // No request body needed since data is in URL
  }
  assignSkillToDep(managerID:string,skillID:string):Observable<any>{
    const url = `${this.apiUrl}/AssignSkillToDepartment?&managerUserId=${managerID}&skillId=${skillID}`;
  
    return this.http.post<any>(url,null) // No request body needed since data is in URL
  }
  getUnendorsedSkills(managerID:string):Observable<any>{
    const url = `${this.apiUrl}/GetSkillsNotInDepartment?departmentId=${managerID}`;
  
    return this.http.get<any>(url) // No request body needed since data is in URL
  }
  getSkillStatistics(managerID:string):Observable<any>{
    const url = `${this.apiUrl}/GetSkillsAndStatisticsForDepartment?managerUserId=${managerID}`;
  
    return this.http.get<any>(url) // No request body needed since data is in URL
  }



}
