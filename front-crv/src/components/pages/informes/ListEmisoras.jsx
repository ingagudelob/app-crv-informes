import ListItemEmisoras from "./ListItemEmisoras";

// {...emisora} para que se vaya todo el objeto como propiedad
// es lo mismo q colocar name = emisora.name url= emisora.url
// puesto q son los dos argumento q trae el componente

export default function ListEmisoras ({emisoras}){
    return(
        <div>
            {emisoras?.map((emisora, index)=>(
                    <ListItemEmisoras key={index} {...emisora}/>
            ))}
        </div>
    );
};