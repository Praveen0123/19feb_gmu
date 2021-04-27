import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '@env/environment';
import { SearchResultModel } from '@vantage-point/autocomplete-library/lib/models/search/search-result.model';

@Component({
  selector: 'gmu-occupation-auto-complete',
  templateUrl: './occupation-auto-complete.component.html',
  styleUrls: ['./occupation-auto-complete.component.scss']
})
export class OccupationAutoCompleteComponent implements OnInit
{
  @Input() apiUrl: string;
  @Output('onOccupationSelected') occupationSelectedEventEmmitter = new EventEmitter<SearchResultModel>();

  constructor() { }

  ngOnInit(): void
  {
    this.apiUrl = this.apiUrl || environment.API.autoCompleteUrl;
  }

  onOccupationSelected(selectedItem: SearchResultModel)
  {
    if (selectedItem && this.occupationSelectedEventEmmitter.observers.length > 0)
    {
      this.occupationSelectedEventEmmitter.emit(selectedItem);
    }
  }

}
