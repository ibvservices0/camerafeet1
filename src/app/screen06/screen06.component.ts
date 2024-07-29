import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { KernelfeetService } from '../kernelfeet.service';


import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { JSONinput1Content, JSONobjInput, JSONobjFiles, JSONreconstructionRequest } from '../ibv-types-adhoc';



@Component({
  selector: 'app-screen06',
  templateUrl: './screen06.component.html',
  styleUrl: './screen06.component.css'
})
export class Screen06Component implements OnInit, OnDestroy {

  public flagRepeat: boolean = false;

  private divReconstructionWait: any;
  private divReconstructionOk: any;
  private divReconstructionError: any;

  public mytext_app: string;
  public mytext_actionMeasurements: string;
  public mytext_reconstructionWait: string;
  public mytext_reconstructionOk: string;
  public mytext_reconstructionError: string;
  private mytext_measuresNotAllowed: string;
  public mytext_repeat: string;
  private mytext_reconsInfoPlus1: string;
  private mytext_reconsInfoPlus2: string;
  private mytext_reconsInfoPlus3: string;
  private mytext_reconsInfoPlus4: string;
  private mytext_reconsInfoMinus1: string;


  public mydata_response_error_code: any;
  public mydata_response_sheet_eval: any;
  public mydata_response_info: any;
  public mydata_response_quality: any;
  public mydata_response_request_code: any;
  public mydata_log_action: any;

  private json_input1Content: JSONinput1Content;
  private json_objInput1: JSONobjInput;
  private json_objInput2: JSONobjInput;
  private json_objInput3: JSONobjInput;
  private json_objInput4: JSONobjInput;
  private json_objFiles: JSONobjFiles;
  private webservice_requestReconstructionJson: JSONreconstructionRequest;
  private webservice_base_url: string;



  constructor(private router: Router, public global_service: KernelfeetService, private http: HttpClient){
    this.mytext_app = global_service.text_app();
    this.mytext_actionMeasurements = global_service.text_actionMeasurements();
    this.mytext_reconstructionWait = global_service.text_reconstructionWait();
    this.mytext_reconstructionOk = global_service.text_reconstructionOk();
    this.mytext_reconstructionError = global_service.text_reconstructionError();
    this.mytext_measuresNotAllowed = global_service.text_measuresNotAllowed();
    this.mytext_repeat = global_service.text_repeat();
    this.mytext_reconsInfoPlus1 = global_service.text_reconsInfoPlus1();
    this.mytext_reconsInfoPlus2 = global_service.text_reconsInfoPlus2();
    this.mytext_reconsInfoPlus3 = global_service.text_reconsInfoPlus3();
    this.mytext_reconsInfoPlus4 = global_service.text_reconsInfoPlus4();
    this.mytext_reconsInfoMinus1 = global_service.text_reconsInfoMinus1();

    let obj_accelero_pose1 = JSON.parse(localStorage.getItem("feet_pose1") || '""');
    let obj_accelero_pose2 = JSON.parse(localStorage.getItem("feet_pose2") || '""');
    let obj_accelero_pose3 = JSON.parse(localStorage.getItem("feet_pose3") || '""');

    this.json_input1Content = {
      sheet_model: parseInt(global_service.feet_sheetmodel(),10),
      foot_type: parseInt(global_service.feet_foottype(),10),
      ac0_0: obj_accelero_pose1.ac0_0,
      ac1_0: obj_accelero_pose1.ac1_0,
      ac2_0: obj_accelero_pose1.ac2_0,
      ac0_1: obj_accelero_pose2.ac0_1,
      ac1_1: obj_accelero_pose2.ac1_1,
      ac2_1: obj_accelero_pose2.ac2_1,
      ac0_2: obj_accelero_pose3.ac0_2,
      ac1_2: obj_accelero_pose3.ac1_2,
      ac2_2: obj_accelero_pose3.ac2_2
    };

    let str_input1_content: string = JSON.stringify(this.json_input1Content);
    let base64_input1_content: string = btoa(str_input1_content);

    this.json_objInput1 = {
      extension: 'json',
      content_file: base64_input1_content
    };
    this.json_objInput2 = {
      extension: 'jpg',
      content_file: localStorage.getItem("feet_photo1") || '""'
    };
    this.json_objInput3 = {
      extension: 'jpg',
      content_file: localStorage.getItem("feet_photo2") || '""'
    };
    this.json_objInput4 = {
      extension: 'jpg',
      content_file: localStorage.getItem("feet_photo3") || '""'
    };

    this.json_objFiles = {
      input1: this.json_objInput1,
      input2: this.json_objInput2,
      input3: this.json_objInput3,
      input4: this.json_objInput4
    };

    this.webservice_requestReconstructionJson = {
      files: this.json_objFiles,
      parameters: ''
    };

    this.webservice_base_url = global_service.webservice_base_url();
  }



