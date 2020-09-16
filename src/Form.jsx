import React, { Component } from "react";

export default class Form extends Component {
  state = { task: "", checkbox: false };
  //recuperar el valor del input y cambiarlo
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  //enviar por prop la function al APP.JS
  addTask = (e) => {
    e.preventDefault();
    //validacion de agregar Tarea
    const { task } = this.state;
    //Si la tarea es vacia o sin espacios no envia por prop la funcion
    if (task.trim() !== "") {
      this.props.handleSubmit(this.state);
    }
    this.setState({
      task: "",
    });
  };
  render() {
    const { task } = this.state;
    return (
      <div className='form'>
        <form>
          <label htmlFor='task'>Ingresa las tareas que desees :</label>
          <input
            type='text'
            id='task'
            name='task'
            value={task}
            placeholder='Ingresa una tarea'
            onChange={this.handleChange}
          ></input>
          <button type='submit' onClick={this.addTask}>
            Guardar Tarea
          </button>
        </form>
      </div>
    );
  }
}
