import { SafeUrl } from "@angular/platform-browser";

export interface Employee {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    employeeImages?: EmployeeImage[];
  }
  
  export interface EmployeeImage {
    id: number;
    name: string;
    type?: string;
    picByte?: string;
    file: File;
    url?: SafeUrl;
  }
  