/* eslint-disable no-console */
import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';

import { fields } from 'c/orgChartUserFields';

export default class LwcOrgChart extends NavigationMixin(LightningElement) {
  @track primaryUserId;
  @track primaryUser = {};
  @track searchMode = false;

  get mailTo() {
    return this.primaryUser.Email ? `mailto:${this.primaryUser.Email}` : '';
  }

  get tel() {
    return this.primaryUser.Phone ? `tel:${this.primaryUser.Phone}` : '';
  }

  connectedCallback() {
    this.primaryUserId = Id;
  }

  @wire(getRecord, { recordId: '$primaryUserId', fields })
  primaryUserWire({ error, data }) {
    if (data) {
      Object.keys(data.fields).forEach(fieldKey => {
        this.primaryUser[fieldKey] = data.fields[fieldKey].value;
      });
    } else if (error) {
      console.error(error);
    }
  }

  toProfile() {
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: this.primaryUserId,
        objectApiName: 'User',
        actionName: 'view'
      }
    });
  }

  openSearch() {
    this.searchMode = true;
  }

  cancelSearch() {
    this.searchMode = false;
  }

  userChange(event) {
    this.primaryUserId = event.detail.userId;
    this.searchMode = false;
  }
}
