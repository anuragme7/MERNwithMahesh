function login(auth) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();
        
        http.onload = function () {
            
            resolve(http.response); 
        };
        http.onerror = function (e) {
            
            reject(e); 
        };
        
        http.open(
            "GET",
            "http://localhost:9081/login"
        );
        console.log("in Promise");
        // console.log("Id="+id);
        // if( id === undefined || id===''){
        //     http.setRequestHeader('id',0); 
        // }
        // else{
        //     http.setRequestHeader('id',parseInt(id)); 
        // }
        http.setRequestHeader('Authorization',auth);  
        http.send();
        
    });
}

window.onload=function() {
    document.getElementById('sbtbtn').addEventListener('click',function(){
        let auth='Basic ';
        auth=`${auth}${document.getElementById('username').value}:`;
        auth=`${auth}${document.getElementById('password').value}`;
        let response = login(auth);
        response.then(function(resp){
            if(resp==='true'){
                document.getElementById('dvdata').innerHTML = "Valid Credentials";
                localStorage.clear();
                localStorage.setItem('Cred',auth);
                document.getElementById('Products').click();
            }    
            else{
                document.getElementById('dvdata').innerHTML = "UserName or Password may be wrong.<br>Check for spellings or spaces<br>";
            }    
            
        }).catch(function(e){
            document.getElementById('dvdata').innerText = e;
            
        });
    },false);
}