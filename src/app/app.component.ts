import { Component, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; // Import NgForm and FormsModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Bill } from './models/bill/bill.model';
import { ValidationDialogComponent } from './components/validation-dialog/validation-dialog.component';
import { AddBillFormComponent } from './components/add-bill/add-bill.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BillTableComponent } from './components/bill-table/bill-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, BillTableComponent, FormsModule, MatDialogModule, ValidationDialogComponent, AddBillFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My Bills';
  bills: Bill[] = [
    new Bill('Car Bill', 'http://www.google.com', 348.99, new Date(2024, 3, 15)),
    new Bill('Subscription Bill', 'http://www.netflix.com', 27.50, new Date(2024, 3, 20)),
    new Bill('Credit Card bill', 'http://www.chase.com', 210.00, new Date(2024, 3, 25)),
    new Bill('Car Insurance', 'http://www.aaa.com', 142.57, new Date(2024, 3, 30)),
  ];

  totalAmountPaid: number = 0;
  totalAmountRemaining: number = 0;

  @ViewChild('billForm') billForm!: NgForm;

  showAddForm = false;

  constructor(private dialog: MatDialog) {
    this.updateTotalAmounts();
  }

  openAddBillForm() {
    const dialogRef = this.dialog.open(AddBillFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.errors) {
        this.dialog.open(ValidationDialogComponent, {
          data: { errors: result.errors },
        });
      } else if (result) {
        this.add(result.newBillName, result.newBillUrl, result.newBillAmount, result.newBillDueDate);
      }
    });
  }

  add(newBillTitle: string, newBillUrl: string, newBillAmount: string, newBillDueDate: string) {
    const amount = parseFloat(newBillAmount);
    const dueDate = new Date(newBillDueDate);
    this.bills.push(new Bill(newBillTitle, newBillUrl, amount, dueDate));
    this.updateTotalAmounts(); // Update totals after adding a new bill
  }

  remove(existingBill: Bill) {
    const userConfirmed = confirm(`Are you sure you want to remove the bill: ${existingBill.title}?`);

    if (userConfirmed) {
      this.bills = this.bills.filter(bill => bill !== existingBill);
      this.updateTotalAmounts(); // Update totals after removing a bill
    }
  }

  edit(bill: Bill) {
    bill.isEditing = true; // Set editing flag to true
  }

  saveBill(bill: Bill) {
    bill.isEditing = false;
    this.updateTotalAmounts(); // Update totals after saving changes
  }

  markAsPaid(bill: Bill) {
    bill.isPaid = true;
    this.updateTotalAmounts(); // Update totals after marking a bill as paid
  }

  updateTotalAmounts() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    this.totalAmountPaid = this.bills
      .filter(bill => bill.isPaid && bill.dueDate.getMonth() === currentMonth && bill.dueDate.getFullYear() === currentYear)
      .reduce((total, bill) => total + bill.amount, 0);

    this.totalAmountRemaining = this.bills
      .filter(bill => !bill.isPaid && bill.dueDate.getMonth() === currentMonth && bill.dueDate.getFullYear() === currentYear)
      .reduce((total, bill) => total + bill.amount, 0);
  }
}