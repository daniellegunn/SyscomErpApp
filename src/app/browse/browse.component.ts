import { Component, OnInit, AfterViewInit   } from "@angular/core";
import { MyHttpPostService , OrderPackageRequest , OrderItemList ,
   GenericItemPostService,Attribute1, Attribute2,
   Attribute1ItemPostService ,Attribute2ItemPostService , DeliveryAddressPostService ,ItemDetailsPostService, AdditionalChargesPostService, AddChargesClass,AdditionalChargeCodePostService,AdditionalChargeValuePostService} from "~/app/browse/browse.service";
import {NgForm} from '@angular/forms';
import { getInterpolationArgsLength } from "@angular/compiler/src/render3/view/util";
import { TextField } from "tns-core-modules/ui/text-field";
import * as utils from "tns-core-modules/utils/utils";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { AppComponent } from '~/app/app.component';
import { ScrollView, ScrollEventData } from "tns-core-modules/ui/scroll-view";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    moduleId: module.id,
    selector: "Browse",
    templateUrl: "./browse.component.html",
    providers: [MyHttpPostService,
      GenericItemPostService,
      Attribute1ItemPostService,
      Attribute2ItemPostService,
      DeliveryAddressPostService,
      ItemDetailsPostService,
      AdditionalChargesPostService,
      AdditionalChargeCodePostService,
      AdditionalChargeValuePostService
      ]
})
export class BrowseComponent implements OnInit     {
    public CustomerCode: string;
    public WarehouseCode: string = "";
    public jsonRequest :string;
    public CustomerPurchaseOrder :string;
    public ItemCode:string;
    public LineNumber:number;
    public Quantity: string = "1";
    public OrderPackageRequest: Array<OrderPackageRequest>;
    public OrderItemList: Array<OrderItemList>;
    public AddChargesList: Array<AddChargesClass>;
    public message: string = "";
   
    public selectedAtt1Index:number;
    public GenericItems:Array <string>;
    public selectedGenericIndex:number;
   
    public MaxOrderLine:number = 1;
    public RestRequest: String;
    public isItemVisible: boolean = false;
    public CustomerCodes:Array<string> = [];
    public selectedCustomerIndex:number;
    public AdditionalCharges:Array<string> = [];

    public Attribute1:Array<string> =[];
    public Attribute1Setcodes:Array<string> = [];
    public Attribute1List:Array<Attribute1> = [];

    public Attribute2:Array<string> = [];
    public Attribute2Setcodes:Array<string> = [];
    public Attribute2List:Array<Attribute2> = [];
    
    public Attribute1Name:string = "";
    public Attribute2Name:string ="";

    public AttributeVisbilty = "collapse";
    


    public selectedAtt2Index:number;
   
   public SelectedAttribute1:string;
   public SelectedAttribute2:string;
   public SelectedGenericItemCode:string;

  public Price:number;
  public VatAmount:number;
  public Currency:string;
  public TotalPrice:number = 0;
  public OpenValue:number = 0;
  public TotalVat:number = 0;

  public ShipName:string;
  public ShipAddress1:string;
  public ShipAddress2:string;
  public ShipAddress3:string;
  public ShipAddress4:string;
  public ShipAddress5:string;
  public ShipCity:string;
  public ShipPostCode:string;
  public minusQtyEnabled:boolean = false;
  public nextLineEnabled:boolean = false;
  public previousLineEnabled:boolean = false;
  public selectedIndex:number;
  public CustomerPoMand:string = "";
  public result:boolean = false;
  //public AddChargeCode:string;
  //public AddChargeValue:string;
  //public AddChargeDesc:string;
  AddCharges:Array<AddChargesClass> = [];

  public orderLinesEnabled:boolean = false;
  public deliveryAddressEnabled:boolean = false;
  public summaryEnabled:boolean = false;
  public AddChargesEnabled:boolean = false;
  public AddChargeRecalc:boolean = false;
  public iRowNum:number = 0;

