import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';

@Component({
    selector: 'app-product',
    imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLinkWithHref, NgOptimizedImage],
    templateUrl: './product.component.html',
})
export class ProductComponent {
  readonly product = input.required<Product>();

  isPriority = input<boolean>(false);

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    this.addToCart.emit(this.product());
  }
}
