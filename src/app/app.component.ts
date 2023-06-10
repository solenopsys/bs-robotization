import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    statges$:Observable<any>

    constructor(private http: HttpClient) {
    }
    ngOnInit(): void {
        this.statges$= this.http.get("/assets/stages.json")
    }

}