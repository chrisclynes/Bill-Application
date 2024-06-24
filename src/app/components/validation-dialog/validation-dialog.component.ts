import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-validation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.css'],
})
export class ValidationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { errors: string[] }) {}
}