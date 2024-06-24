import { Component, Inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-bill-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css'],
})
export class AddBillFormComponent {
  constructor(
    public dialogRef: MatDialogRef<AddBillFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(form.value);
    } else {
      const errors = this.getFormValidationErrors(form);
      this.dialogRef.close({ errors });
    }
  }

  getFormValidationErrors(form: NgForm): string[] {
    const errors: string[] = [];

    if (!form.controls['newBillName'].valid) {
      errors.push('Bill name is required');
    }
    if (!form.controls['newBillAmount'].valid) {
      errors.push('Amount is required and must be a valid number');
    }
    if (!form.controls['newBillDueDate'].valid) {
      errors.push('Due date is required');
    }
    if (!form.controls['newBillUrl'].valid) {
      errors.push('Valid URL is required');
    }

    return errors;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}