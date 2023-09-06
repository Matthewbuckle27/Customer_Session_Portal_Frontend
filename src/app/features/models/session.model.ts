export interface IUpdateSessionDto {
  sessionName: string;
  remarks: string;
}
export interface IResponseDto {
  message: string;
  httpStatus: string;
  sessionResponseDTO: ISession;
}

export interface ICreateSessionDto{
  customerId:string;
  sessionName:string;
  remarks:string;
  createdBy:string;
}
export interface ISession {
  sessionName: string;
  sessionId: number;
  remarks: string;
  createdBy: string;
  createdOn: Date;
  updatedOn: Date;
  status: string;
  customerName: string;
  archiveFlag: string;
}

export interface IUserData {
  username: string;
  password: string;
}

export interface IApiResponses {
  session: ISession[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
