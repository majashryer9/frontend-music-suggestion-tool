import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResult } from './models/SearchResult';
import { Song } from './models/Song';
import { SongService } from './services/song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  getSongSearchResults: (
    searchTerm: string
  ) => Observable<SearchResult<Song>[]>;
  selectedSongs: Song[] = [];
  constructor(private songService: SongService) {
    this.getSongSearchResults = (searchTerm: string) => {
      return this.songService.search(searchTerm).pipe(
        map((searchResults: Song[]) =>
          searchResults.map((searchResult) => ({
            displayValue: `${searchResult.name} by ${searchResult.artist}`,
            value: searchResult,
          }))
        )
      );
    };
  }

  handleSelect(selectedSong: Song) {
    this.selectedSongs.push(selectedSong);
  }
}
