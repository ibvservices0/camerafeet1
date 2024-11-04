import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { KernelfeetService } from '../kernelfeet.service';

//import { NextObserver, ErrorObserver, CompletionObserver } from 'rxjs';


import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { JSONrecommendParameters, JSONrecommendParametersBis, JSONrecommendsizeRequest } from '../ibv-types-adhoc';


@Component({
  selector: 'app-screen08',
  templateUrl: './screen08.component.html',
  styleUrl: './screen08.component.css'
})
export class Screen08Component implements OnInit, OnDestroy {

  public flagRecomOk: boolean = false;
  //TODO: lo de arriba tendrá uso futuro en la interfaz de usuario

  private divRecommendWait: any;
  private divRecommendOk: any;
  private divRecommendError: any;

  public mytext_app: string;
  public mytext_newScan: string;
  public mytext_tallaDePie: string;
  public mytext_paraElProducto: string;

  public mytext_recommendWait: string;
  public mytext_recommendOk: string;
  public mytext_recommendError: string;

  public text_log_recommend: string = '';
  public text_log2_recommend: string = '';

  private mytext_requestCode: string;
  private mytext_recommendCode: string;
  private mytext_left: string;
  private mytext_right: string;

  public mydata_error_code: any;
  public mydata_request_code: any;
  public mydata_recommend_code: any;
  //deprecated
  public mydata_user_recommend: any; 

  private json_objParameters: JSONrecommendParameters;
  private json_objParametersBis: JSONrecommendParametersBis;
  private str_theInput5: string = '';

  private webservice_requestRecommendSizeJson: JSONrecommendsizeRequest;
  private webservice_base_url: string;



  constructor(private router: Router, public global_service: KernelfeetService, private http: HttpClient){
    this.mytext_app = global_service.text_app();
    this.mytext_newScan = global_service.text_newScan();
    this.mytext_tallaDePie = global_service.text_tallaDePie();
    this.mytext_paraElProducto = global_service.text_paraElProducto();
    this.mytext_recommendWait = global_service.text_recommendWait();
    this.mytext_recommendOk = global_service.text_recommendOk();
    this.mytext_recommendError = global_service.text_recommendError();

    this.mytext_requestCode = global_service.text_requestCode();
    this.mytext_recommendCode = global_service.text_recommendCode();
    this.mytext_left = global_service.text_left();
    this.mytext_right = global_service.text_right();

    if (global_service.the_input5() !== null){
      let sTheInput5: String = new String(global_service.the_input5());
      this.str_theInput5 = sTheInput5.toString();
    }

    this.json_objParametersBis = {
      product_code: global_service.the_arr_product_codes(),
      request_code: global_service.the_arr_request_codes(),
      include_user_profile: 'FALSE',
      recommend_by_foot: 'TRUE'
    };
    //code_user: this.str_theInput5
    this.json_objParameters = {
      product_code: global_service.the_arr_product_codes(),
      request_code: global_service.the_arr_request_codes(),
      include_user_profile: 'FALSE',
      recommend_by_foot: 'TRUE'
    };


    if (global_service.the_input5() !== null){
      this.webservice_requestRecommendSizeJson = {
        parameters: this.json_objParametersBis
      };
    }
    else{
      this.webservice_requestRecommendSizeJson = {
        parameters: this.json_objParameters
      };
    }

    
    this.webservice_base_url = global_service.webservice_base_url();
  }


  ngOnInit(){
    this.webservice_recommendsize();
  }

  ngOnDestroy(){}


