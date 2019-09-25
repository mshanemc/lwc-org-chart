/* eslint-disable no-console */

import { LightningElement, api, track, wire } from 'lwc';

import getReportIds from '@salesforce/apex/orgChartQueries.getReportIds';

export default class OrgChartReports extends LightningElement {
  @api primaryUserId;
  @track
  reports = [];

  @wire(getReportIds, { userId: '$primaryUserId' })
  wiredReports({ error, data }) {
    if (error) {
      // TODO: Error handling
      console.error('error retrieving reports', error);
    } else if (data) {
      //   console.log('report info', data);
      this.reports = data;
    }
  }

  userChange(event) {
    this.dispatchEvent(
      new CustomEvent('userselect', {
        detail: { userId: event.target.dataset.userid }
      })
    );
  }
}
