var body = document.getElementsByTagName("body")[0]; 

export default {
  fix(){
    body.style.position = 'fixed';
  },
  unFix(){
    body.style.position = 'relative';
  }
}