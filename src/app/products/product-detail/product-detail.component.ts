import { Component, OnInit, Input} from '@angular/core';
import { Product } from '../product.interface';
import { FavouriteService } from '../favourite.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { map, filter, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  newFavourite(product: Product) {
    this.favouriteService.addToFavourites(product);
  }

  constructor(
    private favouriteService: FavouriteService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {
    const id = + this.activatedRoute.snapshot.params['id'];

    this
      .productService
      .products$
      .pipe(
        flatMap(p => p),
        filter(product => product.id === id)

    //    map(products => products.find(p => p.id === id))
      )
      .subscribe(
        result => this.product = result
      )
  }

}
