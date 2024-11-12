import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';

import { Router } from '@angular/router';

import { KernelfeetService } from '../kernelfeet.service';

import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { JSONgetRequest } from '../ibv-types-adhoc';

import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';


import { Location } from '@angular/common'




export interface MyMeasureBoth {
  left: string;
  right: string;
}



@Component({
  selector: 'app-screen22acc',
  templateUrl: './screen22acc.component.html',
  styleUrl: './screen22acc.component.css'
})
export class Screen22accComponent implements OnInit, OnDestroy  {

  public mytext_app: string;

  private webservice_requestGetRightJson: JSONgetRequest;
  private webservice_requestGetLeftJson: JSONgetRequest;
  private webservice_base_url: string;

  public mytext_dataCode: string;


  public columnas: string[] = ['meas-left', 'meas-right'];
  public measures: MyMeasureBoth[] = [];
  @ViewChild(MatTable) tabla1!: MatTable<MyMeasureBoth>;


  public measures_left: string[] = [];
  public measures_right: string[] = [];

  public mytext_back: string;
  public mytext_continue: string;
  public flagSomeAvailable: boolean = false;



  constructor(private router: Router, public global_service: KernelfeetService, private http: HttpClient, private location: Location){
    this.mytext_app = global_service.text_app();
    this.mytext_back = global_service.text_back();
    //this.mytext_continue = global_service.text_continue();
    this.mytext_continue = global_service.text_actionRecommend();

    this.mytext_dataCode = global_service.the_request_code(); //importante

    this.webservice_requestGetRightJson = {
      request_code: global_service.the_request_code(),
      foot_type: 2,
      capabilities: '1D_MES'
    };

    this.webservice_requestGetLeftJson = {
      request_code: global_service.the_request_code(),
      foot_type: 1,
      capabilities: '1D_MES'
    };

    this.webservice_base_url = global_service.webservice_base_url();
  }


  ngOnInit(){

    this.flagSomeAvailable = false;
    this.measures_left = [];
    this.measures_right = [];
    this.measures = [];

    //before
    if (this.global_service.is_availableLeft() && this.global_service.is_availableRight()){
      this.global_service.set_isOppositePending(true);
    }
    else{
      this.global_service.set_isOppositePending(false);
    }
    //after
    if (this.global_service.is_availableLeft()){
      this.webservice_getLeft();
    }
    else if (this.global_service.is_availableRight()){
      this.webservice_getRight();
    }
    else{
      alert('ERROR');
    }

  }



  ngAfterViewInit(){
    this.tabla1.renderRows();
  }

  ngOnDestroy(){}


