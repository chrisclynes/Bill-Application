import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ValidationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { errors: string[] }) {}
}
