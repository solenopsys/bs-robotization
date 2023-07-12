import {Component, OnInit} from '@angular/core';
import {BC} from "./test-structure";
import {HttpClient} from "@angular/common/http";
import {cascadeLoad} from "../system-diagram/refactoring/old/loader";

@Component({
  selector: 'combinatorics',
  templateUrl: './combinatorics.component.html',
  styleUrls: ['./combinatorics.component.css']
})
export class CombinatoricsComponent implements OnInit{

  cb=BC;

  constructor(private http:HttpClient) {


  }

  ngOnInit(): void {
    cascadeLoad(this.http,"/assets/arch/fdm-3d-printer.json").then((conf)=>{
      console.log(conf)
    });
  }


}
