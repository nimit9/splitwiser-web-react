export interface IApiData<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export interface IUser {
    phone?: string;
    email?: string;
    name?: string;
    _id: string;
}

export interface IApiCurrentUserData {
    user: IUser;
}