    public AddressVisbilty:string = "collapse";
    public ItemVisbilty:string = "collapse";
    public OrderVisbilty:string = "visible";
    public SummaryVisbilty:String = "collapse";
    public ChargeVisbilty:String = "collapse";
    public scrollYPos: number;
    constructor(private myPostService: MyHttpPostService,
      private GenericItemPostService: GenericItemPostService,
      private Attribute1ItemPostService:Attribute1ItemPostService,
      private Attribute2ItemPostService:Attribute2ItemPostService,
      private DeliveryAddressPostService:DeliveryAddressPostService,
      private ItemDetailsPostService:ItemDetailsPostService,
      private AdditionalChargesPostService:AdditionalChargesPostService,
      private AdditionalChargeCodePostService:AdditionalChargeCodePostService,
      private AdditionalChargeValuePostService:AdditionalChargeValuePostService,
      private appComponent: AppComponent) { }
  

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        
        this.OrderItemList = [];
        this.LineNumber = 1;
       
    }



    onScroll(args: ScrollEventData) {
      const scrollView = args.object as ScrollView;

    // console.log("scrollX: " + args.scrollX);
     //console.log("scrollY: " + args.scrollY);

  }
     
  onFocus(args) {
    // focus event will be triggered when the users enters the TextField
    let textField = <TextField>args.object;
    //this.scrollYPos = this.scrollYPos + 100;
}

public onCustomerOpen(){ //Sets the customer code dropdown which is grabbed from appComponent request soon afer login
 
  this.CustomerCodes = this.appComponent.CustomerCodes;

}

public onCustomerCodeChange(args:SelectedIndexChangedEventData){
  this.CustomerCode = this.CustomerCodes[args.newIndex];
  //This.CustomerCode is the variable that is sent on the OrderPackage request. Must Update this value
  //console.log("Customer Code is: " + this.CustomerCode );

  this.DeliveryAddressPostService
  .postData({CustomerCode: this.CustomerCode, ArEntity: this.appComponent.ArEntity})
       
             .subscribe(response => { 
            //console.log(response);
            this.ShipName = response.body.ttDeliveryDefault[0].ShipName;
            this.ShipAddress1 = response.body.ttDeliveryDefault[0].ShipAddress1;
            this.ShipAddress2 = response.body.ttDeliveryDefault[0].ShipAddress2;
            this.ShipAddress3 = response.body.ttDeliveryDefault[0].ShipAddress3;
            this.ShipAddress4 = response.body.ttDeliveryDefault[0].ShipAddress4;
            this.ShipAddress5 = response.body.ttDeliveryDefault[0].ShipAddress5;
            this.ShipCity = response.body.ttDeliveryDefault[0].ShipCity;
            this.ShipPostCode = response.body.ttDeliveryDefault[0].ShipPostCode;
            this.CustomerPoMand = response.body.ttDeliveryDefault[0].PoMand;        

             });
             this.orderLinesEnabled = true;
             this.deliveryAddressEnabled = true;
             this.AddChargesEnabled = true;

 this.AdditionalChargesPostService
 .postData({ArEntity: this.appComponent.ArEntity,
            InEntity: this.appComponent.InEntity,
            CustomerCode: this.CustomerCode,
            OrderValue: this.OpenValue})
       
 .subscribe(response => { 

this.AddCharges = [];
this.AddCharges = response.body.ttAddCharge.map(item => new AddChargesClass(
  item.iIndex,
  item.AddChargeCode,
  item.AddChargeValue,
  item.AddChargeDesc));
 });

this.orderLinesEnabled = true;
this.deliveryAddressEnabled = true;
this.AddChargesEnabled = true;

}

