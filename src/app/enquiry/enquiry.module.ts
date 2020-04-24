import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";


import { EnquiryRoutingModule } from "./enquiry-routing.module";
import { EnquiryComponent } from "./enquiry.component";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import {DatePipe} from '@angular/common';
@NgModule({
    imports: [
        NativeScriptCommonModule,
        EnquiryRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        EnquiryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [DatePipe]

})
export class EnquiryModule { }
