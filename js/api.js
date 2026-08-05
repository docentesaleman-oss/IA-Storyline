async function askGPT(text){

    try{

        const response = await fetch("http://localhost:3000/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message:text
            })

        });

        const data = await response.json();

        return data.reply;

    }
    catch(error){

        console.error(error);

        return "Error al conectar con el servidor.";

    }

}