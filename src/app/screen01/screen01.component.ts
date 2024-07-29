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
  public mytext_selectLanguage01: string;
  public mytext_selectLanguage02: string;

  public mytext_input: string = '';



  constructor(private router: Router, public global_service: KernelfeetService, private platform: Platform, private activatedRoute: ActivatedRoute){
    if (this.platform.ANDROID) {this.global_service.set_isAndroid(true);}
    else if (this.platform.IOS){this.global_service.set_isIos(true);}
    else if (this.platform.SAFARI){this.global_service.set_isSafari(true);}

    this.mytext_app = global_service.text_app();
    this.mytext_es = global_service.text_es();
    this.mytext_en = global_service.text_en();
    this.mytext_selectLanguage01 = global_service.text_selectLanguage01();
    this.mytext_selectLanguage02 = global_service.text_selectLanguage02();
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

      console.log(this.global_service.the_input1());
      console.log(this.global_service.the_input2());
      console.log(this.global_service.the_input3());
      console.log(this.global_service.the_input4());
      console.log(this.global_service.the_input5());

      if (this.global_service.the_input5() !== null){
        let sValue5: String = new String(this.global_service.the_input5());
        this.mytext_input = sValue5.toString();
      }
      else{
        let sValue4: String = new String(this.global_service.the_input4());
        this.mytext_input = sValue4.toString();
      }

      //this.mytext_input = s_input2;
    }
  }

  ngOnDestroy(){}


  public toScreen02es() {
    this.global_service.set_isEnglish(false);
    permissionacel.permission_accelerometers();
    this.router.navigateByUrl('/screen02');
  }

  public toScreen02en() {
    this.global_service.set_isEnglish(true);
    permissionacel.permission_accelerometers();
    this.router.navigateByUrl('/screen02');
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
