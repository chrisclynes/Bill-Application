import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bill } from '../../models/bill/bill.model';
import { DatePipe, CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-row',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, MatButtonModule, MatInputModule], // Include FormsModule and Angular Material modules here
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.css'],
  providers: [DatePipe],
})
export class EditRowComponent {
  @Input() bill: Bill = new Bill('', '', 0, new Date()); // Default initialization
  @Output() save: EventEmitter<Bill> = new EventEmitter<Bill>();
  
  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<EditRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bill = data.bill;
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || ''; // Transform the date to string
  }
  
  onTitleChange(value: string) {
    this.bill.title = value;
  }

  onAmountChange(value: string) {
    this.bill.amount = parseFloat(value);
  }

  onDueDateChange(value: string) {
    this.bill.dueDate = new Date(value); // Convert the input string to a Date object
  }

  onSave() {
    this.save.emit(this.bill); // sends event up to parent
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
