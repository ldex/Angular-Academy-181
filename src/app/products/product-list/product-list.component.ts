import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';
import { FavouriteService } from '../favourite.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: []
})
export class ProductListComponent implements OnInit {

  title: string = 'Products'
 // products: Product[]
  products$: Observable<Product[]>;
  selectedProduct: Product;
  errorMsg: string;
  productsNb: number = 0;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.selectedProduct = null;
    this.currentPage--;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.selectedProduct = null;
    this.currentPage++;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl("/products/" + product.id);
  }

  get favourites(): number {
    return this.favouriteService.getFavouritesNb();
  }

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private router: Router) {
  
  }

  ngOnInit() {
    this.products$ = this
                      .productService
                      .products$
                      .pipe(
                        tap(data => this.productsNb = data.length),
                        catchError(
                          error => {
                            this.errorMsg = error;
                            return EMPTY;
                          }
                        )
                      ); 

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   )
  }

}
