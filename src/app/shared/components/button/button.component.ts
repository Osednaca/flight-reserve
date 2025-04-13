import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [ngClass]="buttonClasses"
      (click)="onClick.emit($event)"
      class="px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <div class="flex items-center justify-center space-x-2">
        <div *ngIf="loading" class="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
        <span><ng-content></ng-content></span>
      </div>
    </button>
  `
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const baseClasses = 'font-medium disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    };
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
}