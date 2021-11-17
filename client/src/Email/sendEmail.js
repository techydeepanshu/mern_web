export const sendEmail = async (emaildata,where) =>{
    if(where === "contact"){

        const res = await fetch("http://localhost:5000/sendmail",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:emaildata.name,email:emaildata.email,phone:emaildata.phone,message:emaildata.message
            }),
            credentials:"include"
        })
        const resData = await res.json();
        // console.log(resData);
        if(res.status === 200){
            return true;
        }else{
            return false;
            
        }
    }else if(where === "register"){
        const res = await fetch("http://localhost:5000/sendmailregistered",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                emaildata
            }),
            credentials:"include"
        })
        const resData = await res.json();
        // console.log(resData);
        if(res.status === 200){
            return true;
        }else{
            return false;
            
        }
    }
}