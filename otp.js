//OTP generation 
let value="1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let pass="";

let generateotp=(otpLength)=>
{
    pass=""
    for(let i=0;i<otpLength;i++)
    {
        pass+=value.charAt(Math.floor(Math.random()*value.length));
    }
    return pass;
}
console.log(generateotp(6))
let otp = (L) => document.output.box.value=generateotp(L); 