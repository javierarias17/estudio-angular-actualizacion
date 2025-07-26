import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(params:{category_id?: string, category_slug?: string}) {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (params.category_id) {
      url.searchParams.set('categoryId', params.category_id);
    }
    if (params.category_slug) {
      url.searchParams.set('categorySlug', params.category_slug);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(params:{product_id?:string, product_slug: string}) {

    const endPoint = params.product_id? `${params.product_id}`: `slug/${params.product_slug}`

    return this.http.get<Product>(
      `${environment.apiUrl}/api/v1/products/${endPoint}`,
    );
  }
}
