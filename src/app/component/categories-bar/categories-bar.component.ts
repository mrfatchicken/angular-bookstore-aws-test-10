import { Component } from '@angular/core';
import { categories } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-bar',
  templateUrl: './categories-bar.component.html',
  styleUrls: ['./categories-bar.component.css'],
})
export class CategoriesBarComponent {
  m_categories: any;

  constructor(private router: Router) {
    this.m_categories = Object.entries(categories)
      .map(([key, value]) => ({
        key,
        value,
      }))
      .sort((a, b) => a.value.localeCompare(b.value));
  }

  navigateToBookCategory(category: string) {
    console.log(category);
    this.router.navigateByUrl(`/category/${category}`);
  }
}
