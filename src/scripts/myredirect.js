export function redirect_to_url_target(){
    const the_url_target = localStorage.getItem('feet_url_target');
    window.location.href = the_url_target;
}