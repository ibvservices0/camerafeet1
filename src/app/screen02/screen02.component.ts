import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';

import { Router } from '@angular/router';

import { KernelfeetService } from '../kernelfeet.service';

//import * as mytest from '../../scripts/mytest.js'
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { JSONloginRequest } from '../ibv-types-adhoc';


//import { HostListener } from '@angular/core';


@Component({
  selector: 'app-screen02',
  templateUrl: './screen02.component.html',
  styleUrl: './screen02.component.css'
})
export class Screen02Component implements OnInit, OnDestroy {

  //public isLandscape: boolean = false;

  //private dato: any;
  private divAutorizando: any;
  private divAutorizadoOk: any;
  private divAutorizadoError: any;

  /* */
  private webservice_requestLoginJson: JSONloginRequest;
  private webservice_base_url: string;
  /**/


  public mytext_app: string;
  public mytext_autorizando: string;
  public mytext_autorizadoOk: string;
  public mytext_autorizadoError: string;
  public mytext_left: string;
  public mytext_right: string;
  public mytext_threePhotos: string;
  public mytext_firstPhotoIs: string;
  public mytext_secondPhotoIs: string;
  public mytext_thirdPhotoIs: string;
  public mytext_fourCornersOfSheet : string;
  public mytext_fourCornersOfSheetBis : string;
  public mytext_firstMobileInLandscape: string;
  public mytext_selectFoot: string;
  private mytext_notAuthorizedToContinue: string;

  
  constructor(private router: Router, public global_service: KernelfeetService, private http: HttpClient){
    this.mytext_app = global_service.text_app();
    this.mytext_autorizando = global_service.text_autorizando();
    this.mytext_autorizadoOk = global_service.text_autorizadoOk();
    this.mytext_autorizadoError = global_service.text_autorizadoError();
    this.mytext_left = global_service.text_left();
    this.mytext_right = global_service.text_right();
    this.mytext_threePhotos = global_service.text_threePhotos();
    this.mytext_firstPhotoIs = global_service.text_firstPhotoIs();
    this.mytext_secondPhotoIs = global_service.text_secondPhotoIs();
    this.mytext_thirdPhotoIs = global_service.text_thirdPhotoIs();
    this.mytext_fourCornersOfSheet = global_service.text_fourCornersOfSheet();
    this.mytext_fourCornersOfSheetBis = global_service.text_fourCornersOfSheetBis();
    this.mytext_firstMobileInLandscape = global_service.text_firstMobileInLandscape();
    this.mytext_selectFoot = global_service.text_selectFoot();
    this.mytext_notAuthorizedToContinue = global_service.text_notAuthorizedToContinue();

    this.webservice_requestLoginJson = {
      client_id: global_service.webservice_client_id(),
      client_secret: global_service.webservice_client_secret(),
      username: global_service.webservice_username(),
      password: global_service.webservice_password(),
      grant_type: global_service.webservice_grant_type(),
      license_code: global_service.webservice_license_code(),
      device: global_service.webservice_device()
    };
    this.webservice_base_url = global_service.webservice_base_url();
  }


  ngOnInit(){
    //mytest.tester();
    this.webservice_login();
  }



  private webservice_login(){
    this.divAutorizando = document.getElementById("div_autorizando");
    this.divAutorizadoOk = document.getElementById("div_autorizado_ok");
    this.divAutorizadoError = document.getElementById("div_autorizado_error");
    this.divAutorizando.removeAttribute("hidden");
    this.divAutorizadoOk.setAttribute("hidden", "hidden");
    this.divAutorizadoError.setAttribute("hidden", "hidden");

    //localStorage.removeItem('feet_accesstoken');
    this.global_service.set_feet_accesstoken('none');
    this.global_service.set_isAuthenticated(false); //ATENCION-FAKE dejar_false

    const httpOptionsZero = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    const localUrl = this.webservice_base_url + "/auth/authorize";

    this.http.post(localUrl, this.webservice_requestLoginJson, httpOptionsZero).subscribe(
      (value:any) => { 
        this.divAutorizando.setAttribute("hidden", "hidden");
        this.divAutorizadoOk.removeAttribute("hidden");
        //localStorage.setItem('feet_accesstoken', value.access_token);
        this.global_service.set_feet_accesstoken(value.access_token);
        this.global_service.set_isAuthenticated(true);
        console.log('POST response OK') },
      error => {
        this.divAutorizando.setAttribute("hidden", "hidden");
        this.divAutorizadoError.removeAttribute("hidden");
        console.log('ERROR: ' + error)}
    );

  }


  private handleErrorWSlogin(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `WS-login Error: ${error.error.message}`;
    } else {
      // Server-side errors
      //errorMessage = `WS-login Error Code: ${error.status} -- Message: ${error.message}`;
      errorMessage = `WS-login Error Code: ${error.status}`;
    }
    return errorMessage;
  }
    


  ngOnDestroy(){}


  public actionScreen02left() {
    if (!this.global_service.is_authenticated()){
      alert(this.mytext_notAuthorizedToContinue);
    }
    else{
      this.global_service.set_isSheetUS(false);
      this.global_service.set_isSheetA4(true);  //ATENCION-FAKE
      this.global_service.set_isFootLeft(true);
      this.global_service.set_isFootRight(false);
      this.router.navigateByUrl('/screen03');

      //this.global_service.set_foot_measurements('{"IG":233.5,"BW":99,"FL":264.9,"BG":237}');
      //this.router.navigateByUrl('/screen07');
    }
  }

  public actionScreen02right() {
    if (!this.global_service.is_authenticated()){
      alert(this.mytext_notAuthorizedToContinue);
    }
    else{
      this.global_service.set_isSheetUS(false);
      this.global_service.set_isSheetA4(true);  //ATENCION-FAKE
      this.global_service.set_isFootRight(true);
      this.global_service.set_isFootLeft(false);
      this.router.navigateByUrl('/screen03');

      //this.global_service.set_foot_measurements('{"IG":233.5,"BW":99,"FL":264.9,"BG":237}');
      //this.router.navigateByUrl('/screen07');
    }
  }


  /*
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event) {
    if (this.global_service.is_android()){
      if (screen.orientation.type.includes('portrait')){this.isLandscape = false;}
      else if (screen.orientation.type.includes('landscape')){this.isLandscape = true;}
      else {this.isLandscape = false;}
    }
    else if (this.global_service.is_ios()){
      //orientation-Changed-iPHONE
      if (window.innerHeight > window.innerWidth){this.isLandscape = true;}
      else {this.isLandscape = false;}
    }
    else if (this.global_service.is_safari()){
      //orientation-Changed-iPAD
      if (window.innerHeight > window.innerWidth){this.isLandscape = true;}
      else {this.isLandscape = false;}
    }
    else{
      console.log('orientation-Changed');
    }
  }
  */


}