public onchange(args: SelectedIndexChangedEventData) { // On change of Generic Item fetch Attributes(Only Supports 2)
  //console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
  //console.log("Drop Down text " + this.GenericItems[args.newIndex]);
   this.SelectedGenericItemCode = this.GenericItems[args.newIndex];
  this.Attribute1ItemPostService
  .postData({InEntity: this.appComponent.InEntity,
             GenericItemCode: this.GenericItems[args.newIndex]})
       
  .subscribe(response => { 

  
   this.Attribute1 = response.body.ttAttribute.map(item => new String(
     item.SetCodeDescription
     
     ))
     
   


     this.Attribute1Setcodes = response.body.ttAttribute.map(item => new String(
      item.SetCode
      
      ))

      


      this.selectedAtt1Index = null;



//console.log(response);

  });
  this.Attribute2ItemPostService
  .postData({InEntity: this.appComponent.InEntity,
             GenericItemCode: this.GenericItems[args.newIndex]})
       
  .subscribe(response => { 
 

   this.Attribute2 = response.body.ttAttribute.map(item => new String(
     item.SetCodeDescription
     
     ))
     
  
     

     this.Attribute2Setcodes = response.body.ttAttribute.map(item => new String(
      item.SetCode
      
      ))

      


      this.selectedAtt2Index = null;



//console.log(response);

  });

   this.AttributeVisbilty ="visible";

}

public onAttribute1change(event: SelectedIndexChangedEventData) {  // On change of Attribute: Build Item Code and check for price if full item is entered 
  console.log("Drop Down setcode: " + this.Attribute1Setcodes[event.newIndex]);


  this.selectedAtt1Index = event.newIndex;
  this.SelectedAttribute1  = this.Attribute1Setcodes[event.newIndex];
  this.ItemCode = this.SelectedGenericItemCode + this.SelectedAttribute1 + this.SelectedAttribute2 ;
   
   if(this.SelectedGenericItemCode != undefined && this.SelectedAttribute1 != undefined &&  this.SelectedAttribute2 != undefined ){
      
  this.ItemDetailsPostService
        
  .postData({InEntity: this.appComponent.InEntity,ArEntity:this.appComponent.ArEntity,ItemCode:this.ItemCode,CustomerCode:this.CustomerCode})
  .subscribe(response => { 


    this.Price = response.body.ttItem[0].Price1;
    this.VatAmount = response.body.ttItem[0].vatamount;
    this.Currency = response.body.ttItem[0].CurrencyCode;

   console.log(response);

   });


   }
}

public onAttribute2change(event: SelectedIndexChangedEventData) { // On change of Attribute: Build Item Code and check for price if full item is entered
  console.log("Drop Down setcode: " + this.Attribute2Setcodes[event.newIndex]);


  this.selectedAtt2Index = event.newIndex;
  this.SelectedAttribute2  = this.Attribute2Setcodes[event.newIndex];
 this.ItemCode = this.SelectedGenericItemCode + this.SelectedAttribute1 + this.SelectedAttribute2 ;

  
 if(this.SelectedGenericItemCode != undefined && this.SelectedAttribute1 != undefined &&  this.SelectedAttribute2 != undefined ){
      
  this.ItemDetailsPostService
        
  .postData({InEntity: this.appComponent.InEntity,ArEntity:this.appComponent.ArEntity,ItemCode:this.ItemCode,CustomerCode:this.CustomerCode})
  .subscribe(response => { 

    this.Price = response.body.ttItem[0].Price1;
    this.VatAmount = response.body.ttItem[0].vatamount;
    this.Currency = response.body.ttItem[0].CurrencyCode;

   console.log(response);

   });


   }

}



public onopen() {
  console.log("Drop Down opened.");
}

