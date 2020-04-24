import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";

@Injectable()

export class Order {
    constructor( 
      public OrderNumber: string,
       public OrderDate: string,
       public CustomerPurchaseOrder:String) { }
}

export class OrderList {
  constructor( 
    public OrderNumber: string,
    public OrderStatus: string,
   ) { }
}




export class OrderLine {
  constructor( 
    public OrderNumber: number,
     public LineNumber: number,
     public ItemCode: String,
     public Description: String,
     public UomCode: String,
     public GrossPrice:String,
     public  NetPrice:String ,
     public  WarehouseCode:String,
     public  QuantityOpenOrdered:Number,
     public  QuantityAllocated:Number,
     public  QuantityOnPps:number,
     public QuantityReserved:number,
     public  RequestDate:String,
      public WoNumber:String,
      ) { }
}

export class ItemStock {
  constructor( public iIndex: number,
     public ItemCode: string,
     public WarehouseCode: string,
     public cQuantityOnHand: string,
     public cQuantityOnPps: string,
     public cQuantityAlloc :string,
     public Cost : number,
     public QuantityCustomerOrder: number,
     public cQuantityOnPo: string,
     public cQuantityAvailable: string,
     public cDespatchNoteQty: string) { }
}
export class MyHttpPostService {
    private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/OrderEnquiry";
    private response;
    private testdata;
    private OrderDetailsData;

    constructor(private http: HttpClient) { }

   
 

    postData(body: any) {
        const httpOptions: { headers; observe; } = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded'
            }),
            observe: 'response'
          };
          
         
      // console.log(body.WarehouseCode);
        //console.log(data)
        this.serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/OrderEnquiry";
        let OrderData: HttpParams = new HttpParams();
        OrderData  = OrderData.append('pcArEntity', body.ArEntity);
        OrderData = OrderData.append('piOrderNumber', body.OrderNumber);
        
          this.OrderDetailsData =  this.http.post(this.serverUrl,   OrderData , httpOptions );
         
          //console.log(this.OrderDetailsData);

          return this.OrderDetailsData;
       
       
    }

    postCustomerData(body: any) {
      const httpOptions: { headers; observe; } = {
          headers: new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded'
          }),
          observe: 'response'
        };
        
       
       
    // console.log(body.WarehouseCode);
      //console.log(data)
      let data: HttpParams = new HttpParams();
      this.serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/CustomerOrderEnquiry";
      data  = data.append('pcArEntity', body.ArEntity);
      data = data.append('pcCustomerCode', body.CustomerCode);
      
        this.testdata =  this.http.post(this.serverUrl,   data , httpOptions )  ;
       


        return this.testdata;
     
     
  }


    
   
}