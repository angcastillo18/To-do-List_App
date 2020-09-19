import React, { Component } from "react";
import Form from "./Form";
import TableTasks from "./TableTasks";

export default class App extends Component {
  state = {
    tasks: [],
    checkboxs: [],
    startDates: [],
    prioritys: [],
  };
  /* Get del state en el local storage */
  componentDidMount() {
    this.setState(JSON.parse(localStorage.getItem("tasksInfo")));
  }
  //metodo submit, ingresar tasks en la table, Obtenidos desde Form, que envia mediante props la funcion con los parametros
  handleSubmit = (data) => {
    this.setState(
      {
        tasks: [...this.state.tasks, data.task],
        checkboxs: [...this.state.checkboxs, data.checkbox],
        startDates: [
          ...this.state.startDates,
          this.changeFormatDateToString(data.startDate),
        ],
        prioritys: [...this.state.prioritys, data.radioPriority],
      },
      /* Guardar en localStorage */
      () => localStorage.setItem("tasksInfo", JSON.stringify(this.state))
    );
  };
  /*Function to Convert Date to String format */
  changeFormatDateToString(date) {
    const dateFormat = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date
      .getFullYear()
      .toString()
      .padStart(4, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    return dateFormat;
  }
  //metodo removeTask, que el parametro index es pasado por el hijo TableTask
  removeTask = (index) => {
    const { tasks, checkboxs, startDates, prioritys } = this.state;
    //ahora modificamos el objeto, y filtramos para eleminar solo el que ha sido apsado como index
    this.setState(
      {
        tasks: tasks.filter((task, i) => {
          return i !== index;
        }),
        checkboxs: checkboxs.filter((checkbox, i) => {
          return i !== index;
        }),
        startDates: startDates.filter((startDate, i) => {
          return i !== index;
        }),
        prioritys: prioritys.filter((priority, i) => {
          return i !== index;
        }),
      } /* Guardar en el local storage las tareas borradas */,
      () => localStorage.setItem("tasksInfo", JSON.stringify(this.state))
    );
  };
  /* Metodo para cambiar el estado del checkbox, y luego pasarlo como checkbox */
  onChangeCheckbox = (index) => {
    const { checkboxs } = this.state;
    this.setState(
      {
        checkboxs: checkboxs.map((checkboxValue, id) =>
          /* Si coincide con el indice, enviado como props, cambia su valor, sino devuelvele el mismo */
          id === index ? (checkboxValue = !checkboxValue) : checkboxValue
        ),
      } /* Guardar en el local storage cuando el checkbocks se cambia */,
      () => localStorage.setItem("tasksInfo", JSON.stringify(this.state))
    );
  };
  render() {
    //para pasar las tareas al hijo TableTasks, por props
    const { tasks, checkboxs, startDates, prioritys } = this.state;

    return (
      <div className='App'>
        <div className='header'>
          <div>
            <img
              className='logo'
              src={require("./list.png")}
              alt='listTask icon'
            />
            <h1>To-Do-List App</h1>
          </div>
        </div>
        <div className='container'>
          <Form handleSubmit={this.handleSubmit} />
          <TableTasks
            taskData={tasks}
            checkboxData={checkboxs}
            startDateData={startDates}
            priorityData={prioritys}
            removeTask={this.removeTask}
            onChangeCheckbox={this.onChangeCheckbox}
          />
        </div>
      </div>
    );
  }
}