  private webservice_getLeft(){

    let str_authL: string = 'Bearer ' + this.global_service.feet_accesstoken();

    const httpOptionsLeft = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': str_authL
      })
    };

    const localUrlLeft = this.webservice_base_url + "/models/get3d";

    this.http.post(localUrlLeft, this.webservice_requestGetLeftJson, httpOptionsLeft).subscribe({  
      next: resp => this.postLeftOk(resp),  
      error: err => this.postLeftErr(err.message),  
      complete: () => this.postLeftComplete()  
    });

  }

  private postLeftErr(msgErrorL: string){
    console.log(msgErrorL);
    if (this.global_service.is_oppositePending()){
      this.global_service.set_isOppositePending(false);
      this.webservice_getRight();
    }
  }

  private postLeftComplete(){
    console.log('left-COMPLETE');
    if (this.global_service.is_oppositePending()){
      this.global_service.set_isOppositePending(false);
      this.webservice_getRight();
    }
  }




  private webservice_getRight(){

    let str_authR: string = 'Bearer ' + this.global_service.feet_accesstoken();

    const httpOptionsRight = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': str_authR
      })
    };

    const localUrlRight = this.webservice_base_url + "/models/get3d";

    this.http.post(localUrlRight, this.webservice_requestGetRightJson, httpOptionsRight).subscribe({  
      next: resp => this.postRightOk(resp),  
      error: err => this.postRightErr(err.message),  
      complete: () => this.postRightComplete()  
    });

  }


  private postRightErr(msgErrorR: string){
    console.log(msgErrorR);
    if (this.global_service.is_oppositePending()){
      this.global_service.set_isOppositePending(false);
      this.webservice_getLeft();
    }
  }

  private postRightComplete(){
    console.log('right-COMPLETE');
    if (this.global_service.is_oppositePending()){
      this.global_service.set_isOppositePending(false);
      this.webservice_getLeft();
    }
  }
  

  private postRightOk(respjsonR: any){
    //alert('postRightOK');
    if (respjsonR !== null){
      let str_error_code: string = JSON.stringify(respjsonR.error_code);
      let numberResponseInfo: Number = Number(respjsonR.info);
      if ((numberResponseInfo.valueOf() === 0) || (numberResponseInfo.valueOf() === 1)){

        //nOOO str_error_code.includes('"3D_MODEL":0,"1D_MES":0')
        if (str_error_code.includes('"1D_MES":0,"3D_MODEL":0')){
          let str_parameters: string = JSON.stringify(respjsonR.parameters);
          let str_parameters2: string = str_parameters.replace('{"1D_MES":{', '');
          let str_parameters3: string = str_parameters2.replace('}}', '');
          this.measures_right = str_parameters3.split(',');
          this.flagSomeAvailable = true;
          //alert('postRightOKrefresh');
          this.refresh_table();
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


  private postLeftOk(respjsonL: any){
    if (respjsonL !== null){
      let str_error_code: string = JSON.stringify(respjsonL.error_code);
      let numberResponseInfo: Number = Number(respjsonL.info);
      if ((numberResponseInfo.valueOf() === 0) || (numberResponseInfo.valueOf() === 1)){

        //nOOO str_error_code.includes('"3D_MODEL":0,"1D_MES":0')
        if (str_error_code.includes('"1D_MES":0,"3D_MODEL":0')){
          let str_parameters: string = JSON.stringify(respjsonL.parameters);
          let str_parameters2: string = str_parameters.replace('{"1D_MES":{', '');
          let str_parameters3: string = str_parameters2.replace('}}', '');
          this.measures_left = str_parameters3.split(',');
          this.flagSomeAvailable = true;
          this.refresh_table();
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



  private refresh_table(){

    let sizeArrLeft: number = this.measures_left.length;
    let sizeArrRight: number = this.measures_right.length;
    //let strLog: string = 'sizeL=' + sizeArrLeft.toString(10) + ' , ' + 'sizeR=' + sizeArrRight.toString(10);
    //alert(strLog);
    var sizeTable: number = 0;
    if (sizeArrLeft > sizeArrRight){sizeTable = sizeArrLeft;}
    else{sizeTable = sizeArrRight;}

    this.measures = []; //importante
    var ind: number = 0;
    
    while (ind < sizeTable){

      if ((sizeArrLeft > 0) && (sizeArrRight > 0)){
        
        let value0_left: string = this.measures_left[ind];
        let limL: number = 14;
        if (value0_left.length < limL) {limL = value0_left.length;}
        let value_left: string = value0_left.substring(0,limL);

        let value0_right: string = this.measures_right[ind];
        let limR: number = 14;
        if (value0_right.length < limR) {limR = value0_right.length;}
        let value_right: string = value0_right.substring(0,limR);
        
        let nextMeasureBoth: MyMeasureBoth = {
          left: value_left,
          right: value_right
        };
        this.measures.push(nextMeasureBoth);
      }
      else if (sizeArrLeft === 0){
        
        let value0_right: string = this.measures_right[ind];
        let limR: number = 14;
        if (value0_right.length < limR) {limR = value0_right.length;}
        let value_right: string = value0_right.substring(0,limR);
        
        let nextMeasureBoth: MyMeasureBoth = {
          left: '',
          right: value_right
        };
        this.measures.push(nextMeasureBoth);
      }
      else if (sizeArrRight === 0){
        
        let value0_left: string = this.measures_left[ind];
        let limL: number = 14;
        if (value0_left.length < limL) {limL = value0_left.length;}
        let value_left: string = value0_left.substring(0,limL);
        
        let nextMeasureBoth: MyMeasureBoth = {
          left: value_left,
          right: ''
        };
        this.measures.push(nextMeasureBoth);
      }
      else{
        console.log('unknown');
      }

      ind++;
    }

    this.tabla1.renderRows(); //¿?
  }


  public actionBack() {
    this.location.back();
  }


  public actionContinue() {
    //then - adaptacion para reutilizar screen08
    if (this.global_service.is_availableLeft() && this.global_service.is_availableRight()){
      this.global_service.set_isFirstFoot(false);
      this.router.navigateByUrl('/screen08');
    }
    else if (this.global_service.is_availableLeft()){
      this.global_service.set_isFirstFoot(true);
      this.global_service.set_isFootRight(false);
      this.global_service.set_isFootLeft(true);
      this.router.navigateByUrl('/screen08');
    }
    else if (this.global_service.is_availableRight()){
      this.global_service.set_isFirstFoot(true);
      this.global_service.set_isFootRight(true);
      this.global_service.set_isFootLeft(false);
      this.router.navigateByUrl('/screen08');
    }
  }

}
