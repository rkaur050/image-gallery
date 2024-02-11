import React,{useState,useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {

  const [images,setImages]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [term,setTerm]=useState('');

  useEffect(()=>{
     fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`)
    .then(res=>res.json())
     .then(data=>{
      setImages(data.hits);
      setIsLoading(false);
     })
    .catch(err=>console.log(err));
  },[term]);

  return (
    <div className="bg-orange-50">
    <div className="container mx-auto p-3">
      <ImageSearch searchText={(text)=>setTerm(text)} />
      {!isLoading && images.length===0 && <h1 className="text-5xl text-center-mx-auto mt-32">No Images Fround.</h1>}
      {isLoading?<h1 className="text-6xl text-center-mx-auto mt-32">Loading</h1>
      :<div className="grid grid-cols-3 gap-4">
        {images.map(image=>(
          <ImageCard key={image.id} image={image} />
        ))} 
      </div>}
    </div>
    </div>
  );
}

export default App;
