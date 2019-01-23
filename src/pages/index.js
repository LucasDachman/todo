import React from "react"

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.setText = this.setText.bind(this)
    this.state = {
      listItems: ['thing 1'],
      newItemText: ''
    }
  }  

  addItem(e) {
    e.preventDefault();
    if (!this.canSubmit())
      return

    this.setState((state) => {
      return {
        listItems: state.listItems.concat([state.newItemText]),
        newItemText: ''
      }
    })
  }

  removeItem(index) {
    this.setState((state) => {
      return {
        listItems: state.listItems.slice(0, index).concat(state.listItems.slice(index + 1))
      }
    })
  }

  setText(e) {
    this.setState({newItemText: e.target.value})
  }

  canSubmit() {
    return this.state.newItemText !== ''
  }

  render() {
    return (
      <div className='container'>
        <h1>Todo</h1>
        <form className='add-section' onSubmit={this.addItem}>
          <input type='text' value={this.state.newItemText} onChange={this.setText}/>
          <input type='submit' value='add' disabled={!this.canSubmit()}/>
        </form>
        <section className='items-section'>
          {this.state.listItems.map((title, i) => {
            return <ListItem title={`${i+1}. ${title}`} onClickDelete={() => this.removeItem(i)} key={i}/>
          })}
        </section>
      </div>
    )
  }
}

const ListItem = (props) => (
  <div className='todo-item'>
    <p>{props.title}</p>
    <button type='button' onClick={props.onClickDelete}>X</button>
  </div>
)


export default Todo