import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { ServiceWorkerModule } from "@angular/service-worker"

import { ClickOutsideModule } from "ng-click-outside"
import { NgScrollbarModule } from "ngx-scrollbar"

import { environment } from "../environments/environment"

import { AppComponent } from "./app.component"
import { AwaitFontDirective } from "./await-font.directive"
import { BackToTopComponent } from "./back-to-top/back-to-top.component"
import { InputRangeComponent, InputSwitchComponent } from "./controls"
import { HelpComponent } from "./help/help.component"
import { IconButtonComponent } from "./icon-button/icon-button.component"
import { IconComponent } from "./icon/icon.component"
import { LegalComponent } from "./legal/legal.component"
import {
  CurrencyPipe,
  EffectValuePipe,
  KeysPipe,
  PricePipe,
  PriceRangePipe,
} from "./pipes"
import { DesignTypePipe } from "./pipes/design-type.pipe"
import {
  PrimaryButtonComponent,
} from "./primary-button/primary-button.component"
import { AdvisorComponent } from "./results/advisor/advisor.component"
import { BlueprintComponent } from "./results/blueprint/blueprint.component"
import { ConsumableComponent } from "./results/consumable/consumable.component"
import { MaterialComponent } from "./results/material/material.component"
import { DesignComponent } from "./results/design/design.component"
import { ItemComponent } from "./results/item/item.component"
import {
  MarketplaceComponent,
} from "./results/marketplace/marketplace.component"
import { ResultsComponent } from "./results/results.component"
import { ShellComponent } from "./results/shell/shell.component"
import { VendorsComponent } from "./results/vendors/vendors.component"
import { ScrollbarComponent } from "./scrollbar/scrollbar.component"
import { SearchComponent } from "./search/search.component"
import { SettingsComponent } from "./settings/settings.component"
import { SidebarComponent } from "./sidebar/sidebar.component"
import { TabsComponent } from "./tabs/tabs.component"
import { TooltipComponent } from "./tooltip/tooltip.component"
import { UpdateComponent } from "./update/update.component"

@NgModule({ declarations: [
        AdvisorComponent,
        AppComponent,
        AwaitFontDirective,
        BackToTopComponent,
        BlueprintComponent,
        ConsumableComponent,
        MaterialComponent,
        CurrencyPipe,
        DesignComponent,
        DesignTypePipe,
        EffectValuePipe,
        HelpComponent,
        IconButtonComponent,
        IconComponent,
        InputRangeComponent,
        InputSwitchComponent,
        ItemComponent,
        KeysPipe,
        LegalComponent,
        MarketplaceComponent,
        PricePipe,
        PriceRangePipe,
        PrimaryButtonComponent,
        ResultsComponent,
        ScrollbarComponent,
        SearchComponent,
        SettingsComponent,
        ShellComponent,
        SidebarComponent,
        TabsComponent,
        TooltipComponent,
        UpdateComponent,
        VendorsComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        NgScrollbarModule,
        ReactiveFormsModule,
        RouterModule.forRoot([], {}),
        ClickOutsideModule,
        ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })], providers: [
        PricePipe,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
