import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DropDownModule } from "nativescript-drop-down/angular"
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BrowseRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        DropDownModule,
        NativeScriptUIListViewModule
        
        
    ],
    declarations: [
        BrowseComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],

})
export class BrowseModule { }
