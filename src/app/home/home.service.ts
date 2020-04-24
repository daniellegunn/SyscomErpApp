import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";


@Injectable()
export class MyHttpPostService {
    private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/ErpAppLogin";
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
            data  =  data.append('Username', body.Username);
            data = data.append('Password', body.Password);
        
          
         
          
         
       // console.log(httpOptions);
          this.testdata =  this.http.post(this.serverUrl,data, httpOptions )  ;
          this.response =  this.testdata;
          return this.testdata;
        
       
    }

   
}

export class CustomerPostService {
    private serverUrl = "http://192.168.250.65:8980/ErpApp/rest/ErpApp/getCustomerCode";
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
            data  =  data.append('pcArEntity', body.ArEntity);
        
          
         
          
         
       // console.log(httpOptions);
          this.testdata =  this.http.post(this.serverUrl,data, httpOptions )  ;
          this.response =  this.testdata;
          return this.testdata;
        
       
    }

   
}