export interface UserInformationResponse {
  ApiStatus: boolean;
  ApiStatusCode: string;
  ApiStatusMessage: string;
  Data: ResponseData;
}
export interface ResponseData {
  token: string;
  user: UserData;
  remainingReimbursementCredit: number;
  monthlyReimbursementPackageCredit: number;
  packageInformation: PackageInformation;
  isLinkAccount: boolean;
  linkAccountParameters: LinkAccountParameters;
}
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  callingCode: string;
  telephoneNumber: string;
  isAdmin: string;
  store?: UserDataStoreEntity[] | null;
}
export interface UserDataStoreEntity {
  storeName: string;
  storeId: string;
  evaStoreId: string;
  storeType: number;
  region: string;
  paidStatus: number;
  pricingStatus: number;
  paidDate: string;
  reimbursementPackageTrialEndDate: string;
  linkedDate: string;
  marketplaceName: string;
  marketplaceCode: string;
  enableRepricing: boolean;
}
export interface PackageInformation {
  turnoverPackageInformation: TurnoverPackageInformation;
  skuPackageInformation: SkuPackageInformation;
}
export interface TurnoverPackageInformation {
  pricingStatus: number;
  packageName: string;
  monthlyFee: number;
  lowerLimit: number;
  upperLimit: number;
  reimbursementCredit: number;
}
export interface SkuPackageInformation {
  packageName: string;
  skuChargeFee: number;
}
export interface LinkAccountParameters {
  developerName: string;
  accountNumber: string;
}

export interface UserInformationRequestBody {
  email: string;
}