  ngOnInit(){
    this.webservice_reconstruction();
  }


  ngOnDestroy(){}


  public actionMeasurements() {
    if (this.global_service.is_reconstructed()){
      this.router.navigateByUrl('/screen07');
    }
    else{
      alert(this.mytext_measuresNotAllowed);
    }
  }


  public actionRepeat() {
    this.router.navigateByUrl('/screen03');
  }




  private webservice_reconstruction(){
    this.divReconstructionWait = document.getElementById("div_reconstruction_wait");
    this.divReconstructionOk = document.getElementById("div_reconstruction_ok");
    this.divReconstructionError = document.getElementById("div_reconstruction_error");
    this.divReconstructionWait.removeAttribute("hidden");
    this.divReconstructionOk.setAttribute("hidden", "hidden");
    this.divReconstructionError.setAttribute("hidden", "hidden");

    let str_auth: string = 'Bearer ' + this.global_service.feet_accesstoken();

    const httpOptionsRecons = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': str_auth
      })
    };

    const localUrl = this.webservice_base_url + "/models/reconstruction";

    this.global_service.set_isReconstructed(false); //ATENCION-FAKE dejar_false
    this.global_service.set_foot_measurements('{}');
    this.global_service.set_obj_footMeasurements(null);

    this.mydata_response_error_code = '';
    this.mydata_response_sheet_eval = '';
    this.mydata_response_info = '';
    this.mydata_response_quality = '';
    this.mydata_response_request_code = '';
    this.mydata_log_action = '';

    this.http.post(localUrl, this.webservice_requestReconstructionJson, httpOptionsRecons).subscribe(
      (respjson:any) => { 
        this.divReconstructionWait.setAttribute("hidden", "hidden");
        this.divReconstructionOk.removeAttribute("hidden");
        console.log('POST response OK');
        let str_error_code: string = JSON.stringify(respjson.error_code);
        this.mydata_response_error_code = str_error_code;
        this.mydata_response_sheet_eval = 'Sheet-Eval: ' + respjson.sheet_eval;
        this.mydata_response_info = 'Info: ' + respjson.info;
        this.mydata_response_quality = 'Quality: ' + respjson.quality;
        this.mydata_response_request_code = 'Request-Code: ' + respjson.request_code;

        let numberResponseInfo: Number = Number(respjson.info);
        if (numberResponseInfo.valueOf() === 0){
          if (str_error_code.includes('"1D_MES":0,"3D_MODEL":0')){
            this.global_service.set_isReconstructed(true); //importante
            var str_parameters: string = JSON.stringify(respjson.parameters);
            var str_parameters2: string = str_parameters.replace('1D_MES', 'the1D_MES');
            let obj_parameters = JSON.parse(str_parameters2);
            let str_measurements: string = JSON.stringify(obj_parameters.the1D_MES);
            this.global_service.set_foot_measurements(str_measurements);
            this.global_service.set_obj_footMeasurements(obj_parameters.the1D_MES);
          }
          else{
            this.flagRepeat = true; //¿?
          }
        }
        else if (numberResponseInfo.valueOf() === 1){
          this.flagRepeat = true;
          alert(this.mytext_reconsInfoPlus1);
        }
        else if (numberResponseInfo.valueOf() === 2){
          this.flagRepeat = true;
          alert(this.mytext_reconsInfoPlus2);
        }
        else if (numberResponseInfo.valueOf() === 3){
          this.flagRepeat = true;
          alert(this.mytext_reconsInfoPlus3);
        }
        else if (numberResponseInfo.valueOf() === 4){
          this.flagRepeat = true;
          alert(this.mytext_reconsInfoPlus4);
        }
        else if (numberResponseInfo.valueOf() === -1){
          this.flagRepeat = true;
          alert(this.mytext_reconsInfoMinus1);
        }
        else{
          this.flagRepeat = true; //¿?
        }

      },error => {
        this.divReconstructionWait.setAttribute("hidden", "hidden");
        this.divReconstructionError.removeAttribute("hidden");
        console.log('ERROR: ' + error);
        //this.mydata_log_action = error.message;
        alert(error.message);
      }
    );

  }

}
