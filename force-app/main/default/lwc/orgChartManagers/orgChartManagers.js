/* eslint-disable no-console */

import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import { fields } from 'c/orgChartUserFields';

export default class OrgChartManagers extends LightningElement {
  // events: changeUser (userId)
  @api primaryUserId;
  @track reportingChain = [];
  @track nextManagerId;

  @wire(getRecord, { recordId: '$primaryUserId', fields })
  primaryUserWire({ error, data }) {
    if (data) {
      this.reportingChain = []; //clear the chain
      this.nextManagerId = data.fields.ManagerId.value;
    } else {
      console.log(error);
    }
  }

  @wire(getRecord, { recordId: '$nextManagerId', fields })
  wiredNextManager({ error, data }) {
    if (data) {
      const manager = {
        id: data.id,
        name: data.fields.Name.value,
        photo: data.fields.MediumPhotoUrl.value
      };
      this.reportingChain.unshift(manager);
      this.nextManagerId = data.fields.ManagerId.value;
    } else if (error) {
      console.error('error retrieving manager', error);
    }
  }

  userSelect(event) {
    this.dispatchEvent(
      new CustomEvent('userselect', {
        detail: { userId: event.target.dataset.userid }
      })
    );
  }
}
