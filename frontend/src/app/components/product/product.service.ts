import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

export class ProductService {
  baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-sucess"],
    });
  }

  // Insert
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }
  // Select * from
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }
  // select id
  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  erroHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }
}
