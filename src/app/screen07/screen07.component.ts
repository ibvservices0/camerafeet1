import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { KernelfeetService } from '../kernelfeet.service';

import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';


export interface MyMeasure {
  id: string;
  val: any;
}


@Component({
  selector: 'app-screen07',
  templateUrl: './screen07.component.html',
  styleUrl: './screen07.component.css'
})
export class Screen07Component implements OnInit, OnDestroy {

  public mytext_app: string;
  public mytext_actionRecommend: string;

  public columnas: string[] = ['meas-id', 'meas-val'];
  public measures: MyMeasure[] = [];

  @ViewChild(MatTable) tabla1!: MatTable<MyMeasure>;


  constructor(private router: Router, public global_service: KernelfeetService){
    this.mytext_app = global_service.text_app();
    this.mytext_actionRecommend = global_service.text_actionRecommend();

    var dataraw0: string = global_service.foot_measurements();
    var dataraw1: string = dataraw0.replace('{', '');
    var dataraw2: string = dataraw1.replace('}', '');
    let data_arr: string[] = dataraw2.split(',');
    let dara_arr_length: number = data_arr.length;

    for (let ind: number = 0; ind < dara_arr_length; ind++){
      let data_item: string = data_arr[ind];
      let data_item_arr: string[] = data_item.split(':');

      let next_id_str: string =  data_item_arr[0];
      let next_val_str: string =  data_item_arr[1];
      let next_val_num: number = parseFloat(next_val_str);
      let next_val: string = next_val_num.toFixed(2);

      if (ind === 0){
        let nextMeasure: MyMeasure = {
          id: next_id_str,
          val: next_val + ' mm2'
        };
        this.measures.push(nextMeasure);
      }
      else{
        let nextMeasure: MyMeasure = {
          id: next_id_str,
          val: next_val + ' mm'
        };
        this.measures.push(nextMeasure);
      }
    }
  }


  ngOnInit(){
    console.log(this.measures);
    //¿aquiNO? this.tabla1.renderRows();
  }

  ngAfterViewInit(){
    this.tabla1.renderRows();
  }

  ngOnDestroy(){}


  public actionRecommend(){
    alert('EN CONSTRUCCION');
  }

}