import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookservice } from '../../services/book.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchParam: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: Bookservice
  ) {
    this.route.params.subscribe(
      (params) => (this.searchParam = params['searchParam'] || '')
    );
  }

  onSearchChange(searchValue: string) {
    this.searchParam = searchValue;
    console.log(this.searchParam);
  }

  searchBook() {
    this.router.navigateByUrl(`/search/${this.searchParam}`);
  }
}
