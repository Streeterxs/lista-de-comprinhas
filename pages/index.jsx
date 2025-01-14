import React, { useState } from "react";
import { FaItunesNote, FaTrash } from "react-icons/fa";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import Head from "next/head";

const App = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState("");

  function idGen() {
    return Math.random() * 10000;
  }

  const handleAddItem = () => {
    value !== "" &&
      setItems([
        {
          id: idGen(),
          name: value,
          isCompleted: false,
        },
        ...items,
      ]);
    setValue("");
  };

  const handleChecked = (id) => {
    const checkedItems = items.map((item) => {
      return item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item;
    });
    setIsEditing(false);
    setItems(checkedItems);
  };

  const deleteCheckedItems = (id) => {
    const newItems = items.filter(
      (item) => (item.id !== id) & (item.isCompleted === false)
    );

    setItems(newItems);
  };

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const updateItem = (itemID) => {
    const updatedItems = items.map((item) => {
      return item.id === itemID ? { ...item, name: newValue } : item;
    });
    setItems(updatedItems);
    console.log(items);
  };

  const handleEditing = (id) => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="container">
      {items.length === 0 ? (
        <Head>
          <title>Nenhum item adicionado</title>
        </Head>
      ) : items.length === 1 ? (
        <Head>
          <title>1 item</title>
        </Head>
      ) : (
        <Head>
          <title>{items.length} itens</title>
        </Head>
      )}

      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={value}
        className="item-input"
        onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Não esqueça dos legumes..."
      />
      <br />
      <div className="buttons">
        <button onClick={handleAddItem} className="add-button">
          Adicionar item
        </button>
        <button onClick={deleteCheckedItems} className="delete-button">
          Excluir itens marcados
        </button>
      </div>
      <div>
        {items.map((item) => (
          <div className="item-list" key={item.id}>
            <span className="item-list-span">
              <button type="checkbox" onClick={() => handleChecked(item.id)}>
                {item.isCompleted === false ? (
                  <AiOutlineCheckCircle size={23} className="check-button" />
                ) : (
                  <AiFillCheckCircle size={23} className="check-button" />
                )}
              </button>

              {item.isCompleted === false ? (
                <p onClick={() => handleEditing(item.id)}>{item.name}</p>
              ) : (
                <p className="complete">{item.name}</p>
              )}
            </span>
            <FaTrash
              style={{ cursor: "pointer" }}
              onClick={() => deleteItem(item.id)}
            />
            {isEditing === true && (
              <input
                className="newInput"
                onKeyPress={(e) => e.key === "Enter" && updateItem(item.id)}
                onChange={(e) => setNewValue(e.target.value)}
                type="text"
                placeholder="Novo nome"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
