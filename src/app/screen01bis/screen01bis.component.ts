import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';
import { KernelfeetService } from '../kernelfeet.service';
import { Router } from '@angular/router';

/* deprecated
import * as permissionacel from '../../scripts/permissionacel.js'
*/


@Component({
  selector: 'app-screen01bis',
  templateUrl: './screen01bis.component.html',
  styleUrl: './screen01bis.component.css'
})
export class Screen01bisComponent implements OnInit, OnDestroy {

  public mytext_app: string;
  public mytext_confirm: string;

  public mytext_fill_age: string;
  public mytext_select_genre: string;
  public mytext_age: string;
  public mytext_male: string;
  public mytext_female: string;
  private mytext_ageFilledInvalid: string;
  private mytext_genderNotSelected: string;

  public data_age: any;
  public selectedGender: any = 0;


  constructor(private router: Router, public global_service: KernelfeetService){
    this.mytext_app = global_service.text_app();
    this.mytext_confirm = global_service.text_confirm();

    this.mytext_fill_age = global_service.text_fill_age();
    this.mytext_select_genre = global_service.text_select_genre();
    this.mytext_age = global_service.text_age();
    this.mytext_male = global_service.text_male();
    this.mytext_female = global_service.text_female();
    this.mytext_ageFilledInvalid = global_service.text_ageFilledInvalid();
    this.mytext_genderNotSelected = global_service.text_genderNotSelected();
  }


  ngOnInit(){
  }


  ngOnDestroy(){}


  private check_data_age(): boolean{
    if (this.data_age === undefined){
      console.log('Es UNDEFINED');
      return false;
    }
    if (typeof +this.data_age !== "number" || isNaN(+this.data_age)){
      console.log("NO es correcto");
      return false;
    }
    let sEmpty: String = new String(this.data_age);
    if (sEmpty.length === 0){
      console.log("Está VACIO");
      return false;
    }
    return true;
  }


  public toScreen02() {
    console.log(this.selectedGender);

    if (! this.check_data_age()){
      alert(this.mytext_ageFilledInvalid);
      return;
    }
    this.global_service.set_userAge(this.data_age);

    if (this.selectedGender === 0){
      alert(this.mytext_genderNotSelected);
      return;
    }
    this.global_service.set_userGender(this.selectedGender);

    //deprecated permissionacel.permission_accelerometers();
    this.router.navigateByUrl('/screen02');
  }


}