public onclose() {
  console.log("Drop Down closed.");
}


    public submit() { // Submit the Order checking all data is filled in before validation in backend
      utils.ad.dismissSoftInput();

       if (!this.CustomerCode){
        alert("Please Enter a Customer Code");
        this.isItemVisible = false;
        return;
       }

       //only do this if po is mandatory
       
       if (this.CustomerPoMand == "yes") {
        if (!this.CustomerPurchaseOrder){
          alert("Please Enter a Po Number");
          this.isItemVisible = false;
          return;
        }
      }
  

       this.OrderVisbilty = "visible";
       this.SummaryVisbilty   ="collapse";
      
   

        this.makePostRequest();
    }

  public hideOrderLines(){ // Hides the Order Lines from view
    
    this.submitOrderLine();

  if(this.OrderItemList.length != 0){
    this.summaryEnabled = true;
  }
     

    this.ItemVisbilty = "collapse";
    this.OrderVisbilty =  "visible";
    this.message = "";
  
  }
public showOrderLines(){ // Shows the Order Lines 

if(this.CustomerCode == undefined){
alert("Please enter a Customer code");
return;

}


  this.GenericItemPostService
        
  .postData({InEntity: this.appComponent.InEntity})
       
             .subscribe(response => { 

              this.GenericItems = response.body.ttGenericItems.map(item => new String(
                item.Itemcode
                
                ))

         console.log(response);

             });

    this.ItemVisbilty = "visible";
    this.OrderVisbilty = "collapse";
    this.ChargeVisbilty = "collapse";
    this.message = "";


}

public showDeliveryAddress(){
  if(this.CustomerCode == ""){
   alert("Please enter a Customer Code");
              }
    this.AddressVisbilty = "visible";
    this.OrderVisbilty = "collapse";
    this.ChargeVisbilty = "collapse";
}

public hideDeliveryAddress(){
    this.AddressVisbilty = "collapse";
    this.OrderVisbilty = "visible";
    this.ChargeVisbilty = "collapse";
}

public showAddCharges(){
  if(this.CustomerCode == ""){
   alert("Please enter a Customer Code");
              }
            
              if(this.OrderItemList.length == 0){}
              else {
              this.OrderItemList.forEach(element => {
                this.OpenValue = this.OpenValue + (Number(element.Price) * Number(element.Quantity));  
              }); 
            }      
    //ask if they want to recalculate the add charges like order entry
   

      dialogs.confirm("Do you want to recalculate the additional charges?").then(result => {
        console.log("Dialog result: " + result);
        if (result == true){
          this.AddChargeRecalc = true;
          this.AdditionalChargesPostService
          .postData({ArEntity: this.appComponent.ArEntity,
                    InEntity: this.appComponent.InEntity,
                    CustomerCode: this.CustomerCode,
                    OpenValue: this.OpenValue})
                
          .subscribe(response => { 
         
         this.AddCharges = [];
         this.AddCharges = response.body.ttAddCharge.map(item => new AddChargesClass(
           item.iIndex,
           item.AddChargeCode,
           item.AddChargeValue,
           item.AddChargeDesc));
           console.log(this.AddCharges);    
          });      
        }
        else {}
    });  

    this.ChargeVisbilty = "visible";
    this.OrderVisbilty = "collapse";
    this.AddressVisbilty = "collapse";
}

public hideAddCharges(){
  if(this.CustomerCode == ""){
   alert("Please enter a Customer Code");
              }
    this.ChargeVisbilty = "collapse";
    this.OrderVisbilty = "visible";
    this.AddressVisbilty = "collapse";
}

public showOrderSummary(){

        
  
        if(this.OrderItemList.length == 0){
          alert("Please enter Order Lines");
          return;
        }
        
        this.TotalPrice = 0;
        
        this.OrderItemList.forEach(element => {

          this.OpenValue = this.OpenValue + (Number(element.Price) * Number(element.Quantity));
          this.TotalVat = this.TotalVat + (Number(element.VatAmount) * Number(element.Quantity));

          //this.TotalPrice = this.TotalPrice + (Number(element.Price) * Number(element.Quantity));
          this.TotalPrice = this.TotalPrice + (Number(element.Price) + Number(element.VatAmount)) * Number(element.Quantity);   
                 
        });
  this.OrderVisbilty = "collapse";
  this.SummaryVisbilty   ="visible";
  this.ChargeVisbilty = "collapse";
}

