import { Component, OnInit } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product-delete",
  template: `
    <mat-card>
      <mat-card-title>Excluir produto</mat-card-title>
      <form>
        <mat-form-field>
          <input
            matInput
            placeholder="Nome"
            [value]="product?.name"
            name="name"
            desable
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Preço (R$)"
            [value]="product?.price"
            name="price"
            desable
          />
        </mat-form-field>
      </form>
      <div>
        <button mat-raised-button (click)="deleteProduct()" color="warn">
          Excluir
        </button>

        <button mat-raised-button (click)="cancel()">Cancelar</button>
      </div>
    </mat-card>
  `,
  styles: [`form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

button {
    margin: 20px 15px 0px 0px;
}
div{
    display:flex;
    flex-direction: row;
}`],
})
export class ProductDeleteComponent implements OnInit {
  product?: Product;


  constructor(private productService: ProductService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.readById(id).subscribe((product) => {
        this.product = product;
      });
    }
  }
  
  deleteProduct(): void {
this.productService.delete(`${this.product?.id}`).subscribe(()=>{this.productService.showMessage("Produto excluído com sucesso!")})
    this.router.navigate(["/products"]);
  }
  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
