import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';

import { Router } from '@angular/router';

import { KernelfeetService } from '../kernelfeet.service';

import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { JSONloginRequest, JSONavailableRequest } from '../ibv-types-adhoc';

import { Location } from '@angular/common'



@Component({
  selector: 'app-screen21acc',
  templateUrl: './screen21acc.component.html',
  styleUrl: './screen21acc.component.css'
})
export class Screen21accComponent implements OnInit, OnDestroy {

  private divAutorizando: any;
  private divAutorizadoOk: any;
  private divAutorizadoError: any;
  private divAvailabler: any;
  private divAvailablerOk: any;
  private divAvailablerError: any;
  private divAvailablel: any;
  private divAvailablelOk: any;
  private divAvailablelError: any;

  private webservice_requestLoginJson: JSONloginRequest;
  private webservice_requestRightJson: JSONavailableRequest;
  private webservice_requestLeftJson: JSONavailableRequest;
  private webservice_base_url: string;

  public mytext_app: string;
  public mytext_autorizando: string;
  public mytext_autorizadoOk: string;
  public mytext_autorizadoError: string;
  public mytext_availabler: string;
  public mytext_availablerOk: string;
  public mytext_availablerError: string;
  public mytext_availablel: string;
  public mytext_availablelOk: string;
  public mytext_availablelError: string;
  public mytext_back: string;
  public mytext_continue: string;

  public mytext_dataCode: string;

  public flagSomeAvailable: boolean = false;



  constructor(private router: Router, public global_service: KernelfeetService, private http: HttpClient, private location: Location){
    this.mytext_app = global_service.text_app();
    this.mytext_autorizando = global_service.text_autorizando();
    this.mytext_autorizadoOk = global_service.text_autorizadoOk();
    this.mytext_autorizadoError = global_service.text_autorizadoError();
    this.mytext_availabler = global_service.text_availabler();
    this.mytext_availablerOk = global_service.text_availablerOk();
    this.mytext_availablerError = global_service.text_availablerError();
    this.mytext_availablel = global_service.text_availablel();
    this.mytext_availablelOk = global_service.text_availablelOk();
    this.mytext_availablelError = global_service.text_availablelError();
    this.mytext_back = global_service.text_back();
    this.mytext_continue = global_service.text_continue();

    this.mytext_dataCode = global_service.the_request_code(); //importante

    this.webservice_requestLoginJson = {
      client_id: global_service.webservice_client_id(),
      client_secret: global_service.webservice_client_secret(),
      username: global_service.webservice_username(),
      password: global_service.webservice_password(),
      grant_type: global_service.webservice_grant_type(),
      pass_encript: '1'
    };
    //license_code: global_service.webservice_license_code()
    //device: global_service.webservice_device()

    this.webservice_requestRightJson = {
      request_code: global_service.the_request_code(),
      foot_type: 2
    };

    this.webservice_requestLeftJson = {
      request_code: global_service.the_request_code(),
      foot_type: 1
    };

    this.webservice_base_url = global_service.webservice_base_url();
  }


  ngOnInit(){

    this.divAutorizando = document.getElementById("div_autorizando");
    this.divAutorizadoOk = document.getElementById("div_autorizado_ok");
    this.divAutorizadoError = document.getElementById("div_autorizado_error");

    this.divAvailabler = document.getElementById("div_availabler");
    this.divAvailablerOk = document.getElementById("div_availabler_ok");
    this.divAvailablerError = document.getElementById("div_availabler_error");

    this.divAvailablel = document.getElementById("div_availablel");
    this.divAvailablelOk = document.getElementById("div_availablel_ok");
    this.divAvailablelError = document.getElementById("div_availablel_error");

    this.global_service.set_isAvailableRight(false);
    this.global_service.set_isAvailableLeft(false);
    this.flagSomeAvailable = false;

    this.webservice_login();
  }


  ngOnDestroy(){}



  private webservice_login(){

    this.divAutorizando.removeAttribute("hidden");

    this.global_service.set_feet_accesstoken('none');
    this.global_service.set_isAuthenticated(false);

    const httpOptionsZero = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    const localUrl = this.webservice_base_url + "/auth/authorize";

    this.http.post(localUrl, this.webservice_requestLoginJson, httpOptionsZero).subscribe({  
      next: resp => this.postLoginOk(resp),  
      error: err => this.postLoginErr(err.message),  
      complete: () => this.postLoginComplete()  
    });

  }


  private postLoginOk(respjson: any){

    if (respjson !== null){

      this.divAutorizando.setAttribute("hidden", "hidden");
      this.divAutorizadoOk.removeAttribute("hidden");
      this.global_service.set_feet_accesstoken(respjson.access_token);
      this.global_service.set_isAuthenticated(true);
    }
    else{
      this.postLoginErr('err.login.21');
    }
  }


