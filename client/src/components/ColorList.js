import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, history }) => {
  //console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  //submit handler
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      // Make a put request to save your updated color
      // think about where will you get the id from. where is it saved right now?
      .put(`http://localhost:5000/api/colors/:id`, colorToEdit)
      .then(res => {
        console.log('res data', res);
        history.push('/colors');
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`, color)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  };

  //submit handler for color form
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   axios.put(`http://localhost:5000/api/colors/${colors.id}`, colors)
  //     .then(res => {
  //       console.log(res);
  //       props.history.push('/colors');
  //     })
  //     .catch(err => console.log(err.response));
  // };

  // change handler for color form
  // const handleColor = event => setMovie({
  //   ...color, [event.target.name]: event.target.value 
  // });

  // const addColor = event => {
  //   event.preventDefault();
  //   setEditing({ ...editing, color: "" });
  // };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='color'
          value={color.color}
          onChange={handleColor}
        />
         <input
          type='text'
          name='code'
          value={color.code}
          onChange={handleColor}
        />
        <button onClick={addColor}>Add Color</button>
      </form> */}
    </div>
  );
};

export default ColorList;
