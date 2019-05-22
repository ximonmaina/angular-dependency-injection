import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDemoComponent } from './user-demo/user-demo.component';
import { AnalyticsDemoComponent } from './analytics-demo/analytics-demo.component';
import {AnalyticsService} from './services/analytics.service';
import {AnalyticsImplementation, Metric} from './analytics-demo/analytics.demo.interface';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserDemoComponent,
    AnalyticsDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    { provide: 'API_URL', useValue: 'http://devserver.com'},

    {
      // AnalyticsService is the _token_ we use tor inject
      // note, the token is the class, but it's just used as an identifier
      provide: AnalyticsService,

      // add our dependencies to specify the factory dependencies
      deps: [HttpClient, 'API_URL'],

      // useFactory is a function - whatever is returned from this function
      // will be injected
      // arguments match the deps order
      useFactory(http: HttpClient, apiUrl: string) {

        // create an implementation that will log the event
        const loggingImplementation: AnalyticsImplementation = {
          recordEvent: (metric: Metric): void => {
            console.log('The metric is:', metric);
            console.log('Sending to: ', apiUrl);
            // ...You'd send the metric using http here...
          }
        };

        // create our new 'AnalyticsService' with implementation
        return new AnalyticsService(loggingImplementation);
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AnalyticsModule { }
