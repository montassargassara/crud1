import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  
  constructor(private http: HttpClient) {}

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8082/emp/getEmployeeByID/${id}`);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(`http://localhost:8082/emp/AllEmployees`);
  }

  addEmployee(employeeData: any, imageFiles: File[]): Observable<any> {
    const formData: FormData = new FormData();
  
    // Append employee data as a JSON string
    formData.append('employee',   new Blob([JSON.stringify(employeeData)], { type: 'application/json' }))
  
    // Append each image file
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append(`imagePath`, imageFiles[i]);
    }
    console.log('FormData:', formData);
  //console.log(employeeData)
  //console.log(imageFiles)
  const headers = new HttpHeaders();
    // Do not set the Content-Type header; HttpClient will set it automatically for FormData.
    return this.http.post<Employee>('http://localhost:8082/emp/addEmployee', formData);
  }
  
  updateEmployee(id: number, employeeData: Employee, imageFiles: File[]): Observable<Employee> {
    const formData: FormData = new FormData();
  
    // Append employee data as a JSON string
    formData.append('employee', new Blob([JSON.stringify(employeeData)], { type: 'application/json' }))
  
    // Append each image file
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append(`imagePath`, imageFiles[i]);
    }
    
    return this.http.put<Employee>(`http://localhost:8082/emp/updateEmployee/${id}`, formData);
  }
  
  
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8082/emp/deleteEmployeeById/${id}`);
  }

  searchByGender(gender: string): Observable<any> {
    return this.http.get(`http://localhost:8082/emp/searchByGender/${gender}`);
  }

  searchByTeam(team: string): Observable<any> {
    return this.http.get(`http://localhost:8082/emp/searchByTeam/${team}`);
  }

  searchByBirthDateRange(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`http://localhost:8082/emp/searchByBirthDateRange/${startDate}/${endDate}`);
  }

  searchByBirthYear(year: number): Observable<any> {
    return this.http.get(`http://localhost:8082/emp/searchByBirthYear/${year}`);
  }
}