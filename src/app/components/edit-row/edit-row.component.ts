import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Bill } from '../../models/bill/bill.model';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-row',
  standalone: true,
  imports: [FormsModule, CommonModule], // Include FormsModule here
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.css'],
  providers: [DatePipe],
})
export class EditRowComponent {
  @Input() bill: Bill = new Bill('', '', 0, new Date()); // Default initialization
  @Output() save: EventEmitter<Bill> = new EventEmitter<Bill>();
  constructor(private datePipe: DatePipe) {}

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
    this.save.emit(this.bill); //sends event up to parent
    this.bill.isEditing = false;
  }
  onCancel() {
    this.bill.isEditing = false;
  }
}