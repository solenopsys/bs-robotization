import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {Route, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";

export const appRoutes: Route[] = [
    {
        path: "",
        redirectTo: "main",
        pathMatch: 'full'
    },
    {
        path: "main",
        component: AppComponent,
    },
];


// noinspection AngularInvalidEntryComponent
@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes),

    ],
    declarations: [

        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {

    }
}
