import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bill } from './models/bill/bill.model';
import { ValidationDialogComponent } from './components/validation-dialog/validation-dialog.component';
import { AddBillFormComponent } from './components/add-bill/add-bill.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BillTableComponent } from './components/bill-table/bill-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, BillTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My Bills';
  bills: Bill[] = [
    new Bill('Car Bill', 'https://www.google.com', 348.99, new Date(2024, 7, 15)),
    new Bill('Netflix Subscription', 'https://www.netflix.com', 27.99, new Date(2024, 6, 20)),
    new Bill('Credit Card bill', 'https://www.chase.com', 110.01, new Date(2024, 6, 25)),
    new Bill('Car Insurance', 'https://www.aaa.com', 119.99, new Date(2024, 6, 30)),
  ];

  totalAmountPaid: number = 0;
  totalAmountRemaining: number = 0;

  showAddForm = false;

  constructor(private dialog: MatDialog) {
    this.sortBillsByDueDate();
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
    const newBill = new Bill(newBillTitle, newBillUrl, amount, dueDate);
    this.checkBillDueDate(newBill);
    this.bills.push(newBill);
    this.sortBillsByDueDate();
    this.updateTotalAmounts(); // Update totals after adding a new bill
  }

  remove(existingBill: Bill) {
    const userConfirmed = confirm(`Are you sure you want to remove the bill: ${existingBill.title}?`);

    if (userConfirmed) {
      this.bills = this.bills.filter(bill => bill !== existingBill);
      this.sortBillsByDueDate();
      this.updateTotalAmounts(); // Update totals after removing a bill
    }
  }

  edit(bill: Bill) {
    bill.isEditing = true; // Set editing flag to true
  }

  saveBill(bill: Bill) {
    bill.isEditing = false;
    this.checkBillDueDate(bill);
    this.sortBillsByDueDate();
    this.updateTotalAmounts(); // Update totals after saving changes
  }

  markAsPaid(bill: Bill) {
    bill.isPaid = true;
    bill.isDue = false;
    bill.isPastDue = false;
    this.sortBillsByDueDate();
    this.updateTotalAmounts(); // Update totals after marking a bill as paid
  }

  checkBillDueDate(bill: Bill) {
    if (bill.isPaid) {
      bill.isDue = false;
      bill.isPastDue = false;
      return;
    }

    const currentDate = new Date();
    const timeDifference = bill.dueDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    bill.isDue = daysDifference <= 3 && daysDifference >= 0;
    bill.isPastDue = daysDifference < 0;
  }

  sortBillsByDueDate(): void {
    this.bills.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
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
