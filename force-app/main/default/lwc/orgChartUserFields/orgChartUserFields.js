import NAME_FIELD from '@salesforce/schema/User.Name';
import TITLE_FIELD from '@salesforce/schema/User.Title';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
import PHONE_FIELD from '@salesforce/schema/User.MobilePhone';
import MANAGER_FIELD from '@salesforce/schema/User.ManagerId';
import PHOTO_FIELD from '@salesforce/schema/User.MediumPhotoUrl';

const fields = [NAME_FIELD, TITLE_FIELD, EMAIL_FIELD, PHONE_FIELD, MANAGER_FIELD, PHOTO_FIELD];

export { fields };
