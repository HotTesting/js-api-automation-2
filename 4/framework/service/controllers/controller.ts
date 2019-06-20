import { CookieJar } from "request";
import * as request from "request-promise-native";
export class Controller {
    readonly BASE_URL: string;
    readonly cookieJar: CookieJar;

    constructor(
        BASE_URL: string = "http://localhost:38021",
        cookieJar: CookieJar = request.jar()
    ) {
        this.BASE_URL = BASE_URL;
        this.cookieJar = cookieJar;
    }
}
