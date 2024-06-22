import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bill } from '../../models/bill/bill.model';
import { CommonModule } from '@angular/common';
import { EditRowComponent } from '../edit-row/edit-row.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-bill-table',
  standalone: true,
  imports: [FormsModule, CommonModule, EditRowComponent, MatDialogModule], // Include FormsModule and MatDialogModule here
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css'],
})
export class BillTableComponent {
  @Input() title: string = 'Table';
  @Input() bills: Bill[] = [];
  @Input() totalAmountPaid: number = 0;
  @Input() totalAmountRemaining: number = 0;

  @Output() removeBill = new EventEmitter<Bill>();
  @Output() editBill = new EventEmitter<Bill>();
  @Output() saveBill = new EventEmitter<Bill>();
  @Output() markBillAsPaid = new EventEmitter<Bill>();

  constructor(public dialog: MatDialog) {}

  remove(bill: Bill) {
    this.removeBill.emit(bill);
  }

  edit(bill: Bill) {
    this.editBill.emit(bill);
  }

  markAsPaid(bill: Bill) {
    this.markBillAsPaid.emit(bill);
  }

  saveBillHandler(bill: Bill) {
    this.saveBill.emit(bill); // handle save, trigger main save function
  }

  openEditModal(bill: Bill): void {
    const dialogRef = this.dialog.open(EditRowComponent, {
      width: '400px',
      data: { bill }
    });

    dialogRef.componentInstance.save.subscribe(updatedBill => {
      this.saveBillHandler(updatedBill);
    });
  }
}
