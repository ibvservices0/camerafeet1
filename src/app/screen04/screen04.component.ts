import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { KernelfeetService } from '../kernelfeet.service';


//import { HostListener } from '@angular/core';

import * as mypose2 from '../../scripts/mypose2.js'


@Component({
  selector: 'app-screen04',
  templateUrl: './screen04.component.html',
  styleUrl: './screen04.component.css'
})
export class Screen04Component implements OnInit, OnDestroy {

  public isRight: boolean;
  public isLeft: boolean;

  public isTaking: boolean = true;
  public isTaken: boolean = false;

  public mytext_sideTop: string;
  public mytext_repeat: string;
  public mytext_confirm: string;




  constructor(private router: Router, public global_service: KernelfeetService){
    this.mytext_sideTop = global_service.text_sideTop();
    this.mytext_repeat = global_service.text_repeat();
    this.mytext_confirm = global_service.text_confirm();
    this.isRight = global_service.is_footRight();
    this.isLeft = global_service.is_footLeft();
  }




  ngOnInit(){
    mypose2.do_pose2();
  }

  ngOnDestroy(){}


  public clickPhoto2a(){this.clickPhoto();}
  public clickPhoto2b(){this.clickPhoto();}
  private clickPhoto(){
    this.isTaking = false;
    this.isTaken = true;
    mypose2.bt_pose2();
  }


  public repeatTop(){
    this.isTaking = true;
    this.isTaken = false;
    mypose2.do_pose2();
  }



  public confirmTop() {
    this.router.navigateByUrl('/screen05');
  }


}
