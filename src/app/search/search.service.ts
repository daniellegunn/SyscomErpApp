import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";

@Injectable()

export class ItemClass {
    constructor( public iIndex: number,
      public ItemCode: string,
       public Storage: string,
       public QuantityOnHand: number,
       public QuantityOnPps: number,
       public QuantityAlloc :number,
       public QuantityOriginal: number,
       public Cost : number) { }
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
    private serverUrl;
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
          
        if (body.WarehouseCode == undefined || body.WarehouseCode == ""){
          this.serverUrl = body.url + "/ErpApp/rest/ErpApp/WarehouseEnquiry";
          let data: HttpParams = new HttpParams();

          data  = data.append('pcInEntity', body.InEntity);
          data = data.append('pcItemCode', body.ItemCode);
          this.testdata =  this.http.post(this.serverUrl,   data , httpOptions )  ;
          return this.testdata;
        }
       // console.log(httpOptions);
       else{
        this.serverUrl;
        let data: HttpParams = new HttpParams();
        data  = data.append('pcInEntity', body.InEntity);
        data = data.append('pcItemCode', body.ItemCode);
        data = data.append('pcWarehouseCode', body.WarehouseCode);
        this.serverUrl = body.url + "/ErpApp/rest/ErpApp/StockEnquiry";
          this.testdata =  this.http.post(this.serverUrl,   data , httpOptions )  ;
          return this.testdata;
       }
       
    }

    
   
}