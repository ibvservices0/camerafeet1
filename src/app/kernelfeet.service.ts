import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KernelfeetService {

  private isAndroid: boolean;
  private isIos: boolean;
  private isSafari: boolean;

  private isAuthenticated: boolean;
  private isReconstructed: boolean;

  private isFootLeft: boolean;
  private isFootRight: boolean;

  private isFirstFoot: boolean;

  private isSheetA4: boolean;
  private isSheetUS: boolean;

  private isEnglish: boolean;

  private feetAccesstoken: string;

  private right_footMeasurements: string;
  private right_objFootMeasurements: any;
  private left_footMeasurements: string;
  private left_objFootMeasurements: any;

  private userAge: string;
  private userGender: string;

  private input1: any; //client_id
  private input2: any; //client_secret
  private input3: any; //product_code
  private input4: any; //url_web_return
  private input5: any; //code_user

  private arr_product_codes: string[] = [];
  private arr_request_codes: string[] = [];
  private request_code: string;

  private urlWebReturn: string;

  //rr = recommend_response
  private rr_error_code: string;
  private rr_recommend_code: string;
  private rr_product_code: string;
  private rr_size_right: string;
  private rr_size_left: string;
  private rr_size_common: string;

  private isAvailableRight: boolean;
  private isAvailableLeft: boolean;



  constructor() { 
    this.isAndroid = false;
    this.isIos = false;
    this.isSafari = false;

    this.isAuthenticated = false;
    this.isReconstructed = false;

    this.isFootLeft = false;
    this.isFootRight = false;

    this.isFirstFoot = false;

    this.isSheetA4 = false;
    this.isSheetUS = false;

    this.isEnglish = false;

    this.feetAccesstoken = '';
    this.right_footMeasurements = '';
    this.left_footMeasurements = '';

    this.userAge = '';
    this.userGender = '';

    this.request_code = '';

    this.urlWebReturn = '';

    //rr = recommend_response
    this.rr_error_code = '';
    this.rr_recommend_code = '';
    this.rr_product_code = '';
    this.rr_size_right = '';
    this.rr_size_left = '';
    this.rr_size_common = '';

    this.isAvailableRight = false;
    this.isAvailableLeft = false;
  }


  public webservice_client_id(): string{
    return '';
  }

  public webservice_client_secret(): string{
    return '';
  }

  public webservice_username(): string{
    return '';
  }


  public webservice_password(): string{
    return '';
  }
  public webservice_grant_type(): string{
    return '';
  }
  public webservice_license_code(): string{
    return '';
  }
  public webservice_device(): string{
    return '';
  }


  public webservice_base_url(): string{
    return '';
  }



  public set_the_inputs(inputs: string[]){

    if (inputs.length > 4){
      var str5: string = inputs[4];
      this.input5 = str5.replace('input5=', '');
    }
    else{
      this.input5 = null;
    }

    if (inputs.length > 3){
      var str4: string = inputs[3];
      this.input4 = str4.replace('input4=', '');

      let sInput4: String = new String(this.input4);
      let s_input4: string = sInput4.toString();
      this.set_url_webReturn(s_input4);
    }
    else{
      this.input4 = null;
    }

    if (inputs.length > 2){
      var str3: string = inputs[2];
      this.input3 = str3.replace('input3=', '');

      let sInput3: String = new String(this.input3);
      let s_input3: string = sInput3.toString();
      this.set_product_code(s_input3);
    }
    else{
      this.input3 = null;
    }

    if (inputs.length > 1){
      var str2: string = inputs[1];
      this.input2 = str2.replace('input2=', '');
    }
    else{
      this.input2 = null;
    }

    if (inputs.length > 0){
      var str1: string = inputs[0];
      this.input1 = str1.replace('input1=', '');
    }
    else{
      this.input1 = null;
    }

  }
  

  public the_input1(): any{
    return this.input1;
  }
  public the_input2(): any{
    return this.input2;
  }
  public the_input3(): any{
    return this.input3;
  }
  public the_input4(): any{
    return this.input4;
  }
  public the_input5(): any{
    return this.input5;
  }



  public set_feet_accesstoken(val: string){
    this.feetAccesstoken = val;
  }
  public feet_accesstoken(): string{
    return this.feetAccesstoken;
  }

  public set_right_foot_measurements(measures: string){
    this.right_footMeasurements = measures;
  }
  public right_foot_measurements(): string{
    return this.right_footMeasurements;
  }
  public set_right_obj_footMeasurements(objMeasures: any){
    this.right_objFootMeasurements = objMeasures;
  }
  public right_obj_footMeasurements(): any{
    return this.right_objFootMeasurements;
  }

  public set_left_foot_measurements(measures: string){
    this.left_footMeasurements = measures;
  }
  public left_foot_measurements(): string{
    return this.left_footMeasurements;
  }
  public set_left_obj_footMeasurements(objMeasures: any){
    this.left_objFootMeasurements = objMeasures;
  }
  public left_obj_footMeasurements(): any{
    return this.left_objFootMeasurements;
  }


  public set_isEnglish(val: boolean){
    this.isEnglish = val;
  }
  public is_english(){
    return this.isEnglish;
  }


  public set_isAndroid(val: boolean){
    this.isAndroid = val;
  }
  public set_isIos(val: boolean){
    this.isIos = val;
  }
  public set_isSafari(val: boolean){
    this.isSafari = val;
  }

  public is_android(): boolean{
    return this.isAndroid;
  }
  public is_ios(): boolean{
    return this.isIos;
  }
  public is_safari(): boolean{
    return this.isSafari;
  }


  public set_isAuthenticated(val: boolean){
    this.isAuthenticated = val;
  }
  public is_authenticated(): boolean{
    return this.isAuthenticated;
  }

  public set_isReconstructed(val: boolean){
    this.isReconstructed = val;
  }
  public is_reconstructed(): boolean{
    return this.isReconstructed;
  }




  public set_isFootLeft(val: boolean){
    this.isFootLeft = val;
  }
  public is_footLeft(): boolean{
    return this.isFootLeft;
  }

  public set_isFootRight(val: boolean){
    this.isFootRight = val;
  }
  public is_footRight(): boolean{
    return this.isFootRight;
  }



  public set_isFirstFoot(val: boolean){
    this.isFirstFoot = val;
  }
  public is_firstFoot(): boolean{
    return this.isFirstFoot;
  }




  public set_isSheetA4(val: boolean){
    this.isSheetA4 = val;
  }
  public is_sheetA4(){
    return this.isSheetA4;
  }

  public set_isSheetUS(val: boolean){
    this.isSheetUS = val;
  }
  public is_sheetUS(){
    return this.isSheetUS;
  }


  public feet_sheetmodel(): string{
    if (this.isSheetUS) return '2';
    else if (this.isSheetA4) return '1';
    else return '0';
  }

  public feet_foottype(): string{
    if (this.isFootRight) return '2';
    else if (this.isFootLeft) return '1';
    else return '0';
  }


  public set_userAge(dataAge: any){
    let sUserAge: String = new String(dataAge);
    this.userAge = sUserAge.toString();
  }
  public user_age(): string{
    return this.userAge;
  }

  public set_userGender(dataGender: any){
    if (dataGender === '1'){
      console.log("ES HOMBRE");
      this.userGender = 'male';
    }
    else if (dataGender === '2'){
      console.log("ES MUJER");
      this.userGender = 'female';
    }
  }
  public user_gender(): string{
    return this.userGender;
  }



  public set_url_webReturn(url_web_return: string){
    if (url_web_return.startsWith('http')){
      this.urlWebReturn = url_web_return;
    }
    else{
      this.urlWebReturn = 'https://' + url_web_return;
    }
  }
  public get_url_webReturn(): string{
    return this.urlWebReturn;
  }



  public set_product_code(product_code: string){
    this.arr_product_codes = [];
    this.arr_product_codes.push(product_code);
  }

  public the_arr_product_codes(): string[]{
    return this.arr_product_codes;
  }

  public set_request_code(s_request_code: string){
    this.request_code = s_request_code;
    this.arr_request_codes = [];
    this.arr_request_codes.push(s_request_code);
  }

  public the_arr_request_codes(): string[]{
    return this.arr_request_codes;
  }

  public the_request_code(): string{
    return this.request_code;
  }


  public set_isAvailableRight(val: boolean){
    this.isAvailableRight = val;
  }
  public is_availableRight(){
    return this.isAvailableRight;
  }
  public set_isAvailableLeft(val: boolean){
    this.isAvailableLeft = val;
  }
  public is_availableLeft(){
    return this.isAvailableLeft;
  }




  public text_app(): string{
    return ' SCANFEET';
  }
  public text_es(): string{
    return 'ES';
  }
  public text_en(): string{
    return 'EN'
  }
  public text_bilingueLanguage01(): string{
    return 'SELECCIONA IDIOMA / SELECT LANGUAGE';
  }
  public text_bilingueLanguage02(): string{
    return 'ES = ESPAÑOL   ,   EN = ENGLISH';
  }
  public text_autorizando(): string{
    if (this.isEnglish) return 'Authorizing...';
    return 'Autorizando...';
  }
  public text_autorizadoOk(): string{
    if (this.isEnglish) return 'Authorized OK';
    return 'Autorizado OK';
  }
  public text_autorizadoError(): string{
    if (this.isEnglish) return 'ERROR in authorization';
    return 'ERROR en autorización';
  }
  public text_left(): string{
    if (this.isEnglish) return 'Left';
    return 'Izquierdo';
  }
  public text_right(): string{
    if (this.isEnglish) return 'Right';
    return 'Derecho';
  }
  public text_threePhotos(): string{
    if (this.isEnglish) return 'You will make 3 photos of the foot.';
    return 'Vas a hacer 3 fotos del pie.';
  }
  public text_firstPhotoIs(): string{
    if (this.isEnglish) return 'First photo of the inner side.';
    return 'Primera foto de la parte interior.';
  }
  public text_secondPhotoIs(): string{
    if (this.isEnglish) return 'Second photo of the top side.';
    return 'Segunda foto de la parte superior.';
  }
  public text_thirdPhotoIs(): string{
    if (this.isEnglish) return 'Third photo of the outer side.';
    return 'Tercera foto de la parte exterior.';
  }
  public text_firstMobileInLandscape(): string{
    if (this.isEnglish) return 'And take photos with mobile in landscape';
    return 'Y toma fotos con móvil en apaisado';
  }
  public text_selectFoot(): string{
    if (this.isEnglish) return 'Select right foot or left';
    return 'Selecciona pie derecho o izquierdo';
  }
  public text_notAuthorizedToContinue(): string{
    if (this.isEnglish) return 'Not authorized to continue';
    return 'No está autorizado para poder continuar';
  }
  public text_sideInner(): string{
    if (this.isEnglish) return ' INNER';
    return ' INTERIOR';
  }
  public text_sideTop(): string{
    if (this.isEnglish) return ' TOP';
    return ' SUPERIOR';
  }
  public text_sideOuter(): string{
    if (this.isEnglish) return ' OUTER';
    return ' EXTERIOR';
  }
  public text_repeat(): string{
    if (this.isEnglish) return 'Repeat';
    return 'Repetir';
  }
  public text_confirm(): string{
    if (this.isEnglish) return 'Confirm';
    return 'Confirmar';
  }
  public text_actionMeasurements(): string{
    if (this.isEnglish) return 'View measurements';
    return 'Ver medidas';
  }
  public text_reconstructionWait(): string{
    if (this.isEnglish) return 'Waiting for reconstruction...';
    return 'Esperando reconstrucción...';
  }
  public text_reconstructionOk(): string{
    if (this.isEnglish) return 'Reconstruction';
    return 'Reconstrucción';
  }
  public text_reconstructionError(): string{
    if (this.isEnglish) return 'ERROR in reconstruction';
    return 'ERROR en reconstrucción';
  }
  public text_measuresNotAllowed(): string{
    if (this.isEnglish) return 'Unfinished reconstruction. Measurements are not available.';
    return 'La reconstrucción no se completó. No hay medidas disponibles.';
  }
  public text_actionRecommend(): string{
    if (this.isEnglish) return 'Recommend ';
    return 'Recomendar ';
  }
  public text_actionOpposite(): string{
    if (this.isEnglish) return 'Opposite-Foot';
    return 'Pie-Opuesto';
  }
  public text_reconsInfoPlus1(): string{
    if (this.isEnglish) return 'Not optimal reconstruction. Repeat the photos.';
    return 'La reconstrucción no es óptima. Repite las fotos.';
  }
  public text_reconsInfoPlus2(): string{
    if (this.isEnglish) return 'Wrong reconstruction. Repeat the photos.';
    return 'La reconstrucción es errónea. Repite las fotos.';
  }
  public text_reconsInfoPlus3(): string{
    if (this.isEnglish) return 'Not enough good images for reconstruction. Repeat the photos.';
    return 'No hay suficientes buenas imágenes para la reconstrucción. Repite las fotos.';
  }
  public text_reconsInfoPlus4(): string{
    if (this.isEnglish) return 'The dimensions of the paper sheet specified in the json file input do not match the paper sheet dimensions calculated. Repeat the photos.';
    return 'Las dimensiones de la hoja especificadas en el json no coinciden con las dimensiones de la hoja calculada. Repite las fotos.';
  }
  public text_reconsInfoMinus1(): string{
    if (this.isEnglish) return 'A general error has occurred in the reconstruction process. Repeat the photos.';
    return 'Un error general ha ocurrido en el proceso de reconstrucción. Repite las fotos.';
  }
  public text_fourCornersOfSheet(): string{
    if (this.isEnglish) return 'THE 4 CORNERS OF THE SHEET MUST';
    return 'LAS 4 ESQUINAS DE LA HOJA DEBEN';
  }
  public text_fourCornersOfSheetBis(): string{
    if (this.isEnglish) return 'BE VISIBLE IN EACH PHOTO.';
    return 'ESTAR VISIBLES EN CADA FOTO.';
  }
  public text_back(): string{
    if (this.isEnglish) return 'Back';
    return 'Atrás';
  }
  public text_continue(): string{
    if (this.isEnglish) return 'Continue';
    return 'Continuar';
  }
  public text_fill_age(): string{
    if (this.isEnglish) return 'Fill your age';
    return 'Introduce tu edad';
  }
  public text_select_genre(): string{
    if (this.isEnglish) return 'Select your genre';
    return 'Selecciona tu género';
  }
  public text_age(): string{
    if (this.isEnglish) return 'AGE';
    return 'EDAD';
  }
  public text_male(): string{
    if (this.isEnglish) return 'Male';
    return 'Hombre';
  }
  public text_female(): string{
    if (this.isEnglish) return 'Female';
    return 'Mujer';
  }
  public text_ageFilledInvalid(): string{
    if (this.isEnglish) return 'The age entered is not correct';
    return 'La edad introducida no es correcta';
  }
  public text_genderNotSelected(): string{
    if (this.isEnglish) return 'No gender was selected';
    return 'No ha seleccionado su género';
  }
  public text_recommendWait(): string{
    if (this.isEnglish) return 'Waiting for size recommendation...';
    return 'Esperando recomendación de talla...';
  }
  public text_recommendOk(): string{
    if (this.isEnglish) return 'Size recommendation';
    return 'Recomendación de talla';
  }
  public text_recommendError(): string{
    if (this.isEnglish) return 'ERROR in size recommendation';
    return 'ERROR en recomendación de talla';
  }
  public text_tallaDePie(): string{
    if (this.isEnglish) return 'SIZE FOOT';
    return 'TALLA DE PIE';
  }
  public text_paraElProducto(): string{
    if (this.isEnglish) return 'FOR THE PRODUCT CODE';
    return 'PARA EL CÓDIGO DE PRODUCTO';
  }
  public text_bilingueProducto(): string{
    return 'CÓDIGO-DE-PRODUCTO / PRODUCT-CODE';
  }
  public text_newScan(): string{
    if (this.isEnglish) return 'New-Scan';
    return 'Nuevo-Scan';
  }

  public text_bilingueAnonymous(): string{
    return 'MODO-INVITADO / ANONYMOUS-MODE';
  }
  public text_bilingueRegistered(): string{
    return 'MODO-REGISTRADO / REGISTERED-MODE';
  }

  public text_recommendCode(): string{
    if (this.isEnglish) return 'Recommend code';
    return 'Código de recomendación';
  }
  public text_requestCode(): string{
    if (this.isEnglish) return 'Request code';
    return 'Código de reconstrucción';
  }

  public text_codeusedFilledInvalid(): string{
    if (this.isEnglish) return 'The code entered is not in the correct format';
    return 'El código introducido no tiene un formato correcto';
  }

  public text_availabler(): string{
    if (this.isEnglish) return 'Right foot...';
    return 'Pie derecho...';
  }
  public text_availablerOk(): string{
    if (this.isEnglish) return 'Right foot available';
    return 'Pie derecho disponible';
  }
  public text_availablerError(): string{
    if (this.isEnglish) return 'No right foot available';
    return 'No se dispone de pie derecho';
  }
  public text_availablel(): string{
    if (this.isEnglish) return 'Left foot...';
    return 'Pie izquierdo...';
  }
  public text_availablelOk(): string{
    if (this.isEnglish) return 'Left foot available';
    return 'Pie izquierdo disponible';
  }
  public text_availablelError(): string{
    if (this.isEnglish) return 'No left foot available';
    return 'No se dispone de pie izquierdo';
  }





  public text_accPreguntaDisponeCodigo(): string{
    if (this.isEnglish) return 'Did you get reconstruction code?';
    return '¿Dispone de código de reconstrucción?';
  }
  public text_accPlaceholderCode(): string{
    if (this.isEnglish) return 'CODE';
    return 'CODIGO';
  }
  public text_accUtilizarCodigo(): string{
    if (this.isEnglish) return 'Use Code';
    return 'Utilizar Código';
  }
  public text_accPreguntaReutilizarUltima(): string{
    if (this.isEnglish) return 'Reuse last reconstruction?';
    return '¿Reutilizar la última reconstrucción?';
  }
  public text_accReutilizarUltima(): string{
    if (this.isEnglish) return 'Reuse Last';
    return 'Reutilizar Ultima';
  }
  public text_accPreguntaIniciarNueva(): string{
    if (this.isEnglish) return 'Start a new reconstruction?';
    return '¿Iniciar una nueva reconstrucción?';
  }
  public text_accIniciarNueva(): string{
    if (this.isEnglish) return 'Start New';
    return 'Iniciar Nueva';
  }

  

  //------------------------------------------------------------
  public dataFrom_jsonResponseRecommend(str_respjson: string){

    let obj_respjson = JSON.parse(str_respjson);

    let item_error_code: any = obj_respjson.error_code;
    let item_recommend_code: any = obj_respjson.recommend_code;
    let item_user_recommend: any = obj_respjson.user_recommend;

    let sErrorCode: String = new String(item_error_code);
    this.rr_error_code = sErrorCode.toString();
    console.log("str_error_code = " + this.rr_error_code);

    let sRecommendCode: String = new String(item_recommend_code);
    this.rr_recommend_code = sRecommendCode.toString();
    console.log("str_recommend_code = " + this.rr_recommend_code);

    var str_user_recommend: string = JSON.stringify(item_user_recommend);
    var str_user_recommend2: string = str_user_recommend.replace('[{', '{');
    var str_user_recommend3: string = str_user_recommend2.replace('}]', '}');
    let obj_user_recommend = JSON.parse(str_user_recommend3);

    let sProductCode: String = new String(obj_user_recommend.product_code);
    this.rr_product_code = sProductCode.toString();
    console.log("str_product_code = " + this.rr_product_code);

    let str_recommendation: string = JSON.stringify(obj_user_recommend.recommendation);
    console.log("str_recommendation = " + str_recommendation);
    let obj_recommendation = JSON.parse(str_recommendation);

    //let the_size = obj_recommendation.size;
    //let sTheSize: String = new String(the_size);
    //this.rr_size_common = sTheSize.toString();
    //console.log("SIZE = " + this.rr_size_common);
    /* */
    if (!this.isFirstFoot){
      let the_rightfoot_size = obj_recommendation.rightfoot_size;
      let sTheRight: String = new String(the_rightfoot_size);
      this.rr_size_right = sTheRight.toString();
      console.log("SIZE-RIGHT = " + this.rr_size_right);
      let the_leftfoot_size = obj_recommendation.leftfoot_size;
      let sTheLeft: String = new String(the_leftfoot_size);
      this.rr_size_left = sTheLeft.toString();
      console.log("SIZE-LEFT = " + this.rr_size_left);
    }
    else if (this.isFootRight){
      let the_rightfoot_size = obj_recommendation.rightfoot_size;
      let sTheRight: String = new String(the_rightfoot_size);
      this.rr_size_right = sTheRight.toString();
      console.log("SIZE-RIGHT = " + this.rr_size_right);
    }
    else if (this.isFootLeft){
      let the_leftfoot_size = obj_recommendation.leftfoot_size;
      let sTheLeft: String = new String(the_leftfoot_size);
      this.rr_size_left = sTheLeft.toString();
      console.log("SIZE-LEFT = " + this.rr_size_left);
    }
    /* */
  }
  //------------------------------------------------------------

  public the_rr_errorCode(): string{
    return this.rr_error_code;
  }
  public the_rr_recommendCode(): string{
    return this.rr_recommend_code;
  }
  public the_rr_productCode(): string{
    return this.rr_product_code;
  }
  public the_rr_sizeRight(): string{
    return this.rr_size_right;
  }
  public the_rr_sizeLeft(): string{
    return this.rr_size_left;
  }
  public the_rr_sizeCommon(): string{
    return this.rr_size_common;
  }

}
