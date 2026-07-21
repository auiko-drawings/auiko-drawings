
import React from "react";
import sk1 from "./assets/sk1.jpg";
import sk2 from "./assets/sk2.jpg";


function PhotoCard ({title, imageUrl, text}) {
  return (
    <div style ={{ margin: "20px auto ", textAlign: "center", maxWidth:"300px", width:"90%"}}>
    
        <h3>{title}</h3>
        <img src={imageUrl} alt={title} style={{ width: "100%", height:"auto", borderRadius: "8px"}}/>
        <p>{text}</p>
    </div>
  );
}

function App() {
  const photos = [
    {title: "colors", imageUrl:sk1, text:"this is text"},
    {title: "boxes", imageUrl:sk2, text:"this is text, it should be really in the center" },
    {title: "souls", imageUrl:"", text: ""}
  ];

return (
  <div>
    <h1>post from something important</h1>

    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>

      {photos.map((photo, index)=>(
        <PhotoCard key={index} 
        title={photo.title} 
        imageUrl={photo.imageUrl} 
        text = {photo.text}/>

      ))}
    </div>

  </div>
);


}



export default App;
