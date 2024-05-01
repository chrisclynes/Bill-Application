export class Bill {
    title: string;
    billUrl: string;
    amount: number;
    dueDate: Date;
    isPaid: boolean;
    isEditing: boolean;
  
    constructor(title: string, billUrl: string, amount: number, dueDate: Date) {
      this.title = title;
      this.billUrl = billUrl;
      this.amount = amount;
      this.dueDate = dueDate;
      this.isPaid = false;
      this.isEditing = false;
    }
  }