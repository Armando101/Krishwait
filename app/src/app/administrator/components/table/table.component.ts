import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import Product from '@core/models/product.model';
import { ProductsService } from '@core/services/products/products.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public products: Product[];
  // public products$ = from(this.products);

  constructor(
    private productServce: ProductsService,
  ) { }

  ngOnInit(): void {
    this.productServce.getProducts().subscribe(product => this.products = product);
  }

  deleteProduct(id: string): void {
    this.productServce.deleteProduct(id).subscribe();
    const index = this.products.findIndex(product => product.id === id);
    this.products.splice(index, 1);
  }

}
