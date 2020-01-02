import React from 'react';

class BookSearch extends React.Component {
    constructor(props) {
        super(props)
        this.handleInput = this.handleInput.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }

    state = {
        searchValue : "",
        filterItems : {
          name: "ISBN", isChecked : false,
          name: "title", isChecked : false,
          name: "subTitle", isChecked : false,
          name: "publisher", isChecked : false
        }
    }

    handleCheckbox = (name) => (event) => {
        console.log(event.target.checked);
        const items = this.state.filterItems;
        const newItems = {
            ...items,
            [name] : event.target.checked
        }
        this.setState({
            filterItems : newItems
        })
    }

    handleInput(event) {
        console.log(event.target.value);
        this.setState({
            searchValue : event.target.value
        })
    }

    keyPress  = (e) => {
        if(e.keyCode == 13){
            console.log('value', e.target.value);
            console.log(this.state.filterItems)
        }
    }

    postData() {
        console.log("hello")
    }

    render() {
        return (
            <div className="first-block">
              <input className="search-bar" onChange={this.handleInput} onKeyDown={this.keyPress} value={this.state.searchValue} placeholder="search here" />
              <ul>
                <li><input name="ISBN" checked={this.state.isChecked} onChange={this.handleCheckbox} type="checkbox" />ISBN</li>
                <li><input name="title" onChange={this.handleCheckbox} type="checkbox" />Title</li>
                <li><input name="subTitle" onChange={this.handleCheckbox} type="checkbox" />Sub Title</li>
                <li><input name="publisher" onChange={this.handleCheckbox} type="checkbox" />Publisher</li>
              </ul>
            </div>
        )
    }
}

export default BookSearch;