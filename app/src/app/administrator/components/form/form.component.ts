import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ProductsService } from '@core/services/products/products.service';
import Product from '@core/models/product.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private product: Product = null;
  public addProductsFrom: FormGroup;
  public image$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storage: AngularFireStorage,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      // tslint:disable-next-line: no-unused-expression
      id && this.loadForm(id);
    });
    this.createForm();
  }

  loadForm(id: string): void {
    this.productsService.getProduct(id).subscribe(product => {
      this.product = product;
      this.addProductsFrom.get('title').setValue(product.title);
      this.addProductsFrom.get('description').setValue(product.description);
      this.addProductsFrom.get('price').setValue(product.price);
    });
  }

  invalidForm(field: string): boolean {
    return this.addProductsFrom.get(field).invalid && this.addProductsFrom.get(field).touched;
  }

  createForm(): void {
    this.addProductsFrom = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', Validators.required],
      img: ['']
    });
  }

  send(): void {

    if (this.addProductsFrom.invalid) {
      Object.values(this.addProductsFrom.controls).map(control => {
        if (control.status === 'INVALID') {
          control.markAllAsTouched();
        }
      });
    } else {
      // POST
      const product: Product = this.addProductsFrom.value;
      if (this.product) {
        product.img = this.product.img;
        this.productsService.updateProduct(this.product.id, product).subscribe();
      } else {
        this.productsService.postProduct(product).subscribe();
      }

      // Navigate
      this.router.navigateByUrl('/administrator');
    }
  }

  upload(event): void {
    const file = event.target.files[0];
    const filePath = `images/product_${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => {
        this.image$ = ref.getDownloadURL();
        this.image$.subscribe(url => this.addProductsFrom.get('img').setValue(url));
    })).subscribe();
  }

}
