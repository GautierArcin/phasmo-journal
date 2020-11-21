import { useState, useEffect } from "react";
import Button from "./components/Button";
import proofs from "./data/proofs";
import spirits from "./data/spirits";
import "./App.css";

const App = () => {
  const [types, setTypes] = useState([]);

  const toggleFilter = (filter) => {
    if (types.includes(filter)) {
      // Remove "filter" from "types".
      setTypes(types.filter((t) => t !== filter));

      // const arr = []
      // for(let i = 0 ; i < types.length ; ++i) {
      //   if(types[i] !== filter) {
      //     arr.push(types[i])
      //   }
      // }
      // setTypes(arr)
    } else {
      setTypes([...types, filter]);
    }
  };

  const shouldDisplayButton = (list) => {
    return types.every((v) => list.includes(v));
  };

  const shouldDisplayProof = () => true;

  useEffect(() => {
    console.log(types);
  }, [types]);

  return (
    <div className="App">
      <div className="grid">
        {proofs.map(
          (p) =>
            shouldDisplayProof(p) && (
              <Button
                title={p.title}
                description={p.description}
                variant={p.name}
                onClick={() => toggleFilter(p.name)}
                active={types.includes(p.name)}
              />
            )
        )}
      </div>
      <div className="grid">
        {spirits.map(
          (s) =>
            shouldDisplayButton(s.types) && (
              <Button
                title={s.name}
                variant={s.name}
                description={s.description}
                types={s.types}
              />
            )
        )}
      </div>
    </div>
  );
};

export default App;
