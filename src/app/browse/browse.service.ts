import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()

export class OrderPackageRequest{

  public CustomerCode: string;
  public WarehouseCode: string;
  public CustomerPurchaseOrder :string;
  public OrderItemList : Array<OrderItemList>;
  public AddChargesList : Array<AddChargesClass>;  
  public ShipName:string;
  public ShipAddress1:string;
  public ShipAddress2:string;
  public ShipAddress3:string;
  public ShipAddress4:string;
  public ShipAddress5:string;
  public ShipCity:string;
  public ShipPostCode:string;
  public ArEntity:string;
  public InEntity:string;
}

export class OrderItemList{
  public LineNumber: number;
  public ItemCode: string;
  public Quantity: string;
  public ArEntity:string;
  public InEntity:string;
  public GenericItemIndex:number;
  public Attribute1Index:number;
  public Attribute2Index:number;
  public Price:number;
  public Currency:string;
  public VatAmount:number;
  public GrossPrice:number;
  public NetPrice:number;


  
}


export class GenericItems {
  constructor( 
    public ItemCode: string,
   ) { }
}

export class Attribute1 {
  constructor( 
    public LineNumber: number,
    public SetCodeDescription:Array <string>,
    public SetCode:Array <string>,
 
   ) { }
}

export class Attribute2 {
  constructor( 
    public LineNumber: number,
    public SetCodeDescription:Array <string>,
    public SetCode:Array <string>,
 
   ) { }
}

export class AddChargesClass {
  constructor( public iIndex: number,
     public AddChargeCode: string,
     public AddChargeValue: string,
     public AddChargeDesc: string) { }
}


export class GenericItemPostService { //Request for the List Of Generic Items on the current InEntity
    private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/getGenericItems";
    private response;
    private testdata;

    constructor(private http: HttpClient) { }

    postData(body: any) {
      const httpOptions: { headers; observe; } = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded'
        }),
        observe: 'response'
      };
          
          let data: HttpParams = new HttpParams();
          data  = data.append('pcInEntity', body.InEntity);
          
       
        //console.log(data);
        
       // console.log(httpOptions);
          this.testdata =  this.http.post(this.serverUrl,   data , httpOptions );
          //console.log(this.testdata);
          return this.testdata;
        
       
    }

    
   
}

export class Attribute1ItemPostService { // Fetches Attribute 1 for selected Generic
  private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/getGenericAttribute1";
  private response;
  private testdata;

  constructor(private http: HttpClient) { }

  postData(body: any) {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
      observe: 'response'
    };
        
        let data: HttpParams = new HttpParams();
        data  = data.append('pcInEntity', body.InEntity);
        data  = data.append('pcGenericItemCode', body.GenericItemCode);
     
      //console.log(data);
      
     // console.log(httpOptions);
        this.testdata =  this.http.post(this.serverUrl,   data , httpOptions );
        //console.log(this.testdata);
        return this.testdata;
      
     
  }

  
 
}

export class Attribute2ItemPostService { // Fetches Attribute 2 for selected Generic
  private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/getGenericAttribute2";
  private response;
  private testdata;

  constructor(private http: HttpClient) { }

  postData(body: any) {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
      observe: 'response'
    };
        
        let data: HttpParams = new HttpParams();
        data  = data.append('pcInEntity', body.InEntity);
        data  = data.append('pcGenericItemCode', body.GenericItemCode);
     
      //console.log(data);
      
     // console.log(httpOptions);
        this.testdata =  this.http.post(this.serverUrl,   data , httpOptions );
        //console.log(this.testdata);
        return this.testdata;
      
     
  }

  
 
}

export class MyHttpPostService {  // Main Request. Submits the Order to EDI Entry if sucessful creates a .csv files
  private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/OrderEntry";
  private response;
  private testdata;

  constructor(private http: HttpClient) { }

