import React from 'react';
import closeLogo from '../assets/cancel.png';

class BookEdit extends React.Component {
    constructor(props) {
        super(props)
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    state = {
        modal : this.props.bookEditData.modal,
        inputValues : {
            title : "",
            subTitle : "",
            author : "",
            description : "",
            publisher : "",
            category : "",
            ISBN : ""
        },
        result : ""
    }

    componentWillReceiveProps(props){
        console.log(props)
        this.setState({
            modal : props.bookEditData.modal,
            inputValues : props.bookEditData.item
        })
    }

    handleInput = (inputName) => (event) => {
       const inputs = this.state.inputValues;
       const newInputs = {
           ...inputs,
           [inputName] : event.target.value
       }
       this.setState({
            inputValues : newInputs
       })
    }

    submitForm (event) {
        this.props.bookEditallback(this.state);
        this.editService();
        event.preventDefault();
    }

    editService() {
        const data = this.state.inputValues;
        console.log(data)
        fetch('http://localhost:3100/book/update', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then ( resp => resp.json())
        .then ( result => {
            this.setState({
                result : result,
                modal : false
            })
        }, error => {
            this.setState({
                error : error
            })
        })
    }

    closeModal () {
        this.setState({
            modal : false
        })
    }

    render () {
        const { modal } = this.state;

        if(modal){
            return(
                <div className="edit-modal">
                    <div>
                        <img src={closeLogo} onClick={this.closeModal} />
                        <form>
                        <input name="title" value={this.state.inputValues.title} placeholder="Title" onChange={this.handleInput('title')} />
                        <input name="subTitle" value={this.state.inputValues.subTitle} placeholder="Subtitle" onChange={this.handleInput('subTitle')} />
                        <input name="author" value={this.state.inputValues.author} placeholder="Author" onChange={this.handleInput('author')} />
                        <input name="description" value={this.state.inputValues.description} placeholder="Description" onChange={this.handleInput('description')} />
                        <input name="publisher" value={this.state.inputValues.publisher} placeholder="Publisher" onChange={this.handleInput('publisher')} />
                        <input name="category" value={this.state.inputValues.category} placeholder="category" onChange={this.handleInput('category')} />
                        <input name="ISBN" value={this.state.inputValues.ISBN} placeholder="ISBN" onChange={this.handleInput('ISBN')} />
                            <button onClick={this.submitForm}>Submit</button>
                        </form>
                    </div>
                </div>
            )
        }else{
            return ""
        }
    }
}

export default BookEdit;