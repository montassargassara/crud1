import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  editMode: boolean = false;

  constructor(
  private snackBar: MatSnackBar,
  private _fb: FormBuilder,
  private _empService: EmployeeService,
  private _dialogRef: MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService: CoreService
) { 
  console.log('Data passed to dialog:', data);
  this.empForm = this._fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
  });

  if (data && data.employee) {
    this.editMode = true;
    this.empForm.patchValue(data.employee);
  }
}
  ngOnInit(): void {}

  imageFiles: File[] = [];
  onFileSelected(event: any): void {
    this.imageFiles = event.target.files;
  }

  showSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top

    this.snackBar.open('Formation Ajoutée!', 'Close', config);
  }

  addEmployee(employeeData: Employee, imageFiles: File[]): void {
    console.log('Employee Data:', employeeData);
    console.log('Image Files:', imageFiles);
    // Call the service method to add the offer
    this._empService.addEmployee(employeeData, imageFiles)
      .subscribe(response => {
        if (response){
        this.showSuccessMessage();
        // Handle success, if needed
        this._dialogRef.close();
        location.reload();}
      }, error => {
        console.error('Error adding employee:', error);
        // Handle error, if needed
      });
  
}
editEmployee(employeeData: Employee, imageFiles: File[]): void {
  console.log(employeeData)
  if (!employeeData || !employeeData.id) {
    console.error('Invalid employee data');
    return;
  }

  this._empService.updateEmployee(employeeData.id, employeeData, imageFiles).subscribe({
    next: (val: any) => {
      this._coreService.openSnackBar('Employee detail updated!');
      this._dialogRef.close(true);
    },
    error: (err: any) => {
      console.error(err);
    },
  });
}


  onFormSubmit(): void {
    if (this.empForm.valid) {
      const employeeData = this.empForm.value;
      if (this.editMode) {
        this.editEmployee(employeeData, this.imageFiles);
      } else {
        this.addEmployee(employeeData, this.imageFiles);
      }
    }
  }
}
