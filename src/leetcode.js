/*
第一题：回文数判断
 */
var isPalindrome = function(x) {
    if(x<0){
        return false;
    }
    if(x>0 && x<10){
        return true;
    }
    let n = 10**Math.floor(Math.log10(x));
    while(n>1 && x>0){
        let a = Math.floor(x/n);
        let b = Math.floor(x%10);
        //console.log('a='+a+' b='+b);
        if(a!=b){
            return false;
        }else{
            x = Math.floor(x%n/10);
            n/=100;
            //console.log('x='+x+' n='+n);
        }
    }
    return true;
};

//console.log(isPalindrome(1221))

