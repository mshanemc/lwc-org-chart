import { LightningElement, track } from 'lwc';

import searchUsers from '@salesforce/apex/orgChartQueries.searchUsers';

export default class OrgChartSearch extends LightningElement {
  @track searchResults = [];

  setSearch(event) {
    this.searchString = event.detail.value;
  }

  async doSearch() {
    this.searchResults = await searchUsers({ searchString: this.searchString });
  }

  cancelSearch() {
    this.dispatchEvent(new CustomEvent('searchcancel'));
  }

  selectResult(event) {
    this.searchMode = false;
    this.searchResults = [];
    this.dispatchEvent(
      new CustomEvent('userselect', {
        detail: { userId: event.target.dataset.userid }
      })
    );
  }
}
