import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des produits :', error);
      }
    );
  }

  addToCart(product: any): void {
    // Ajoutez la logique pour ajouter l'article au panier (via un store ou une liste locale)
    console.log('Ajouté au panier :', product);
  }
}
