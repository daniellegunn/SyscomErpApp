import { Component, OnInit } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { environment } from '~/app/environment/environment';


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})


export class AppComponent implements OnInit {
     
      
    Navvisible ="collapse";
    InEntity = "";
    ArEntity ="";
    GlEntity = "";
    EntityWip = "";
    ApEntity = "";
    iYear    ="";
    iPeriod  ="";
    CustomerCodes = [];
   
 
    constructor() {
        // Use the component constructor to inject providers.
      
    }
    
       
   
    ngOnInit(): void {
        // Init your component properties here.
    }
}
