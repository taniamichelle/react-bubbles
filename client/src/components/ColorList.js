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
  // const [addColor, setAddColor] = useState([]);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // 'save' submit handler
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      // Make a put request to save your updated color
      // think about where will you get the id from. where is it saved right now?
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('updated color data', res);
        updateColors(colors.map(color => {
          if (colorToEdit.id === color.id) {
            return colorToEdit
          }
          return color;
        }))
        setEditing(true)
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    axiosWithAuth()
      // make a delete request to delete this color
      .delete(`http://localhost:5000/api/colors/${color.id}`, color)
      .then(res => {
        console.log(res);
        updateColors(colors.filter(color => {
          if (color.id !== color.id) {
            return color.id;
          };
        }))
        // history.push('/colors');
      })
      .catch(err => console.log(err.response));
  };

  // submit handler for color form
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   axios.put(`http://localhost:5000/api/colors/${props.match.params.id}`, colorToEdit)
  //     .then(res => {
  //       console.log(res);
  //       history.push('/colors');
  //     })
  //     .catch(err => console.log(err.response));
  // };

  // change handler for color form
  // const handleColor = index => event => {
  //    setColorToEdit({
  //      ...colorToEdit, colors: colorToEdit.colors.map((color, colorIndex) => {
  //        return colorIndex === index ? event.target.value : color;
  //      })
  //    });
  // };

  // add color fxn for color form
  // const addColor = event => {
  //   event.preventDefault();
  //   setColorToEdit({ ...colorToEdit, colors: [...colorToEdit, ""] });
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
      {/* <form onSubmit={handleColor}>
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
