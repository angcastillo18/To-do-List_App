import React, { Component } from "react";

export default class TableTasks extends Component {
  render() {
    const { checkboxData, taskData, priorityData, startDateData } = this.props;
    //recorremos el prop con map y retornamos el li con la info,guardamos todo los elementos en tasks
    //con el checked, lo damos el valor true or false
    const data = taskData.map((row, index) => {
      const dateFormat = `${(startDateData[index].getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${startDateData[index]
        .getDate()
        .toString()
        .padStart(2, "0")}/${startDateData[index]
        .getFullYear()
        .toString()
        .padStart(4, "0")} ${startDateData[index]
        .getHours()
        .toString()
        .padStart(2, "0")}:${startDateData[index]
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${startDateData[index]
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
      return (
        <li key={index}>
          <input
            type='checkbox'
            name='checkbox'
            id='checkbox'
            checked={checkboxData[index]}
            onChange={() => this.props.onChangeCheckbox(index)}
          />
          <div>
            <p
              className={`dateData radioPriority__${priorityData[index]} ${
                checkboxData[index] ? "hiddenDataTask" : ""
              }`}
            >
              {dateFormat}
            </p>
            {/* Clase dinamica,Si es true, checkboxData[index]=true or false ; le añadimos la clase hiddenDataTask, sino se la quitamos*/}
            <p className={`${checkboxData[index] ? "hiddenDataTask" : ""}`}>
              {row}
            </p>
          </div>
          <button onClick={() => this.props.removeTask(index)}>x</button>
        </li>
      );
    });

    /* Conditional Rendering */
    //Si esque no hay data mostramos el mensaje de que no hay tareas
    const listData =
      data.length > 0 ? (
        <ul>{data}</ul>
      ) : (
        <div>
          <h4>Aún no hay tareas agregadas!</h4>
        </div>
      );
    return (
      <div className='taskList'>
        <h3>Mis Tareas: </h3>
        {listData}
      </div>
    );
  }
}
