import React from 'react';
import closeLogo from '../assets/cancel.png';
import { isTSExpressionWithTypeArguments } from '@babel/types';

class ProfileCreate extends React.Component {
    constructor (props) {
        super(props)

        this.handleInput = this.handleInput.bind(this)
        this.submitProfile = this.submitProfile.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    state = {
        inputValues : {
            title : "",
            subTitle : "",
            author : "",
            description : "",
            publisher : "",
            category : "",
            ISBN : ""
        },
        modal : false,
        isLoaded : false,
        error : null,
        result : ''
    }

    componentWillReceiveProps(props) {
        console.log("props from creat profile component", props);
        this.setState({
            modal : props.createModal
        })
    }

    handleInput = (propertVal) => (event) => {
        const inputs = this.state.inputValues;
        const newInputs = {
            ...inputs,
            [propertVal] : event.target.value
        }
        this.setState({
            inputValues : newInputs
        })
    }

    submitProfile(event) {
        const validForm = this.state.inputValues;
        if (validForm.title === "" || 
            validForm.author === "" || 
            validForm.subTitle === "" || 
            validForm.description === "" || 
            validForm.publisher === "" ||
            validForm.ISBN === "") {
            event.preventDefault();
            return alert("fill the inputs");    
        }else{
            this.formSubmit();
            event.preventDefault();
        }
    }

    formSubmit() {
        const data = this.state.inputValues;
        fetch('http://localhost:3100/book', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then ( resp => resp.json())
        .then ( result => {
            this.setState({
                isLoaded : false,
                result : result,
                modal : false
            })
        }, error => {
            this.setState({
                isLoaded : true,
                error : error
            })
        })
    }

    componentWillUnmount() {
        
    }

    closeModal() {
        this.setState({
            modal : false
        })
    }

    render () {
        if (this.state.modal) {
            return (
                <div className="edit-modal">
                    <div>
                        <img src={closeLogo} onClick={this.closeModal} />
                        <form>
                            <input name="title" value={this.state.inputValues.title} placeholder="Title" onChange={this.handleInput('title')} />
                            <input name="subTitle" value={this.state.inputValues.subTitle} placeholder="Subitle" onChange={this.handleInput('subTitle')} />
                            <input name="author" value={this.state.inputValues.author} placeholder="Author" onChange={this.handleInput('author')} />
                            <input name="description" value={this.state.inputValues.description} placeholder="Description" onChange={this.handleInput('description')} />
                            <input name="publisher" value={this.state.inputValues.publisher} placeholder="Publisher" onChange={this.handleInput('publisher')} />
                            <input name="category" value={this.state.inputValues.category} placeholder="category" onChange={this.handleInput('category')} />
                            <input name="ISBN" value={this.state.inputValues.ISBN} placeholder="ISBN" onChange={this.handleInput('ISBN')} />
                            <button onClick={this.submitProfile}>Submit</button>
                        </form>
                    </div>
                </div>
            )   
        }else if (this.state.error) {
            return <div>Error:{this.state.error}</div>
        }else if (this.state.isLoaded) {
            return <div>loading....</div>
        }else if (this.state.result.message === "success") {
            setTimeout( ()=> {
                return <div>form sussessfully submitted</div>
            }, 1000)
        }{
            return ""
        }
    }
}

export default ProfileCreate;