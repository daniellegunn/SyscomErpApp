import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";


@Injectable()
export class MyHttpPostService {
    private serverUrl;
    private response;
    private testdata;

    constructor(private http: HttpClient) { }

    postData(body: any) {
        const httpOptions: { headers; observe; } = {
            headers: new HttpHeaders({
                "accept": "application/json"
                
            }),
            observe: 'response'
          };
          
          let data: HttpParams = new HttpParams();
            data  =  data.append('UserID', body.Username);
            data = data.append('Password', body.Password);
        
          
            this.serverUrl = body.url + "/ErpApp/rest/ErpApp/ErpAppLogin";
          
         
       // console.log(httpOptions);
          this.testdata =  this.http.post(this.serverUrl,data, httpOptions )  ;
          this.response =  this.testdata;
          return this.testdata;
        
       
    }

   
}

export class CustomerPostService {
    private serverUrl;
    private response;
    private testdata;

    constructor(private http: HttpClient) { }

    postData(body: any) {
        const httpOptions: { headers; observe; } = {
            headers: new HttpHeaders({
                "accept": "application/json"
                
            }),
            observe: 'response'
          };
          
          let data: HttpParams = new HttpParams();
          data =  data.append('pcArEntity', body.ArEntity);
          this.serverUrl = body.url + "/ErpApp/rest/ErpApp/getCustomerCode";
         
          this.testdata = this.http.post(this.serverUrl,data, httpOptions )  ;
          this.response = this.testdata;
          return this.testdata;
    }

}

export class WarehousePostService {
    private serverUrl;
    private response;
    private testdata;

    constructor(private http: HttpClient) { }

    postData(body: any) {
        const httpOptions: { headers; observe; } = {
            headers: new HttpHeaders({
                "accept": "application/json"
                
            }),
            observe: 'response'
          };
          
        let data: HttpParams = new HttpParams();
        data = data.append('pcInEntity', body.ArEntity);
        data = data.append('pcGlEntity', body.GlEntity);
        data = data.append('plRestricted', body.Restricted);
        this.serverUrl = body.url + "/ErpApp/rest/ErpApp/GetWarehouseCodes";
         
        this.testdata = this.http.post(this.serverUrl,data, httpOptions )  ;
        this.response = this.testdata;
        return this.testdata;
        
    }
}