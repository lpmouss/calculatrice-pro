import React, { useState } from "react";

export default function List({items}) {

  const onDeleteOpe = (e, id) => {
    const response = fetch('http://localhost:8080/api/operations/'+id, {
                method: 'DELETE',
                headers: { 
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'charset':'utf-8' }
              }).then(response => {
                if (response.ok) {
                  alert(response.statusText)
                } else alert(response.statusText);
                
      //window.location.reload(false);
                return response.json();
              })
              .catch(error => {
                    alert(error);
                });
  };

  const listItems = items.map((item) =>
    <li onClick={(e) => {onDeleteOpe(e, item.id)}}>{item.description} = {item.title}</li>
  );
  return <ul>{listItems}</ul>;
}