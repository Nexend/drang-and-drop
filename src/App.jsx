import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import listOfSomething from './gateway/list';
import { getItem, setItem } from './gateway/storage';

const App = () => {
  const listItems =
    !getItem('listItems') || getItem('listItems').length === 0
      ? listOfSomething
      : getItem('listItems');

  const countOrder =
    !getItem('listItems') || getItem('listItems').length === 0 ? -1 : getItem('countOrder');

  const [list, setList] = useState(listItems);
  const [value, setValue] = useState('');
  const [currentListItem, setCurrentListItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [counterOfOrder, setCounterOfOrder] = useState(countOrder);

  setItem('listItems', list);
  setItem('countOrder', counterOfOrder);

  useEffect(() => {
    if (listItems) {
      setList(listItems);
    }
    if (countOrder) {
      setCounterOfOrder(countOrder);
    }
  }, []);

  const maxItemsOnPage = 10;
  const start = (currentPage - 1) * maxItemsOnPage;
  const listToDisplay = list.slice(start, start + maxItemsOnPage);

  const dragOverHandler = e => {
    e.preventDefault();
    e.target.style.background = 'gray';
  };

  const dropHandler = (e, item) => {
    e.preventDefault();

    setList(
      list.map(el => {
        if (el.id === item.id) {
          return { ...el, order: currentListItem.order };
        }
        if (el.id === currentListItem.id) {
          return { ...el, order: item.order };
        }
        return el;
      }),
    );

    e.target.style.background = '#fff';
  };

  const addElement = () => {
    setCounterOfOrder(counterOfOrder - 1);

    const newElement = {
      text: value,
      id: `id-${counterOfOrder}`,
      order: counterOfOrder,
    };

    if (value) {
      setList([newElement].concat(list));
    }
    setValue('');
  };

  const deleteItem = id => {
    const updatedList = list.filter(item => item.id !== id);

    setList(updatedList);
  };

  const editHandler = e => {
    e.target.disabled = false;
  };

  const sortedListToDisplay = listToDisplay.slice().sort((a, b) => a.order - b.order);

  return (
    <div className="page">
      {currentPage < 2 ? (
        <div className="create-element">
          <input
            className="create-element__input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="create-element__btn" onClick={addElement}>
            Add
          </button>
        </div>
      ) : null}

      <ul className="list">
        {sortedListToDisplay.map(item => (
          <div onDoubleClick={editHandler} className="list__container" key={item.id}>
            <li
              className="list__container-item"
              draggable={true}
              onDragStart={() => setCurrentListItem(item)}
              onDragLeave={e => (e.target.style.background = '#fff')}
              onDragEnd={e => (e.target.style.background = '#fff')}
              onDragOver={e => dragOverHandler(e)}
              onDrop={e => dropHandler(e, item)}
            >
              {item.text}
            </li>
            <button onClick={() => deleteItem(item.id)} className="list__container-btn">
              x
            </button>
          </div>
        ))}
      </ul>

      <Pagination
        goPrev={() => setCurrentPage(currentPage - 1)}
        goNext={() => setCurrentPage(currentPage + 1)}
        currentPage={currentPage}
        totalItems={list.length}
        maxItemsOnPage={maxItemsOnPage}
      />
    </div>
  );
};

export default App;
