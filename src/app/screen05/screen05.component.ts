import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { KernelfeetService } from '../kernelfeet.service';


//import { HostListener } from '@angular/core';

import * as mypose3 from '../../scripts/mypose3.js'



@Component({
  selector: 'app-screen05',
  templateUrl: './screen05.component.html',
  styleUrl: './screen05.component.css'
})
export class Screen05Component implements OnInit, OnDestroy {

  public isRight: boolean;
  public isLeft: boolean;

  public isTaking: boolean = true;
  public isTaken: boolean = false;

  public mytext_sideOuter: string;
  public mytext_repeat: string;
  public mytext_confirm: string;




  constructor(private router: Router, public global_service: KernelfeetService){
    this.mytext_sideOuter = global_service.text_sideOuter();
    this.mytext_repeat = global_service.text_repeat();
    this.mytext_confirm = global_service.text_confirm();
    this.isRight = global_service.is_footRight();
    this.isLeft = global_service.is_footLeft();
  }



  ngOnInit(){
    mypose3.do_pose3();
  }

  ngOnDestroy(){}


  public clickPhoto3a(){this.clickPhoto();}
  public clickPhoto3b(){this.clickPhoto();}
  private clickPhoto(){
    this.isTaking = false;
    this.isTaken = true;
    mypose3.bt_pose3();
  }


  public repeatOuter(){
    this.isTaking = true;
    this.isTaken = false;
    mypose3.do_pose3();
  }



  public confirmOuter() {
    mypose3.releaseTorch3();
    this.router.navigateByUrl('/screen06');
  }


}
