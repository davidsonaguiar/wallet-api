export interface HttpRequest {
    header?: any;
    body?: any;
    params?: any;
    query?: any;
}

export interface HttpResponse {
    status: number;
    body?: any;
}

export interface IController {
    handle: (req: HttpRequest) => Promise<HttpResponse>;
}
