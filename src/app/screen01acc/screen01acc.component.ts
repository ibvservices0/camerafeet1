import { Component, OnInit, OnDestroy } from '@angular/core';
//import { from, fromEvent, Observable, throwError, Subscription } from 'rxjs';
import { KernelfeetService } from '../kernelfeet.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-screen01acc',
  templateUrl: './screen01acc.component.html',
  styleUrl: './screen01acc.component.css'
})
export class Screen01accComponent implements OnInit, OnDestroy {

  public data_used_code: any;

  public mytext_app: string;
  private mytext_codeusedFilledInvalid: string;
  public mytext_accPreguntaDisponeCodigo: string;
  public mytext_accPlaceholderCode: string;
  public mytext_accUtilizarCodigo: string;
  public mytext_accPreguntaReutilizarUltima: string;
  public mytext_accReutilizarUltima: string;
  public mytext_accPreguntaIniciarNueva: string;
  public mytext_accIniciarNueva: string;



  constructor(private router: Router, public global_service: KernelfeetService){

    this.mytext_app = global_service.text_app();
    this.mytext_codeusedFilledInvalid = global_service.text_codeusedFilledInvalid();
    this.mytext_accPreguntaDisponeCodigo = global_service.text_accPreguntaDisponeCodigo();
    this.mytext_accPlaceholderCode = global_service.text_accPlaceholderCode();
    this.mytext_accUtilizarCodigo = global_service.text_accUtilizarCodigo();
    this.mytext_accPreguntaReutilizarUltima = global_service.text_accPreguntaReutilizarUltima();
    this.mytext_accReutilizarUltima = global_service.text_accReutilizarUltima();
    this.mytext_accPreguntaIniciarNueva = global_service.text_accPreguntaIniciarNueva();
    this.mytext_accIniciarNueva = global_service.text_accIniciarNueva();
  }


  ngOnInit(){
  }


  ngOnDestroy(){
  }


  private check_dataUsedCode(): boolean{

    if (this.data_used_code === undefined){
      console.log('Es UNDEFINED');
      return false;
    }
    let sValue: String = new String(this.data_used_code);
    let strValue: string = sValue.trim();
    if (strValue.length === 0){
      console.log("Está VACIO");
      return false;
    }
    if (strValue.length !== 6){
      console.log("Longitud incorrecta");
      return false;
    }
    //llegando_hasta_aqui
    this.global_service.set_request_code(strValue.toUpperCase());
    return true;
  }


  public actionUtilizarCodigo(){

    if (!this.check_dataUsedCode()){
      alert(this.mytext_codeusedFilledInvalid);
      return;
    }
    this.router.navigateByUrl('/screen21acc');
  }

  public actionReutilizarUltima(){
    this.router.navigateByUrl('/screen31acc');
  }

  public actionIniciarNueva(){
    this.router.navigateByUrl('/screen01bis');
  }

}
