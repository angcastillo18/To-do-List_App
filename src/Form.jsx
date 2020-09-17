import React, { Component } from "react";
//import datePicker Component
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const initialState = {
  task: "",
  taskError: "",
  checkbox: false,
  startDate: null,
  startDateError: "",
  radioPriority: null,
  radioPriorityError: "",
};
export default class Form extends Component {
  state = initialState;
  //recuperar el valor del input y cambiarlo
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  /* Recuperar el valor del DatePicker */
  handleChangeDate = (newDate) => {
    this.setState({
      startDate: newDate,
    });
  };
  /* Validate function */
  validate = () => {
    let taskError = "";
    let startDateError = "";
    let radioPriorityError = "";
    //Si la tarea no es vacia o sin espacios se envia por prop la funcion
    if (this.state.task.trim() === "") {
      taskError = "Tarea invalida";
    }
    if (this.state.startDate === null) {
      startDateError = "Ingrese una fecha";
    }
    if (this.state.radioPriority === null) {
      radioPriorityError = "Ingrese una prioridad";
    }
    //modificamos el state de TaskError,y retornamos falso si es que invalido
    if (taskError || startDateError || radioPriorityError) {
      this.setState({ taskError, startDateError, radioPriorityError });
      return false;
    }

    return true;
  };
  //enviar por prop la function al APP.JS
  addTask = (e) => {
    e.preventDefault();
    //validacion de agregar Tarea
    const isValid = this.validate();

    if (isValid) {
      this.props.handleSubmit(this.state);
      //clear form or reset
      this.setState(initialState);
    }
  };
  render() {
    const { task, startDate, radioPriority } = this.state;
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
          {/* Show error */}
          <div style={{ color: "red", fontSize: 16 }}>
            {this.state.taskError}
          </div>
          {/* DatePicker component */}
          <div>
            <label htmlFor=''>Ingrese la fecha de su tarea :</label>
            <DatePicker
              selected={startDate}
              onChange={this.handleChangeDate}
              minDate={new Date()}
              closeOnScroll={true}
              placeholderText='mm/dd/yyyy'
              dateFormat='dd/MM/yyyy h:mm aa'
              timeInputLabel='Time:'
              showTimeInput
            />
          </div>
          <div style={{ color: "red", fontSize: 16 }}>
            {this.state.startDateError}
          </div>
          {/* Radio Button */}
          <div>
            <label htmlFor=''>Seleccione la prioridad de su tarea : </label>
            <br />
            <div className='container-radioGroup'>
              <label className='radioPriority__high'>
                Alta:
                <input
                  type='radio'
                  name='radioPriority'
                  value='high'
                  checked={radioPriority === "high"}
                  onChange={this.handleChange}
                />
              </label>
              <label className='radioPriority__mid'>
                Media:
                <input
                  type='radio'
                  name='radioPriority'
                  value='mid'
                  checked={radioPriority === "mid"}
                  onChange={this.handleChange}
                />
              </label>
              <label className='radioPriority__low'>
                Baja:
                <input
                  type='radio'
                  name='radioPriority'
                  value='low'
                  checked={radioPriority === "low"}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            {/* Show error */}
            <div style={{ color: "red", fontSize: 16 }}>
              {this.state.radioPriorityError}
            </div>
          </div>
          <button type='submit' onClick={this.addTask}>
            Guardar Tarea
          </button>
        </form>
      </div>
    );
  }
}
