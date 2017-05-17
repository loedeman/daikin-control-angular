import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { MenuComponent } from './components/menu.component';
import { AlertComponent } from './components/alert.component';
import { PowerButtonComponent } from './components/power-button.component';
import { OperationModeComponent } from './components/operation-mode.component';
import { FanModeComponent } from './components/fan-mode.component';
import { WingsDirectionComponent } from './components/wings-direction.component';
import { TargetTemperatureComponent } from './components/target-temperature.component';
import { TemperaturesComponent } from './components/temperatures.component';

import { AircoService } from './services/airco.service';
import { ConfigurationService } from './services/configuration.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
 ],
  declarations: [
    AppComponent,
    MenuComponent,
    AlertComponent,
    PowerButtonComponent,
    OperationModeComponent,
    FanModeComponent,
    WingsDirectionComponent,
    TargetTemperatureComponent,
    TemperaturesComponent
  ],
  providers: [
    ConfigurationService,
    AircoService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
