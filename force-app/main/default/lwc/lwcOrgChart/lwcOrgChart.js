/* eslint-disable no-console */
import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import Id from '@salesforce/user/Id';
import getReportIds from '@salesforce/apex/orgChartQueries.getReportIds';
import searchUsers from '@salesforce/apex/orgChartQueries.searchUsers';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/User.Name';
import TITLE_FIELD from '@salesforce/schema/User.Title';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
import PHONE_FIELD from '@salesforce/schema/User.MobilePhone';
import MANAGER_FIELD from '@salesforce/schema/User.ManagerId';
import PHOTO_FIELD from '@salesforce/schema/User.MediumPhotoUrl';

const fields = [NAME_FIELD, TITLE_FIELD, EMAIL_FIELD, PHONE_FIELD, MANAGER_FIELD, PHOTO_FIELD];

export default class LwcOrgChart extends NavigationMixin(LightningElement) {

    @track primaryUserId;
    @track reportingChain = [];
    @track nextManagerId;
    @track primaryUser = {};
    @track reports = [];
    @track searchMode=false;
    @track searchResults = [];

    get mailTo() {
        if (this.primaryUser.Email){
            return `mailto:${this.primaryUser.Email}`;
        }
        return '';
    }

    get tel() {
        if (this.primaryUser.Phone){
            return `tel:${this.primaryUser.Phone}`;
        }
        return '';
    }

    connectedCallback(){
        this.primaryUserId = Id;
    }

    @wire(getRecord, { recordId: '$primaryUserId', fields} )
    primaryUserWire ({error, data}) {
        if (error) {
            // TODO: Error handling
            console.error('error retrieving primary userid', error);
        } else if (data) {
            console.log('primary userid', data);
            this.primaryUser.Name = data.fields.Name.value;
            this.primaryUser.Email = data.fields.Email.value;
            this.primaryUser.Phone = data.fields.MobilePhone.value;
            this.primaryUser.Title = data.fields.Title.value;
            this.primaryUser.MediumPhotoUrl = data.fields.MediumPhotoUrl.value;
            console.log(this.primaryUser);
            this.reportingChain = [];  //clear the chain
            // TODO: call the chain functions
            this.nextManagerId = data.fields.ManagerId.value;
        }
    }

    @wire(getRecord, { recordId: '$nextManagerId', fields})
    wiredNextManager ({error, data}) {
        if (error) {
            // TODO: Error handling
            console.error('error retrieving manager', error);
        } else if (data) {
            console.log('manager info', data);
            const manager = {
                id: data.id,
                name: data.fields.Name.value,
                photo: data.fields.MediumPhotoUrl.value
            };
            this.reportingChain.unshift(manager);
            this.nextManagerId = data.fields.ManagerId.value;
        }
    }

    @wire(getReportIds, {userId: '$primaryUserId'})
    wiredReports({error, data}) {
        if (error) {
            // TODO: Error handling
            console.error('error retrieving manager', error);
        } else if (data) {
            console.log('report info', data);
            this.reports = data;
        }
    }

    userChange(event){
        console.log(event.target.dataset.userid);
        this.primaryUserId = event.target.dataset.userid
    }

    toProfile(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.primaryUserId,
                objectApiName: 'User',
                actionName: 'view',
            },
        });
    }

    openSearch() {
        this.searchMode = true;
    }

    setSearch(event){
        this.searchString = event.detail.value;
    }

    async doSearch(){
        this.searchResults = await searchUsers({searchString: this.searchString});
    }

    cancelSearch() {
        this.searchMode = false;
    }

    selectResult(event) {
        this.searchMode = false;
        this.searchResults = [];
        this.primaryUserId = event.target.dataset.userid;
    }

}