  private postLoginErr(msgError: string){

    this.divAutorizando.setAttribute("hidden", "hidden");
    this.divAutorizadoError.removeAttribute("hidden");
  }


  private postLoginComplete(){

    if (this.global_service.is_authenticated()){
      this.webservice_availableLeft();
      //this.webservice_availableRight();
    }
  }


  private postLeftErr(msgErrorL: string){
    this.divAvailablel.setAttribute("hidden", "hidden");
    this.divAvailablelError.removeAttribute("hidden");
    console.log(msgErrorL);
    //necesario
    this.webservice_availableRight();
  }
  private postLeftComplete(){
    console.log('left-COMPLETE');
    //necesario
    this.webservice_availableRight();
  }


  private webservice_availableLeft(){

    this.divAvailablel.removeAttribute("hidden");

    let str_authL: string = 'Bearer ' + this.global_service.feet_accesstoken();

    const httpOptionsLeft = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': str_authL
      })
    };

    const localUrlLeft = this.webservice_base_url + "/models/available3d";

    this.http.post(localUrlLeft, this.webservice_requestLeftJson, httpOptionsLeft).subscribe({  
      next: resp => this.postLeftOk(resp),  
      error: err => this.postLeftErr(err.message),  
      complete: () => this.postLeftComplete()  
    });

  }

  private postLeftOk(respjsonL: any){

    if (respjsonL !== null){
      let str_error_code: string = JSON.stringify(respjsonL.error_code);
      let numberResponseInfo: Number = Number(respjsonL.info);
      if ((numberResponseInfo.valueOf() === 0) || (numberResponseInfo.valueOf() === 1)){

        //nOOO str_error_code.includes('"1D_MES":0,"3D_MODEL":0')
        if (str_error_code.includes('"3D_MODEL":0,"1D_MES":0')){
          this.divAvailablel.setAttribute("hidden", "hidden");
          this.divAvailablelOk.removeAttribute("hidden");
          this.global_service.set_isAvailableLeft(true);
          this.flagSomeAvailable = true;
        }
        else{
          this.postLeftErr('Error-01l');
        }

      }
      else{
        this.postLeftErr('Error-02l');
      }

    }
    else{
      this.postLeftErr('Error-03l');
    }
  }



  private webservice_availableRight(){

    this.divAvailabler.removeAttribute("hidden");

    let str_authR: string = 'Bearer ' + this.global_service.feet_accesstoken();

    const httpOptionsRight = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': str_authR
      })
    };

    const localUrlRight = this.webservice_base_url + "/models/available3d";

    this.http.post(localUrlRight, this.webservice_requestRightJson, httpOptionsRight).subscribe({  
      next: resp => this.postRightOk(resp),  
      error: err => this.postRightErr(err.message),  
      complete: () => this.postRightComplete()  
    });

  }

  private postRightOk(respjsonR: any){

    if (respjsonR !== null){
      let str_error_code: string = JSON.stringify(respjsonR.error_code);
      let numberResponseInfo: Number = Number(respjsonR.info);
      if ((numberResponseInfo.valueOf() === 0) || (numberResponseInfo.valueOf() === 1)){

        //nOOO str_error_code.includes('"1D_MES":0,"3D_MODEL":0')
        if (str_error_code.includes('"3D_MODEL":0,"1D_MES":0')){
          this.divAvailabler.setAttribute("hidden", "hidden");
          this.divAvailablerOk.removeAttribute("hidden");
          this.global_service.set_isAvailableRight(true);
          this.flagSomeAvailable = true;
        }
        else{
          this.postRightErr('Error-01r');
        }
      }
      else{
        this.postRightErr('Error-02r');
      }

    }
    else{
      this.postRightErr('Error-03r');
    }
  }


  private postRightErr(msgErrorR: string){
    //alert(this.txtLog);

    this.divAvailabler.setAttribute("hidden", "hidden");
    this.divAvailablerError.removeAttribute("hidden");
    console.log(msgErrorR);
    //innecesario this.webservice_availableLeft();
  }

  private postRightComplete(){
    console.log('right-COMPLETE');
    //innecesario this.webservice_availableLeft();
  }


  public actionBack() {
    //this.router.navigateByUrl('/screen01acc');
    this.location.back();
  }

  public actionContinue() {
    //before
    if (this.global_service.is_availableLeft() && this.global_service.is_availableRight()){
      this.global_service.set_isFirstFoot(false);
    }
    else{
      this.global_service.set_isFirstFoot(true);
    }
    //after
    this.router.navigateByUrl('/screen22acc');
  }

}