  postData(data: any) {
      const httpOptions: { headers; observe;  } = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          }),
          observe: 'response' ,
          
          
        };
        
     
      //console.log(data);
      
     // console.log(httpOptions);
        this.testdata =  this.http.post(this.serverUrl,   data , httpOptions )  ;
        //console.log(this.testdata);
        return this.testdata;
      
     
  }

  
 
}

export class DeliveryAddressPostService { //Gets the default address for the current selected customer. Needs to be ran everytime the customer is changed
  private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/DeliveryAddressDefault";
  private response;
  private testdata;

  constructor(private http: HttpClient) { }

  postData(body: any) {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
      observe: 'response'
    };
        
        let data: HttpParams = new HttpParams();
        data  = data.append('pcCustomerCode', body.CustomerCode);
        data  = data.append('pcArEntity', body.ArEntity);
     
      //console.log(data);
      
     // console.log(httpOptions);
        this.testdata =  this.http.post(this.serverUrl,   data , httpOptions );
        //console.log(this.testdata);
        return this.testdata;
      
     
  }

  
 
}

export class AdditionalChargesPostService { //Gets the default address for the current selected customer. Needs to be ran everytime the customer is changed
  private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/AdditionalCharges";
  private response;
  private testdata;

  constructor(private http: HttpClient) { }

  postData(body: any) {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
      observe: 'response'
    };

  if(typeof body.OpenValue == 'undefined' && body.OpenValue != 0){

      body.OpenValue = 0;
   }    

        let data: HttpParams = new HttpParams();
        data  = data.append('pcArEntity', body.ArEntity);
        data  = data.append('pcInEntity', body.InEntity);
        data  = data.append('pcCustomerCode', body.CustomerCode);
        data  = data.append('piOrderValue', body.OpenValue.toString());
    
     // console.log(httpOptions);
        this.testdata =  this.http.post(this.serverUrl,   data , httpOptions );
        console.log(this.testdata);
        return this.testdata;
      
     
  }
}

export class AdditionalChargeCodePostService { //Gets the default address for the current selected customer. Needs to be ran everytime the customer is changed
  private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/AdditionalChargeCodes";
  private response;
  private testdata;

  constructor(private http: HttpClient) { }

  postData(body: any) {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
      observe: 'response'
    };

        let data: HttpParams = new HttpParams();
        data  = data.append('pcArEntity', body.ArEntity);
    
        this.testdata =  this.http.post(this.serverUrl,   data , httpOptions );
        console.log(this.testdata);
        return this.testdata;
      
     
  }
}

export class AdditionalChargeValuePostService { //Gets the default address for the current selected customer. Needs to be ran everytime the customer is changed
  private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/GetChargeValue";
  private response;
  private testdata;

  constructor(private http: HttpClient) { }

  postData(body: any) {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
      observe: 'response'
    };

    if(typeof body.OpenValue == 'undefined' && body.OpenValue != 0){

      body.OpenValue = 0;
    }   
//p
        let data: HttpParams = new HttpParams();
        data  = data.append('pcArEntity', body.ArEntity);
        data  = data.append('pcChargeCode', body.ChargeCode);
        data  = data.append('pdOrderValue', body.OpenValue.toString());
    
        this.testdata =  this.http.post(this.serverUrl,   data , httpOptions );
        console.log(this.testdata);
        return this.testdata;
      
  }
}

export class ItemDetailsPostService { //Gets Item record for the selected Item. Is used for Price1 and CurrencyCode currently which doesnt come from the Item table 
  private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/getItemDetails";
  private response;
  private testdata;

  constructor(private http: HttpClient) { }

  postData(body: any) {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
      observe: 'response'
    };
      
        let data: HttpParams = new HttpParams();
        data  = data.append('pcArEntity', body.ArEntity);
        data  = data.append('pcInEntity', body.InEntity);
        data  = data.append('pcItemCode', body.ItemCode);
        data  = data.append('pcCustomerCode', body.CustomerCode);
   

      //console.log(data);
      
     // console.log(httpOptions);
        this.testdata =  this.http.post(this.serverUrl,   data , httpOptions );
        //console.log(this.testdata);
        return this.testdata;

  }

  
 
}