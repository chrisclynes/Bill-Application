import { Component, Input, Output, EventEmitter, model } from '@angular/core';
import { Bill } from '../../models/bill/bill.model';


@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.css']
})
export class EditRowComponent {
  bill = model(Bill)
  // @Input() bill: Bill;
  // @Output() save: EventEmitter<Bill> = new EventEmitter<Bill>();

  onSave() {
    this.save.emit(this.bill);
  }
}