import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);

  // this fxn performs get request and updates our state
  const getColors = () => {
    // fetch your colors data from the server when the component mounts
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        console.log('BubblePage data:', res);
        // set that data to the colorList state property
        setColorList(res.data);
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
