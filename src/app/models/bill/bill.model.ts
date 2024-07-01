export class Bill {
    title: string;
    billUrl: string;
    amount: number;
    dueDate: Date;
    isPaid: boolean;
    isDue: boolean;
    isPastDue: boolean;
    isEditing: boolean;
  
    constructor(title: string, billUrl: string, amount: number, dueDate: Date) {
      this.title = title;
      this.billUrl = billUrl;
      this.amount = amount;
      this.dueDate = dueDate;
      this.isPaid = false;
      this.isDue = false;
      this.isPastDue = false;
      this.isEditing = false;
    }
  }