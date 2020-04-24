import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { EnquiryComponent } from "./enquiry.component";

const routes: Routes = [
    { path: "default", component: EnquiryComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EnquiryRoutingModule { }
