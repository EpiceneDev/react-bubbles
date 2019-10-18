import React, { useState, useEffect } from "react";
import axiosWithAuth from "./utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    //console.log('EDIT COLOR:', color)
  };

  const saveEdit = e => {
    e.preventDefault();
    //console.log("SAVE EDIT", colorToEdit)
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
        .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
        .then(res => {
          console.log("EDIT", res);
          updateColors([...colors], res.data);
          setEditing(!editing);
        })
        .catch(err => console.log("EDITING API", err.res));
        //props.history.push('/');
        
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/api/colors")
      .then(res => {
        console.log('GET COLORLIST', res);
        updateColors(res.data);
      })
      .catch(err => console.log(err.res))
}, [editing]);
 
          

  const deleteColor = color => {
    console.log("DELETE", color)
    axiosWithAuth()
      .delete(`/api/colors/:${color.id}`)
      .then(res => {
        console.log("DELETE API",res);
      updateColors(colors.filter(el => el.id !== color.id));
      })
      .catch(err => console.log(err.res));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} >
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div 
              onClick={() => editColor(color)}
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
    </div>
  );
};

export default ColorList;
