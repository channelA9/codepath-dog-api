const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

import { useState } from "react";

import "./App.css";
import Dog from "./components/Dog";
import React from "react";
import Tag from "./components/Tag";
import VisTag from "./components/VisTag";
function App() {
  const [currentImage, setCurrentImage] = useState("");

  const [Tags, setTags] = useState([<></>]);
  const [FilteredTags, setFilteredTags] = useState([<></>]);
  const [imgHist, setImgHist] = useState([<></>]);

  const [valFilteredTags, setValFilteredTags] = useState([""]);

  function pushToHist(imgUrl: string) {
    setImgHist([
      ...imgHist,
      <Dog style="h-32 my-2 drop-shadow-md" imgLink={imgUrl} />,
    ]);
  }


  function addFilteredTag(shi: string) {
    console.log(shi)
    console.log(valFilteredTags)
    setValFilteredTags([...valFilteredTags, shi,]);
    console.log(valFilteredTags)
    setFilteredTags([...FilteredTags,<VisTag tagName={shi}/>,]);
    
  }

  function readTags(data: Object) {
    data.breeds.forEach((element) => {
      setTags([
        <Tag tagName={element.name} btn={addFilteredTag} />,
        <Tag tagName={element.life_span} btn={addFilteredTag} />,
        <Tag tagName={element.breed_group} btn={addFilteredTag} />,
      ]);
    });
  }

  const callAPI = async (query: string) => {
    const response = await fetch(query);
    const json = await response.json();
    const dataDog = json[0];
    console.log(json);
    if (dataDog.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      let involved = false;
      dataDog.breeds.forEach((element: Object) => {
        if (valFilteredTags.includes(element.name) || valFilteredTags.includes(element.life_span) || valFilteredTags.includes(element.breed_group)) {
          involved = true;
        }
      });
      
      if (!involved) {
        readTags(dataDog);
        setCurrentImage(dataDog.url);
        pushToHist(dataDog.url);
      }
      else {
        callAPI(query);
      }
    }
  };

  const makeQuery = () => {
    let query = `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}&include_breeds=true&order=RANDOM`;
    callAPI(query).catch(console.error);
  };

  const buttonPress = () => {
    makeQuery();
  };

  return (
    <div className="App">
      <div className="h-screen w-screen flex flex-col md:flex-row place-content-center ">
        <div className="w-screen h-fit md:h-screen md:w-64 flex-none bg-slate-100 flex md:flex-col place-content-start place-items-center overflow-hidden md:overflow-scroll">
          <h1 className="text-2x m-12">FILTERED TAGS</h1>
          {FilteredTags}
        </div>
        <div className="flex-grow flex flex-col place-content-start place-items-center m-4">
          <h1 className="text-4xl  m-12">RANDOM DOG</h1>
          <span className="flex ">{Tags}</span>
          <Dog style="h-1/2 w-1/2 drop-shadow-md" imgLink={currentImage} />
          <button
            className=" bg-blue-600 p-8 m-8 text-white font-black hover:bg-blue-800 text-xl"
            onClick={buttonPress}
          >
            NEW IMAGE
          </button>
        </div>
        <div className="w-screen h-fit md:h-screen md:w-64 flex-none flex-row-reverse md:flex-col-reverse bg-slate-100 flex place-content-start place-items-center overflow-hidden md:overflow-scroll">
          {imgHist}
          <h1 className="text-2x m-12">PAST IMAGES</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
