import { IEmployeeRegistration } from './IEmployeeRegistration';
import { IOrganizationRegistration } from './IOrganizationRegistration';

export interface IForgotPassword {
    emp: IEmployeeRegistration,
    org: IOrganizationRegistration,
    is_employee : boolean,
}