// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { DropDownModule } from "nativescript-drop-down/angular";

import { AppModule } from "./app/app.module";
import { LoginModule } from "./login/login.module";
platformNativeScriptDynamic().bootstrapModule(AppModule);
//platformNativeScriptDynamic().bootstrapModule(LoginModule);


