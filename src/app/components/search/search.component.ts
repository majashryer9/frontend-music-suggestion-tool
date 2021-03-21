import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, mergeMap } from 'rxjs/operators';
import { SearchResult } from 'src/app/models/SearchResult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent<T> implements OnInit {
  @Input() getSearchResults!: (
    searchTerm: string
  ) => Observable<SearchResult<T>[]>;
  @Output() handleSelect = new EventEmitter();
  searchForm = this.fb.group({
    searchTerm: [''],
  });
  searchResults: Observable<SearchResult<T>[]> = of([]);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const searchTerm = this.searchForm.get('searchTerm');
    if (searchTerm) {
      this.searchResults = searchTerm.valueChanges.pipe(
        debounceTime(300),
        filter((searchTerm) => typeof searchTerm === 'string'),
        mergeMap((searchTerm: string) => this.getSearchResults(searchTerm))
      );
    }
  }

  displayFn(searchResult: SearchResult<T>): string {
    return searchResult && searchResult.displayValue
      ? searchResult.displayValue
      : '';
  }

  handleOptionSelected(selectedSearchResult: T) {
    this.handleSelect.emit(selectedSearchResult);
    this.searchForm.reset();
  }
}
