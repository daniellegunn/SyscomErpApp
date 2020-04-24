import { Component, OnInit ,Input, ChangeDetectionStrategy,ChangeDetectorRef } from "@angular/core";
import { MyHttpPostService, Order, OrderLine, OrderList } from "~/app/Enquiry/Enquiry.service";
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
import { DatePipe } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: "Enquiry",
    templateUrl: "./enquiry.component.html",
    providers: [MyHttpPostService]

  

})
export class EnquiryComponent implements OnInit {

    public message: string = "";
    OrderRecord: Array<Order> = [];
    OrderLineRecord: Array<OrderLine> = [];
    OrderRecordList: Array<OrderList> = [];
    public OrderVisbilty  = "visible";
    public MessageVisbilty = "collapse";
    public CustomerCodeSearch = "collapse";
    public OrderNumberSearch = "visible";
  
    public LoadingVisbilty:string;
    public OrderNumber: string;
    public CustomerCode:string;
    public OrderStatus:string;
    
    public isErrorVisible = false;
    public errormessage: string;
    public index : number;
     
    onOrderNumberTap(args) {
     // console.log("Tap");
      //console.log(args.object.text);
      

      this.OrderNumber = args.object.text;

      this.isErrorVisible = false;

      this.OrderRecord = [];
       this.OrderLineRecord = [];
       this.OrderRecordList = [];

       this.makePostRequest();
    /*  dialogs.alert({ title: "Order Number Info",
       message: "Item Code: " + this.OrderRecordList[this.index].OrderNumber   ,     
       
      okButtonText: "Close" });*/
  }
 
  



        
    constructor(private myPostService: MyHttpPostService, 
      private appComponent: AppComponent,
      private cdref: ChangeDetectorRef,
      private datePipe: DatePipe ) { 
        this.LoadingVisbilty  = "collapse";
       
    }

    ngOnInit() {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
   

    ngAfterContentChecked() {

      this.cdref.detectChanges();
      
       }
    
    onCheckedChange(){
     if(this.CustomerCodeSearch == "collapse"){

      this.CustomerCodeSearch = "visible";
      this.OrderNumberSearch = "collapse";
      this.OrderNumber = null;
     }else{
      this.CustomerCodeSearch = "collapse";
      this.OrderNumberSearch = "visible";
      this.CustomerCode = "";
     }
     
    }
    
    public submit() {
      this.message ="";
      this.errormessage = "";
      
      this.MessageVisbilty  ="collapse";

      this.OrderRecord = [];
       this.OrderLineRecord = [];
       this.OrderRecordList = [];
      

       if(!this.CustomerCode){
        utils.ad.dismissSoftInput();
         this.makePostRequest();
       

       }else{
        utils.ad.dismissSoftInput();
         this.CustomerCodePostRequest();

       }
     }



     private makePostRequest() {
      
          this.OrderVisbilty="collapse";
          this.LoadingVisbilty  = "visible";

      //  console.log(this.entityComponent.InEntity);        
        this.myPostService
        
            .postData({ArEntity: this.appComponent.ArEntity,
                       OrderNumber: this.OrderNumber})
                 

            .subscribe(data => {
              //  console.log(data.body.ttItemClassStockData);
                //this.message = (<any>response).json.data;
                //const usersJson: any[] = Array.of(res.json());
               
               if (data.body.dsOrderLog.gttOrderV1 == undefined){
                this.message = "ERROR: No Order Found!";

               } else{

                this.OrderRecord = data.body.dsOrderLog.gttOrderV1.map(item => new Order(
                  item.OrderNumber,
                  item.OrderDate,
                  item.CustomerPurchaseOrder
                  ))
                 
               this.OrderLineRecord = data.body.dsOrderLog.gttOrderV1[0].gttOrderLineV1.map(item => new OrderLine(
                  item.OrderNumber,
                  item.LineNumber,                  
                  item.ItemCode,
                  item.Description,
                  item.UomCode,
                  item.GrossPrice,
                  item.NetPrice,
                  item.WarehouseCode,
                  item.QuantityOpenOrdered,
                  item.QuantityAllocated,
                  item.QuantityOnPps,
                  item.QuantityReserved,
                  this.datePipe.transform(item.RequestDate,"dd-MM-yyyy") ,
                  item.WoNumber,
               
               
                 )) 
                 }
                 this.LoadingVisbilty  = "collapse";

            },
            error => {
              this.message = "ERROR: Not a vaild order number!";
              this.MessageVisbilty =  "visible";
              this.LoadingVisbilty  = "collapse";

            //  console.log(error);
            });
            
         
        
  }

  private CustomerCodePostRequest() {
    this.OrderVisbilty="visible";
    this.LoadingVisbilty  = "visible";




    //  console.log(this.entityComponent.InEntity);        
      this.myPostService
      
          .postCustomerData({ArEntity: this.appComponent.ArEntity,
                            CustomerCode: this.CustomerCode})
               

          .subscribe(data => {
            //  console.log(data.body.ttItemClassStockData);
              //this.message = (<any>response).json.data;
              //const usersJson: any[] = Array.of(res.json());
           //   console.log(data);
             if (data.body.gttOrderListv1.length == 0){
              this.message = "ERROR: No Customer Orders Found!";
              this.MessageVisbilty =  "visible";
             } else{

              this.OrderRecordList = data.body.gttOrderListv1.map(item => new OrderList(
                item.OrderNumber,
                item.OrderStatus
                ))
              
               }
               this.LoadingVisbilty  = "collapse";
          },
          error => {
            this.message = "ERROR: Not a vaild customer code!";
            this.MessageVisbilty =  "visible";
            this.LoadingVisbilty  = "collapse";
        //    console.log(error);
          });
          
       
      
}


}
