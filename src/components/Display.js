import React, { useState, useEffect } from "react";
import "./styles/Display.css";

const Display = ({ input, setInput, answer }) => {
  const onChangeTagInput = (e) => {
    const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setInput(e.target.value);
    }
  };

  const [operationData, setOperationData] = useState([]);
  useEffect(() => {
    const fetchPositions = async () => {
        const token = sessionStorage.getItem("token");
        const response = await fetch('http://localhost:8080/api/operations?fk_user_id='+token, {
        }).then(response => {
          if (response.ok) {
            alert(response.statusText)
          } else alert(response.statusText);
          
          return response.json();
              })
        .then((actualData) => {
          console.log(actualData);
        setOperationData(actualData);
        })
        .catch(error => {
              alert(error);
          });
    };

    fetchPositions();
  }, []);


  return (
    <>
    <ul>
      {operationData.map((item, i) => (
        <li>{item.description} = {item.title}</li>
      ))}
    </ul>
      <div className="display">
        {answer === "" ? (
          <>
            <input
              type="text"
              name="input"
              className="input"
              style={{ padding: "29px" }}
              value={input}
              placeholder="0"
              maxLength={12}
              // disabled
              onChange={onChangeTagInput}
              autoComplete="off"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="input"
              className="value"
              value={input}
              placeholder="0"
              maxLength={12}
              disabled
            />
            <input
              type="text"
              name="value"
              className="input"
              value={answer}
              disabled
            />
          </>
        )}
      </div>
    </>
  );
};

export default Display;
