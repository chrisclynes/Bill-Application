import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import { EditRowComponent } from './components/edit-row/edit-row.component';
import { Bill } from './models/bill/bill.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,EditRowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My Bills';
  bills: Bill[] = [
    new Bill('Car Bill', 348.99, new Date(2024, 3, 15)),
    new Bill('Subscription Bill', 27.50, new Date(2024, 3, 20)),
    new Bill('Credit Card bill', 210.00, new Date(2024, 3, 25)),
    new Bill('Car Insurance', 142.57, new Date(2024, 3, 30)),
  ];

  totalAmountPaid: number = 0;
  totalAmountRemaining: number = 0;

  constructor() {
    this.updateTotalAmounts();
  }

  add(newBillTitle: string, newBillAmount: string, newBillDueDate: string) {
    const amount = parseFloat(newBillAmount);
    const dueDate = new Date(newBillDueDate);
    this.bills.push(new Bill(newBillTitle, amount, dueDate));
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

  save(bill: Bill) {
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
