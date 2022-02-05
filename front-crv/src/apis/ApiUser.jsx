// Esta funcion me llama la API de manera generica y me envia la respuesta en forma de JSON.
// Hay q enviarle parametros: url, method etc...

export default  async function ApiUser({ url}){

    try{
        const response = await fetch(url);

            return response.json();

        }catch(error){
            Promise.reject(error);
    }

};