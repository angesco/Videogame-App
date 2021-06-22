import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getAllGames, getGameDetail, getGenres } from "../../actions/index.js";

import "./creategame.css";

export function CreateGame(props) {
  const [input, setInput] = useState({
    name: "",
    rating: "",
    description: "",
    released: "",
    platforms: "",
    genres: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleGeneres(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.id],
      });
    } else {
      setInput({
        ...input,
        genres: input.genres.filter((id) => id !== e.target.id),
      });
    }
  }

  function handlePlatforms(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: input.platforms.concat(" ",e.target.name)
      });
    } else {
      setInput({
        ...input,
        platforms: input.platforms.filter((name) => name !== e.target.name),
      });
    }
  }

  useEffect(() => {
    props.getAllGames();
    props.getGenres();
  }, []);

  const allPlatforms = ["Xbox One", "Xbox 360", "Xbox Series X", "PS5", "PS4", "PS3", "Nintendo Switch", "PC"]

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    axios
      .post("http://localhost:3001/videogame", {
        name: input.name,
        description: input.description,
        genres: input.genres,
        platforms: input.platforms,
        rating: input.rating,
        released: input.released,
      })
      .then((e) => alert("Your video game has been created successfully!"))
      .catch((e) => console.log(e));
  }

  return (
    <div className="contForm">
      <div className="creat">
        <div className="asdd">
          <h1>Create Videogame</h1>
        </div>
        <div className="desc">
          <p className="textCreate">
            {" "}
            <strong>Welcome to the videogame creation page!</strong> <br />
            <br />
            If you are interested in creating your own game THIS is your time to
            show what you are made of
          </p>
        </div>
      </div>

      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p className="texto">Videogame Name</p>
          <input
            placeholder="Name"
            type="text"
            name="name"
            required="required"
            value={input.name}
            onChange={handleChange}
            className="inpputs"
          />
        </div>

        <div>
          <p className="texto">Videogame Rating (1-5)</p>
          <select
            className="selects"
            name="rating"
            value={input.rating}
            onChange={handleChange}
            required
          >
            <option value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <p className="texto">Description</p>
          <input
            placeholder="Description"
            type="text"
            name="description"
            // required="required"
            value={input.description}
            onChange={handleChange}
            style={({ marginTop: "10px" }, { marginBottom: "5px" })}
            className="inpputs"
          />
        </div>

        <div>
          <p className="texto">Released</p>
          <input
            type="date"
            className="selects"
            name="released"
            value={input.released}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="ALL">
          <div>
            <p className="texto">Genres</p>
            <div>
              {props.genres &&
                props.genres.map((g) => {
                  return (
                    <div key={g.id}>
                      <input
                        type="checkbox"
                        name={g.name}
                        value={g.name}
                        id={g.id}
                        onClick={(e) => handleGeneres(e)}
                      ></input>
                      <label for={g.name} className="labelText">
                        {g.name}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
              <label className="textPlatforms">Platforms</label>
              <ul className="ulPla">
                {allPlatforms.map((P) => (
                  <li className="liPla" key={P}>
                    <input
                      className="input"
                      type="checkbox"
                      name={P}
                      value={P}
                      onClick={(e) => handlePlatforms(e)}
                    ></input>
                    <label name={P} className="labelText">{P}</label>
                  </li>
                ))}
              </ul>
            </div>
        </div>
        <input className="cract" type="submit" value="Create Videogame" />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videogames: state.videogames,
    gameName: state.gameName,
    genres: state.genres,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllGames: () => dispatch(getAllGames()),
    getGameDetail: (id) => dispatch(getGameDetail(id)),
    getGenres: () => dispatch(getGenres()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);