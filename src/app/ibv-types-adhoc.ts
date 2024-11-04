export interface JSONloginRequest {
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
    grant_type: string;
    pass_encript: string;
}
//license_code: string;

//device: string;


export interface JSONinput1Content {
    sheet_model: number;
    foot_type: number;
    ac0_0: string;
    ac1_0: string;
    ac2_0: string;
    ac0_1: string;
    ac1_1: string;
    ac2_1: string;
    ac0_2: string;
    ac1_2: string;
    ac2_2: string;
}

export interface JSONobjInput {
    extension: string;
    content_file: string;
}

export interface JSONobjFiles {
    input1: any;
    input2: any;
    input3: any;
    input4: any;
}


export interface JSONreconstructionParameters {
    age: number;
    gender: string;
}

export interface JSONreconstructionParametersBis {
    age: number;
    gender: string;
    request_code: string;
}


export interface JSONreconstructionRequest {
    files: any;
    parameters: any;
}


export interface JSONrecommendParameters {
    product_code: string[];
    request_code: string[];
    include_user_profile: string;
    recommend_by_foot: string;
}
export interface JSONrecommendParametersBis {
    product_code: string[];
    request_code: string[];
    include_user_profile: string;
    recommend_by_foot: string;
}
//code_user: string;


export interface JSONrecommendsizeRequest {
    parameters: any;
}


export interface JSONavailableRequest{
    request_code: string;
    foot_type: number;
}

