import { Component, OnInit } from "@angular/core";
import { DataService, IDataItem } from "../shared/data.service";
import * as utils from "tns-core-modules/utils/utils";
import { MyHttpPostService, CustomerPostService } from "~/app/home/home.service";
import {NgForm} from '@angular/forms';
import { getInterpolationArgsLength } from "@angular/compiler/src/render3/view/util";
import { TextField } from "tns-core-modules/ui/text-field";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from '~/app/environment/environment';
import { AppComponent } from '~/app/app.component';






@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    providers: [MyHttpPostService ,CustomerPostService]

    
})
export class HomeComponent implements OnInit {

    public Username: string;
    public Password: string;
    SignInVisbilty  = "visible";
    LogOffVisbilty  =  "collapse"; 
    PasswordVisbilty  = "visible";
    UserNotLoggedIn     = "true";
    
    constructor(private myPostService: MyHttpPostService,
         private appComponent: AppComponent,
         private CustomerPostService:CustomerPostService,) {   
        this.Username = "radmin";
        this.Password = "syscom";
      }
     
   
    ngOnInit(): void {
    }


    public submit() {
     
          
    
         utils.ad.dismissSoftInput();

         this.PocketERPAuthentication();
    
    
     }
    
      public LogOff(){

        this.appComponent.Navvisible = "collapse";
        this.Password = "";
        this.Username = "";
        /* Fields Visbilty - Username and Password    */
        this.SignInVisbilty  = "visible";
        this.PasswordVisbilty  = "visible";

        /* Buttons Visbilty - Log off button and Sign in button    */
        this.LogOffVisbilty  =  "collapse"; 
        this.UserNotLoggedIn     = "true";
      }

    private makePostRequest() {
      

        this.myPostService
                    


            .postData({Username: this.Username , Password : this.Password,url:this.appComponent.cUrl})
             
            .subscribe(response => {
               
               
    
                //this.message = (<any>response).json.data;
               // console.log(response);
                if (response.body.UserLogin[0].LoginSuccess === "Y"){
                this.appComponent.Navvisible = "visible";
                this.SignInVisbilty  = "collapse";
                this.LogOffVisbilty  = "visible";
                this.PasswordVisbilty = "collapse";
                this.UserNotLoggedIn     = "false";
                 this.appComponent.InEntity = response.body.UserLogin[0].InEntity; 
                 this.appComponent.ArEntity = response.body.UserLogin[0].ArEntity; 
                 this.appComponent.ApEntity = response.body.UserLogin[0].ApEntity;
                 this.appComponent.GlEntity = response.body.UserLogin[0].GlEntity;
                 this.appComponent.EntityWip = response.body.UserLogin[0].EntityWip;
                 this.appComponent.iYear = response.body.UserLogin[0].iYear;
                 this.appComponent.iPeriod = response.body.UserLogin[0].iPeriod;
                 this.fetchCustomerCodes();
 
                  
               
                }
                if (response.body.UserLogin[0].LoginSuccess === "N"){
                    alert("Wrong Username/Password");
                    this.Password = "";
                    
                     return;
                    }


                


            });
            
        
        
    }

    private fetchCustomerCodes(){
        this.CustomerPostService
        .postData({ArEntity: this.appComponent.ArEntity,url:this.appComponent.cUrl})
        .subscribe(response => {
  console.log(response);
         this.appComponent.CustomerCodes = response.body.ttCustomer.map(item => new String(
              item.CustomerCode
        ));
        //console.log(  this.appComponent.CustomerCodes);

    });
    }
    
   private PocketERPAuthentication() {   

        var enteredusername    = this.Username;
        var enteredpassword    = this.Password;
         
        if (!this.Username) {
            alert("You must enter a Username!");
            
            return false;
        }           
         
        // password cannot be blank
        if (!this.Password) {
            alert("You must enter a Password!");
           
            return false;
        }  

        this.makePostRequest();
     } 

    
}
