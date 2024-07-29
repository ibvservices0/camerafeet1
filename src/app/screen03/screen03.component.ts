import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { KernelfeetService } from '../kernelfeet.service';


//import { HostListener } from '@angular/core';

import * as mypose1 from '../../scripts/mypose1.js'




@Component({
  selector: 'app-screen03',
  templateUrl: './screen03.component.html',
  styleUrl: './screen03.component.css'
})
export class Screen03Component implements OnInit, OnDestroy {

  //public isLandscape: boolean = true;
  public isRight: boolean;
  public isLeft: boolean;

  public isTaking: boolean = true;
  public isTaken: boolean = false;

  public mytext_sideInner: string;
  public mytext_repeat: string;
  public mytext_confirm: string;


  constructor(private router: Router, public global_service: KernelfeetService){
    this.mytext_sideInner = global_service.text_sideInner();
    this.mytext_repeat = global_service.text_repeat();
    this.mytext_confirm = global_service.text_confirm();
    this.isRight = global_service.is_footRight();
    this.isLeft = global_service.is_footLeft();
  }


  ngOnInit(){
    mypose1.do_pose1();
  }

  ngOnDestroy(){}

  

  public clickPhoto1a(){this.clickPhoto();}
  public clickPhoto1b(){this.clickPhoto();}
  private clickPhoto(){
    this.isTaking = false;
    this.isTaken = true;
    mypose1.bt_pose1();
  }

  public repeatInner(){
    this.isTaking = true;
    this.isTaken = false;
    mypose1.do_pose1();
  }

  public confirmInner() {
    this.router.navigateByUrl('/screen04');
    //no sirve this.router.navigate([`/screen04`], { skipLocationChange: true });
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
