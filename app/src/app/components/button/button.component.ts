import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() icon!: string;
  @Input() route!: string;
  @Input() openModal = false;
  @Input() disabled = false;

  onClick(event: Event) {
    if (this.openModal) {
      event.stopPropagation();
    }
  }
}
