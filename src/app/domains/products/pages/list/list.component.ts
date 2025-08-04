import {
  Component,
  inject,
  signal,
  OnChanges,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    ProductComponent,
    HeaderComponent,
    RouterLinkWithHref,
  ],
  templateUrl: './list.component.html',
})
export default class ListComponent implements  OnChanges {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  readonly slug = input<string>();

  products = signal<Product[]>([]);

  /**
   * rxResource: permite condensar multisples estados relacionados (como loading, error y data) 
   * en un solo recurso
   * 
   *   categoriesResource.value: contiene los datos obtenidos
   *   categoriesResource.loading: indica si la operación está en curso
   *   categoriesResource.error: contiene información sobre errores
   *   categoriesResource.status: indica el estado actual del recurso
   *   categoriesResource.set(): para actualizar manualmente los datos
   *   categoriesResource.reload(): para volver a ejecutar la operación asíncrona
   *   categoriesResource.reset(): para restablecer el recurso a su estado inicial
   * 
   */
  categoriesResources = rxResource({
    loader: () => this.categoryService.getAll(),
  });

  ngOnChanges() {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts({category_id:'',category_slug:this.slug()}).subscribe({
      next: (products) => {
        this.products.set(products);
      },
    });
  }

  resetCategories(){
    this.categoriesResources.set([]);
  }

  reloadCategories(){
    this.categoriesResources.reload();
  }
}
