import { Component, OnInit } from "@angular/core";
import { DataService, IDataItem } from "../app/shared/data.service";

@Component({
    selector: "login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    items: Array<IDataItem>;

    constructor(private _itemService: DataService) { }

    ngOnInit(): void {
        this.items = this._itemService.getItems();
    }

}