  private webservice_recommendsize(){
    this.divRecommendWait = document.getElementById("div_recommend_wait");
    this.divRecommendOk = document.getElementById("div_recommend_ok");
    this.divRecommendError = document.getElementById("div_recommend_error");
    this.divRecommendWait.removeAttribute("hidden");
    this.divRecommendOk.setAttribute("hidden", "hidden");
    this.divRecommendError.setAttribute("hidden", "hidden");

    let str_auth: string = 'Bearer ' + this.global_service.feet_accesstoken();

    const httpOptionsRecommend = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': str_auth
      })
    };

    const localUrl = this.webservice_base_url + "/models/recommendsize";

    this.text_log_recommend = '';

    /*Begin-deprecated
    this.http.post(localUrl, this.webservice_requestRecommendSizeJson, httpOptionsRecommend).subscribe(
      (resp:any) => {this.postResponseOk(resp);},
      error => {this.postResponseErr(error.message);}
    );
    End-deprecated*/

    /*Begin-alternativa*/
    this.http.post(localUrl, this.webservice_requestRecommendSizeJson, httpOptionsRecommend).subscribe({  
        next: resp => this.postResponseOk(resp),  
        error: err => this.postResponseErr(err.message),  
        complete: () => console.log('http_post done')  
    });
    /*End-alternativa*/

  }


  private postResponseOk(respjson: any){

    if (respjson !== null){

      this.divRecommendWait.setAttribute("hidden", "hidden");
      this.divRecommendOk.removeAttribute("hidden");

      /*Begin-TEMP
      this.mydata_error_code = 'ERROR_CODE: ' + respjson.error_code;
      this.mydata_recommend_code = 'RECOMMEND_CODE: ' + respjson.recommend_code;
      var str_user_recommend: string = JSON.stringify(respjson.user_recommend);
      this.mydata_user_recommend = 'USER_RECOMMEND: ' + str_user_recommend;
      End-TEMP*/

      let str_respjson: string = JSON.stringify(respjson);
      this.global_service.dataFrom_jsonResponseRecommend(str_respjson);

      /*Begin-TEMP
      var str_user_recommend2: string = str_user_recommend.replace('[{', '{');
      var str_user_recommend3: string = str_user_recommend2.replace('}]', '}');
      let obj_user_recommend = JSON.parse(str_user_recommend3);
      let theCodProd = obj_user_recommend.product_code;
      let sTheCodProd: String = new String(theCodProd);
      this.text_log2_recommend = sTheCodProd.toString();
      let str_recommendation: string = JSON.stringify(obj_user_recommend.recommendation);
      let obj_recommendation = JSON.parse(str_recommendation);
      let the_size = obj_recommendation.size;
      let sTheSize: String = new String(the_size);
      this.text_log_recommend = sTheSize.toString();
      End-TEMP*/

      let str_rr_errorCode: string = this.global_service.the_rr_errorCode();
      let int_rr_errorCode: number = parseInt(str_rr_errorCode, 10);
      if (int_rr_errorCode !== 0){
        this.flagRecomOk = false;

        this.mydata_error_code = 'ERROR: ' + str_rr_errorCode;
        this.mydata_request_code = this.mytext_requestCode + ': ' + this.global_service.the_request_code();
        this.mydata_recommend_code = '';
        this.mydata_user_recommend = '';
        this.text_log_recommend = '';
        this.text_log2_recommend = '';
      }
      else{
        this.flagRecomOk = true;

        this.mydata_error_code = '';
        this.mydata_request_code = this.mytext_requestCode + ': ' + this.global_service.the_request_code();
        this.mydata_recommend_code = this.mytext_recommendCode + ': ' + this.global_service.the_rr_recommendCode();
        this.mydata_user_recommend = '';
        this.text_log2_recommend = this.global_service.the_rr_productCode();
        if (!this.global_service.is_firstFoot()){
          let line_size_right: string = this.mytext_right + ': ' + this.global_service.the_rr_sizeRight();
          let line_size_left: string = this.mytext_left + ': ' + this.global_service.the_rr_sizeLeft();
          this.text_log_recommend = line_size_right + ' , ' + line_size_left;
        }
        else if (this.global_service.is_footRight()){
          this.text_log_recommend = this.mytext_right + ': ' + this.global_service.the_rr_sizeRight();
        }
        else if (this.global_service.is_footLeft()){
          this.text_log_recommend = this.mytext_left + ': ' + this.global_service.the_rr_sizeLeft();
        }

      }

    }
    else{
      this.flagRecomOk = false;
      this.divRecommendWait.setAttribute("hidden", "hidden");
      this.divRecommendError.removeAttribute("hidden");
      this.mydata_error_code = 'respjson IS null';
      this.mydata_request_code = this.mytext_requestCode + ': ' + this.global_service.the_request_code();
      this.mydata_recommend_code = '';
      this.mydata_user_recommend = '';
      this.text_log_recommend = '';
      this.text_log2_recommend = '';
      alert('respjson IS null');
    }
  }


  private postResponseErr(msgError: string){

    this.flagRecomOk = false;
    this.divRecommendWait.setAttribute("hidden", "hidden");
    this.divRecommendError.removeAttribute("hidden");
    this.mydata_error_code = msgError;
    this.mydata_request_code = this.mytext_requestCode + ': ' + this.global_service.the_request_code();
    this.mydata_recommend_code = '';
    this.mydata_user_recommend = '';
    this.text_log_recommend = '';
    this.text_log2_recommend = '';
    alert(msgError);
  }



  public toNewScan() {
    //this.router.navigateByUrl('/screen01bis');
    this.router.navigateByUrl('/screen01acc');
  }

}
