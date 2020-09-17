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
  //metodo submit, ingresar tasks en la table, Obtenidos desde Form, que envia mediante props la funcion con los parametros
  handleSubmit = (data) => {
    this.setState({
      tasks: [...this.state.tasks, data.task],
      checkboxs: [...this.state.checkboxs, data.checkbox],
      startDates: [...this.state.startDates, data.startDate],
      prioritys: [...this.state.prioritys, data.radioPriority],
    });
  };
  /*   onCheckChange = (index, data) => {
    console.log(index, data);
  }; */
  //metodo removeTask, que el parametro index es pasado por el hijo TableTask
  removeTask = (index) => {
    const { tasks, checkboxs, startDates, prioritys } = this.state;
    //ahora modificamos el objeto, y filtramos para eleminar solo el que ha sido apsado como index
    this.setState({
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
    });
  };
  /* Metodo para cambiar el estado del checkbox, y luego pasarlo como checkbox */
  onChangeCheckbox = (index) => {
    const { checkboxs } = this.state;
    this.setState({
      checkboxs: checkboxs.map((checkboxValue, id) =>
        /* Si coincide con el indice, enviado como props, cambia su valor, sino devuelvele el mismo */
        id === index ? (checkboxValue = !checkboxValue) : checkboxValue
      ),
    });
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
