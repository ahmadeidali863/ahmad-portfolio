export interface Certification {
    id: number ;
    certificationName: string ;
    certificationDescription: string ;
    certificationImage: string;
    certificationType: string ;
    certificationURL: string ;
    userName : string ;
    certificationImageFile : File | undefined;
  }