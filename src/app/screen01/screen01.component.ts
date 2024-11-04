import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';
import { KernelfeetService } from '../kernelfeet.service';
//import { Router } from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Platform } from '@angular/cdk/platform';
import { HostListener } from '@angular/core';

import * as permissionacel from '../../scripts/permissionacel.js'



@Component({
  selector: 'app-screen01',
  templateUrl: './screen01.component.html',
  styleUrl: './screen01.component.css'
})
export class Screen01Component implements OnInit, OnDestroy {

  public isPortrait: boolean = true;

  public mytext_app: string;
  public mytext_es: string;
  public mytext_en: string;
  public mytext_bilingueProducto: string = '';
  public mytext_input: string = '';
  public mytext_bilingueMode: string = '';
  public mytext_selectLanguage01: string;
  public mytext_selectLanguage02: string;



  constructor(private router: Router, public global_service: KernelfeetService, private platform: Platform, private activatedRoute: ActivatedRoute){
    if (this.platform.ANDROID) {this.global_service.set_isAndroid(true);}
    else if (this.platform.IOS){this.global_service.set_isIos(true);}
    else if (this.platform.SAFARI){this.global_service.set_isSafari(true);}

    this.mytext_app = global_service.text_app();
    this.mytext_es = global_service.text_es();
    this.mytext_en = global_service.text_en();
    //this.mytext_bilingueProducto = global_service.text_bilingueProducto();
    //this.mytext_input = '241272';
    this.mytext_selectLanguage01 = global_service.text_bilingueLanguage01();
    this.mytext_selectLanguage02 = global_service.text_bilingueLanguage02();
  }

  ngOnInit(){
    console.log('SCREEN01');
    let input1 = this.activatedRoute.snapshot.params['input']; //undefined
    if (input1 !== undefined){
      let sInput1: String = new String(input1);
      let s_input1: string = sInput1.toString();

      let arrBuf: ArrayBuffer = this.base64url_decode(s_input1);
      const decoder = new TextDecoder("utf-8", {fatal: false});
      let s_input2: string = decoder.decode(arrBuf);

      let arr_input: string[] = s_input2.split('&');
      this.global_service.set_the_inputs(arr_input);

      //console.log(this.global_service.the_input1());
      //console.log(this.global_service.the_input2());
      //console.log(this.global_service.the_input3());
      //console.log(this.global_service.the_input4());
      //console.log(this.global_service.the_input5());

      /*begin-only-log
      if (this.global_service.the_input5() !== null){
        let sValue5: String = new String(this.global_service.the_input5());
        this.mytext_input = sValue5.toString();
      }
      else{
        let sValue4: String = new String(this.global_service.the_input4());
        this.mytext_input = sValue4.toString();
      }
      end-only-log*/

      if (this.global_service.the_input3() !== null){
        this.mytext_bilingueProducto = this.global_service.text_bilingueProducto();
        let sValueCodeProduct: String = new String(this.global_service.the_input3());
        this.mytext_input = sValueCodeProduct.toString();
      }

      if (this.global_service.the_input5() !== null){
        //this.mytext_bilingueMode = this.global_service.text_bilingueRegistered();
        let sValueCodeUser: String = new String(this.global_service.the_input5());
        this.mytext_bilingueMode = sValueCodeUser.toString();
      }
      else{
        this.mytext_bilingueMode = this.global_service.text_bilingueAnonymous();
      }

    }
  }

  ngOnDestroy(){}


  public toScreen02es() {
    this.global_service.set_isEnglish(false);
    this.toNextScreen();
  }

  public toScreen02en() {
    this.global_service.set_isEnglish(true);
    this.toNextScreen();
  }


  private toNextScreen(){
    permissionacel.permission_accelerometers();

    //this.router.navigateByUrl('/screen01bis');
    /* */
    if (localStorage.getItem("feet_previous") === null){
      this.router.navigateByUrl('/screen01bis');
    }
    else if (this.global_service.the_input5() !== null){
      this.router.navigateByUrl('/screen01bis');
    }
    else{
      this.router.navigateByUrl('/screen01acc');
    }
    /* */
  }





  base64url_decode(value: string): ArrayBuffer {
    const m = value.length % 4;
    return Uint8Array.from(atob(
        value.replace(/-/g, '+')
            .replace(/_/g, '/')
            .padEnd(value.length + (m === 0 ? 0 : 4 - m), '=')
    ), c => c.charCodeAt(0)).buffer
  }





  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event) {
    if (this.global_service.is_android()){
      if (screen.orientation.type.includes('portrait')){this.isPortrait = true;}
      else if (screen.orientation.type.includes('landscape')){this.isPortrait = false;}
      else {this.isPortrait = true;}
    }
    else if (this.global_service.is_ios()){
      //orientation-Changed-iPHONE
      if (window.innerHeight > window.innerWidth){this.isPortrait = false;}
      else {this.isPortrait = true;}
    }
    else if (this.global_service.is_safari()){
      //orientation-Changed-iPAD
      if (window.innerHeight > window.innerWidth){this.isPortrait = false;}
      else {this.isPortrait = true;}
    }
    else{
      console.log('orientation-Changed');
    }
  }

}
