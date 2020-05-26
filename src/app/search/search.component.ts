import { Component, OnInit } from "@angular/core";
import { MyHttpPostService, ItemClass, ItemStock } from "~/app/search/search.service";
import {NgForm} from '@angular/forms';
import { getInterpolationArgsLength } from "@angular/compiler/src/render3/view/util";
import { TextField } from "tns-core-modules/ui/text-field";
import * as utils from "tns-core-modules/utils/utils";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { HomeComponent }  from "~/app/home/home.component";
import { AppComponent } from '~/app/app.component';
import { GestureEventData } from "tns-core-modules/ui/gestures";
//import {Http, Response} from '@angular/common/http';
import * as dialogs from "tns-core-modules/ui/dialogs";


@Component({
    moduleId: module.id,
    selector: "Search",
    templateUrl: "./search.component.html",
    providers: [MyHttpPostService]

  

})
export class SearchComponent implements OnInit {
    public ItemCode: string;
    public WarehouseCode: string ;
    public message: string = "";
    ItemClassStock: Array<ItemClass> = [];
    ItemStock:Array<ItemStock> = [];
    public LoadingVisbilty:string;
    
    public isErrorVisible = false;
    public errormessage: string;
    public index : number;
    public imagesrc: string;

   
    onTap(args) {
      this.index = args.object.index;
      
      dialogs.alert({ title: "ItemClassStock Info",
       message: "Item Code: " + this.ItemClassStock[this.index].ItemCode + "\n" +        
      "Storage: " + this.ItemClassStock[this.index].Storage  + "\n" +   
      "Quantity On Hand: " + this.ItemClassStock[this.index].QuantityOnHand + "\n" +   
      "Quantity On Pps: " + this.ItemClassStock[this.index].QuantityOnPps + "\n" +   
      "Quantity Allocated : " + this.ItemClassStock[this.index].QuantityAlloc + "\n" +   
      "Quantity Original : " + this.ItemClassStock[this.index].QuantityOriginal + "\n" +   
      "Cost: " + this.ItemClassStock[this.index].Cost, 
      okButtonText: "Close" });
  }
 
  onItemStockTap(args) {
    this.index = args.object.index;

    dialogs.alert({ title: "ItemStock Info",
     message: "Item Code: " + this.ItemStock[this.index].ItemCode + "\n" +        
    "Warehouse: " +  this.ItemStock[this.index]. WarehouseCode + "\n" +
    "Quantity Available: " +  this.ItemStock[this.index].cQuantityAvailable  + "\n" + "\n"+
    "Quantity On Hand: " + this.ItemStock[this.index].cQuantityOnHand + "\n" +   
    "Quantity On Pps: " + this.ItemStock[this.index].cQuantityOnPps + "\n" +   
   "Quantity Allocated : " + this.ItemStock[this.index].cQuantityAlloc + "\n" +
   "Despatch Note Qty :"  + this.ItemStock[this.index].cDespatchNoteQty + "\n" +
   "Cost: " + this.ItemStock[this.index].Cost + "\n" + 
   "QuantityCustomerOrder : " + this.ItemStock[this.index].QuantityCustomerOrder + "\n" + 
   "QuantityOnPo : " +  this.ItemStock[this.index].cQuantityOnPo ,
    okButtonText: "Close" }); 
}



        
    constructor(private myPostService: MyHttpPostService, private appComponent: AppComponent) { 
        this.LoadingVisbilty  = "collapse";

    }

    ngOnInit() {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    
    public submit() {
      this.message ="";
      this.errormessage = "";
      this.isErrorVisible = false;

       this.ItemClassStock  = [];
    this.ItemStock = [];
     
        if (!this.ItemCode){
         this.message = "Please Enter a item code";
         return;
        }
        if (!this.WarehouseCode){
            this.LoadingVisbilty  = "visible";
            utils.ad.dismissSoftInput();
            this.makeStockPostRequest();

         } else{
           this.LoadingVisbilty  = "visible";
         utils.ad.dismissSoftInput();
 
         this.makePostRequest();
        }
     }



     private makePostRequest() {
      
      //  console.log(this.entityComponent.InEntity);        
        this.myPostService
        
            .postData({InEntity: this.appComponent.InEntity,
                      ItemCode: this.ItemCode,
                        WarehouseCode: this.WarehouseCode,
                        url:this.appComponent.cUrl})
                 

            .subscribe(data => {
              //  console.log(data.body.ttItemClassStockData);
                //this.message = (<any>response).json.data;
                //const usersJson: any[] = Array.of(res.json());
                if (data.body.ttItemClassStockData.length == 0){

                  this.errormessage = "Item Not Found in Warehouse";
                  this.isErrorVisible = true;
                  this.LoadingVisbilty  = "collapse";
                  return;
                 }

                 
                this.ItemClassStock = data.body.ttItemClassStockData.map(item => new ItemClass(
                  item.iIndex,
                  item.ItemCode,
                   item.Storage,
                   item.QuantityOnHand,
                   item.QuantityOnPps,
                   item.QuantityAlloc,
                   item.QuantityOriginal,
                   item.Cost));
               // console.log(this.ItemClassStock);
               //this.imagesrc = data.body.ttItemClassStockData[0].cmedia);
               this.imagesrc = "~/images/option.jpg";
                //console.log(this.JsonFormat(response.ttItemStockData));
                this.LoadingVisbilty  = "collapse";
                this.errormessage = "";
                this.isErrorVisible = false;
                this.message = "Tap a Record to see more info";

            },
            error => {
              this.errormessage = "Item Not Found";
              this.isErrorVisible = true;
              this.LoadingVisbilty  = "collapse";
            });
            
         
        
    }

    private makeStockPostRequest() {
     

        this.myPostService
               
            .postData({InEntity: this.appComponent.InEntity,
                      ItemCode: this.ItemCode,
                        WarehouseCode: this.WarehouseCode,
                        url:this.appComponent.cUrl})
            .subscribe(data => {
               // console.log(data.body.ttItemStockData);
                //this.message = (<any>response).json.data;
                //const usersJson: any[] = Array.of(res.json());
                this.ItemStock = data.body.ttItemStockData.map(item => new ItemStock(
                  item.iIndex,
                  item.ItemCode,
                   item.WarehouseCode,
                   item.cQuantityOnHand,
                   item.cQuantityOnPps,
                   item.cQuantityAlloc,
                   item.Cost,
                   item.QuantityCustomerOrder,
                   item.cQuantityOnPo,
                   item.cQuantityAvailable,
                   item.cDespatchNoteQty));
             //   console.log(this.ItemStock);
                //console.log(this.JsonFormat(response.ttItemStockData));
                this.LoadingVisbilty  = "collapse";
                this.errormessage = "";
                this.isErrorVisible = false;
                this.message = "Tap a Record to see more info";

            },
            error => {
              this.errormessage = "Item Not Found";
              this.isErrorVisible = true;
              this.LoadingVisbilty  = "collapse";
            });
            
         
        
    }


    private JsonFormat(json : any){
       json = JSON.stringify(json).replace("[","");
       json  = json.replace("]","");
       json  = json.replace("{","");
       json  = json.replace("}",""); 
       json  = json.replace(/\"/g,""); 
       this.message =json; 

    }


}
