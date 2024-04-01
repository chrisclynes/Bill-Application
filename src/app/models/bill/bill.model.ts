export class Bill {
    title: string;
    amount: number;
    dueDate: Date;
    isPaid: boolean;
    isEditing: boolean;
  
    constructor(title: string, amount: number, dueDate: Date) {
      this.title = title;
      this.amount = amount;
      this.dueDate = dueDate;
      this.isPaid = false;
      this.isEditing = false;
    }
  }