public hideOrderSummary(){
  this.OrderVisbilty = "visible";
  this.SummaryVisbilty   ="collapse";

}

public  deleteOrderLine(LineNumber:number){// Deletes Line then changes all line numbers after it by - 1
  console.log(LineNumber);
  if ((this.OrderItemList.length == 0 || this.OrderItemList.length == 1)  && LineNumber == 1){ //Code resets line number 1
    this.OrderItemList=[];
        this.ItemCode = "";
        this.Quantity = "1";
         this.Price = null;
        this.Currency = "";

        this.Attribute1= []
        this. Attribute1Setcodes =[]
        this. selectedAtt1Index= null;
        this.SelectedAttribute1 = undefined;
        
        this. Attribute2 = []
        this. Attribute2Setcodes= []
        this. selectedAtt2Index= null;
        this.SelectedAttribute2 = undefined;
  
       this. SelectedGenericItemCode= ""
       this.selectedGenericIndex = null;

        this.LineNumber = 1;
        this.previousLineEnabled = false;
        this.minusQtyEnabled = false;


        return;
  }
 //Need to get rid of Attribute lists as well as the OrderItemList record
  this.OrderItemList.splice(LineNumber - 1,1);
  this.Attribute1List.splice(LineNumber - 1,1);
  this.Attribute2List.splice(LineNumber - 1,1);


  this.OrderItemList.forEach(element => {
    if(element.LineNumber > LineNumber){ //Bigger item numbers need their Line numbers reduced
    element.LineNumber = element.LineNumber - 1;
    }

    if(this.LineNumber == this.OrderItemList.length ){ // This would be line 1
      this.nextLineEnabled = false;
     }

    
  });
  if(LineNumber > this.OrderItemList.length){
    this.showOrderLine(LineNumber - 1);
  }
  else{
  this.showOrderLine(LineNumber);
  }

}

    public addOrderLine(){ // Code for Adding order line if the length is at max then current  record hasnt been added neds to be pushed in
      this.message = "";

        if (this.OrderItemList.length == (this.LineNumber - 1)) {
        this.OrderItemList.push({LineNumber:this.LineNumber, ItemCode: this.ItemCode , Quantity: this.Quantity, ArEntity: this.appComponent.ArEntity,
          InEntity: this.appComponent.InEntity,   GenericItemIndex: this.selectedGenericIndex,
           Attribute1Index:this.selectedAtt1Index, Attribute2Index:this.selectedAtt2Index,Price:this.Price,Currency:this.Currency,VatAmount:this.VatAmount
   }) ;         
        this.Attribute1List.push({LineNumber:this.LineNumber,SetCodeDescription:this.Attribute1,SetCode:this.Attribute1Setcodes})
        this.Attribute2List.push({LineNumber:this.LineNumber,SetCodeDescription:this.Attribute2,SetCode:this.Attribute2Setcodes})

        this.LineNumber = this.OrderItemList.length + 1;
        }
        else{

          this.updateOrderLine(this.LineNumber); // Record exists update the order line.


            this.LineNumber = this.OrderItemList.length + 1;

        }
        
        
      // Reset everything for the new order line inculding the index's
        this.ItemCode = "";
        this.Attribute1 = [];
        this.SelectedAttribute1 = undefined;
        this.Attribute2 = [];
        this.SelectedAttribute2 = undefined;
        this.selectedGenericIndex = null;

        this.Quantity = "1";
        this.Price = null;
        this.Currency = "";
     
        this.AttributeVisbilty ="collapse";

        this.previousLineEnabled = true;
        this.nextLineEnabled = false;
        this.minusQtyEnabled = false;

    }
    
    public submitOrderLine(){ //This will trigger on show  Order Summary as new line might not have been submitted (Look into moving it to hideOrderLines)
      this.message = "";
    if(this.ItemCode != "" && this.ItemCode != undefined){
        if (this.OrderItemList.length == (this.LineNumber - 1) ) {
        this.OrderItemList.push({LineNumber:this.LineNumber, ItemCode: this.ItemCode , Quantity: this.Quantity, ArEntity: this.appComponent.ArEntity,
          InEntity: this.appComponent.InEntity, GenericItemIndex: this.selectedGenericIndex,
          Attribute1Index:this.selectedAtt1Index, Attribute2Index:this.selectedAtt2Index, Price:this.Price, Currency:this.Currency,VatAmount:this.VatAmount}) ;       
          
          this.Attribute1List.push({LineNumber:this.LineNumber,SetCodeDescription:this.Attribute1,SetCode:this.Attribute1Setcodes})
          this.Attribute2List.push({LineNumber:this.LineNumber,SetCodeDescription:this.Attribute2,SetCode:this.Attribute2Setcodes})
        
        }
        else{
            this.updateOrderLine(this.LineNumber);

        }
        
      }

       
    }
   

  public updateOrderLine(LineNumber:number){ //Index is always LineNumber - 1 as 0 is a element for the first line 1. Not like Progress starts at 0.

    this.OrderItemList[LineNumber - 1].ItemCode = this.ItemCode  ;
    this.OrderItemList[LineNumber - 1].Quantity = this.Quantity;    
    this.OrderItemList[LineNumber - 1].Price = this.Price  ;
    this.OrderItemList[LineNumber - 1].VatAmount = this.VatAmount;
    this.OrderItemList[LineNumber - 1].Currency = this.Currency;    

    this.Attribute1List[LineNumber - 1].SetCodeDescription = this.Attribute1 ;
    this.Attribute1List[LineNumber - 1].SetCode = this.Attribute1Setcodes ;

    this.Attribute2List[LineNumber - 1].SetCodeDescription = this.Attribute2 ;
    this.Attribute2List[LineNumber - 1].SetCode = this.Attribute2Setcodes ;

    this.OrderItemList[LineNumber - 1].Attribute1Index =   this.selectedAtt1Index;
    this.OrderItemList[LineNumber - 1].Attribute2Index = this.selectedAtt2Index ;
    this.OrderItemList[LineNumber - 1].GenericItemIndex =  this.selectedGenericIndex;

  }

  public showOrderLine(LineNumber:number){//Attribute Arrays need to be set with the list that relates to the order line..

    
    this.ItemCode =  this.OrderItemList[LineNumber - 1].ItemCode;
    this.Quantity = this.OrderItemList[LineNumber - 1 ].Quantity;
    this.LineNumber =  this.OrderItemList[LineNumber - 1].LineNumber;

    this.Price  =    this.OrderItemList[LineNumber - 1].Price; 
    this.Currency =  this.OrderItemList[LineNumber - 1].Currency;

    
    this.Attribute1   = this.Attribute1List[LineNumber - 1 ].SetCodeDescription;
    this.Attribute1Setcodes  = this.Attribute1List[LineNumber - 1 ].SetCode;

    this.Attribute2   = this.Attribute2List[LineNumber - 1 ].SetCodeDescription;
    this.Attribute2Setcodes  = this.Attribute2List[LineNumber - 1 ].SetCode;

    this.selectedGenericIndex = this.OrderItemList[LineNumber - 1 ].GenericItemIndex;
    this.selectedAtt1Index = this.OrderItemList[LineNumber - 1 ].Attribute1Index;
    this.selectedAtt2Index = this.OrderItemList[LineNumber - 1 ].Attribute2Index;
   
 



  }

    public reset(){ //Mass reset is currently triggred on Order Submit  

        this.OrderItemList=[];
        this.ItemCode = "";
        this.Quantity = "1";
        this.CustomerCode = "";
        this.WarehouseCode = "";
        this.CustomerPurchaseOrder = "";
        this.LineNumber = 1;
        this.MaxOrderLine = 1;
        this.ShipName = "";
        this.ShipAddress1 = "";
        this.ShipAddress2 = "";
        this.ShipAddress3= "";
        this.ShipAddress4 = ""
        this.ShipAddress5= "";
        this.ShipCity= "";
        this.ShipPostCode = "";
        this.minusQtyEnabled = false;
        this.nextLineEnabled = false;
         this.previousLineEnabled = false;

        this.orderLinesEnabled = false;
        this.deliveryAddressEnabled = false;
        this.summaryEnabled = false;
        this.AddChargesEnabled = false;



        
    this.Attribute1= []
    this. Attribute1Setcodes =[]
    this. selectedAtt1Index= null;
    this.SelectedAttribute1 = undefined;



    this. Attribute2 = []
    this. Attribute2Setcodes= []
    this. selectedAtt2Index= null;
    this.SelectedAttribute2 = undefined;

  
   this. SelectedGenericItemCode= ""
   this.selectedGenericIndex = null;
   this.selectedCustomerIndex =null;
  

   this.Price = null;
   this.Currency = "";

    }

    public resetLines(){  //Dan wants this changed to delete order Line instead of reset lines ( Mainly used for testing) 

        this.OrderItemList=[];
        this.ItemCode = "";
        this.Quantity = "";
        this.message = "";

        this.LineNumber = 1;

    }

    public previousOrderLine(){ //Push in new data if new record (from add Order line) if not update Order Line is ran
        if (this.OrderItemList.length  == (this.LineNumber - 1) && this.OrderItemList.length != 0 ) {
            this.OrderItemList.push({LineNumber:this.LineNumber, ItemCode: this.ItemCode , Quantity: this.Quantity, ArEntity: this.appComponent.ArEntity,
              InEntity: this.appComponent.InEntity,GenericItemIndex: this.selectedGenericIndex,
              Attribute1Index:this.selectedAtt1Index, Attribute2Index:this.selectedAtt2Index, Price:this.Price,Currency:this.Currency,VatAmount:this.VatAmount}) ;
              
              this.Attribute1List.push({LineNumber:this.LineNumber,SetCodeDescription:this.Attribute1,SetCode:this.Attribute1Setcodes});
              this.Attribute2List.push({LineNumber:this.LineNumber,SetCodeDescription:this.Attribute2,SetCode:this.Attribute2Setcodes});
        this.LineNumber = this.LineNumber- 1;
        
        this.showOrderLine(this.LineNumber);


        
        this.message = "";

            } else {

        if (this.LineNumber != 1){
            
          this.updateOrderLine(this.LineNumber);



         this.LineNumber = this.LineNumber- 1;

         this.showOrderLine(this.LineNumber);

        this.message = "";

        }
      else{
        //OLD Code- Shouldnt be triggred 
        alert("Can't go below Line Number 1");

   return;
      }
       if(this.LineNumber == 1){
        this.previousLineEnabled = false;
       }
    }
    this.nextLineEnabled = true;
    }

    public nextOrderLine(){ // No Push required as next is disabled at the last order line. Only way to add on the last one is to press "Add new order line" 
      if (this.OrderItemList.length !=0 && this.LineNumber  < this.OrderItemList.length )
   {  
       this.updateOrderLine(this.LineNumber);


         this.message = "";

          }
        if (this.LineNumber != this.OrderItemList.length && this.LineNumber < this.OrderItemList.length ){
         this.LineNumber = this.LineNumber + 1;

       this.showOrderLine(this.LineNumber);

        this.message = "";

        }
      else{
        if (this.OrderItemList.length == 0){
          alert("Cant go above " + (1) + ". Please add more Order Lines." );
        }
        else{
          alert("Cant go above " + (this.LineNumber ) + ". Please add more Order Lines." );
        }
      }
         if(this.LineNumber == this.OrderItemList.length ){
          this.nextLineEnabled = false;
         }
        this.previousLineEnabled = true;
    }



   public minusQty(){ // Code for minus button on the Quanity 
   

    this.Quantity = String(Number(this.Quantity) - 1);

    if (Number(this.Quantity) == 1 ){
      this.minusQtyEnabled = false
    }
   }

   public checkqty() {
    alert(this.Quantity);
   }

   public addQty(){ // Code for + button on the Quanity 
   if(this.Quantity == undefined){ // Always Set to 1 on create but user can delete 1 and then press +. This code resets it to 1
    this.Quantity = "1";
    return;
   }

    this.Quantity = String(Number(this.Quantity) + 1);
    this.minusQtyEnabled = true
   }

   public deleteChargeCode(LineNumber:string) {
  
      const filteredElement = this.AddCharges.find(el => el.AddChargeCode === LineNumber)
      this.iRowNum = this.AddCharges.indexOf(filteredElement);
    
      this.AddCharges.splice(this.iRowNum,1);

   }

   public AddChargeCodes() {

    this.AdditionalChargeCodePostService
    .postData({ArEntity: this.appComponent.ArEntity})
          
    .subscribe(response => { 
      console.log(response);

      this.AdditionalCharges = response.body.gttAdditionalChargeV1.map(item => new String(
        item.ChargeCode
      ));          
   
    });
  
  }

  public GetChargeValue(args: SelectedIndexChangedEventData){

    this.AdditionalChargeValuePostService
    .postData({ArEntity: this.appComponent.ArEntity,
              ChargeCode: this.AdditionalCharges[args.newIndex],
              OpenValue: this.OpenValue})
          
    .subscribe(response => { 
      console.log(response);


   
    });

  }

    private makePostRequest() { // The main request which sumbits the Order

     this.submitOrderLine();

     if(this.OrderItemList.length == 0){ //Code shouldnt trigger but this acts as a fail safe if the button is pressed with no order lines
      alert("Please Enter Order Lines");
      this.isItemVisible = false;
      return;

     }

        this.OrderPackageRequest = [ {CustomerCode: this.CustomerCode ,
            WarehouseCode: this.WarehouseCode,
            CustomerPurchaseOrder: this.CustomerPurchaseOrder,
            OrderItemList: this.OrderItemList,
            AddChargesList:this.AddCharges,
           ShipName: this.ShipName,
           ShipAddress1: this.ShipAddress1,
           ShipAddress2: this.ShipAddress2,
           ShipAddress3: this.ShipAddress3,
           ShipAddress4: this.ShipAddress4,
           ShipAddress5: this.ShipAddress5,
           ShipCity:this.ShipCity,
          ShipPostCode:this.ShipPostCode,
          ArEntity: this.appComponent.ArEntity,
          InEntity: this.appComponent.InEntity} ];

        this.myPostService
                        

            .postData({ //Data is posted as JSON data so the input param on the backend doesnt need to change if more fields are to be added
                       OrderPackageRequest:this.OrderPackageRequest}
                     )
             
            .subscribe(response => {

                //console.log(response.body.dsOrderPackageRequest.OrderPackageRequest[0].ErrorMessage);
             if (response.body.dsOrderPackageRequest.OrderPackageRequest[0].ErrorMessage != ""){
              alert(response.body.dsOrderPackageRequest.OrderPackageRequest[0].ErrorMessage);
              return;

                }        else{ 

                  alert("Order has been submitted!");
               // console.log(response.body.EdiSalesOrder);
               // this.JsonFormat(response.body.data);
    
                this.isItemVisible = true;

                this.reset();
                }
               
            }, error => {
              alert(error.message);
              })    ;
            
        
    }

    private JsonFormat(json : any){ //Not Used
       json = JSON.stringify(json).replace("[","");
       json  = json.replace("]","");
       json  = json.replace("{","");
       json  = json.replace("}",""); 
       json  = json.replace(/\"/g,""); 
       this.message =json; 

    }

    
}



  
  


