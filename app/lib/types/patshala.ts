export type ApiResponse<T> = {
    success: boolean;
    message: string;
    result: T;
};

export type PathshalaContactInfo = {
    pathshalaContactInfoId: number;
    primaryPhone: string | null;
    secondaryPhone: string | null;
    faxNumber: string | null;
    email: string | null;
    alternateEmail: string | null;
    principalName: string | null;
    principalPhone: string | null;
    principalEmail: string | null;
    adminContactName: string | null;
    adminContactPhone: string | null;
};


export type Pathshala = {
    pathshalaId: string;
    pathshalaName: string;
    pathshalaCode: string;
    pathshalaType: string;
    subdomain: string;
    customDomain: string | null;
    tier: string;
    enabled: boolean;
    deleted: boolean;
    createdBy: string;
    createdOn: string; // ISO timestamp
    updatedOn: string; // ISO timestamp
    contactInfo: PathshalaContactInfo | null;
    logoDetails: FileDetails | null;
};

export type FileDetails = {
    fileName: string;
    fileType: string;
    fileBase64: string;
    fileExtension: string;
    fileDetailsId: string;
}

