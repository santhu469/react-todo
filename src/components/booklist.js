import React from 'react';
import edit from '../assets/edit.png';
import deletelogo from '../assets/delete.png';
import avatar from '../assets/avatar.png';
import view from '../assets/view.png';
import BookEdit from '../components/book_edit';

class BookList extends React.Component {
    constructor (props) {
        super(props)
        this.modalHandler = this.modalHandler.bind(this)
        this.deleteBook = this.deleteBook.bind(this)
        this.editBook = this.editBook.bind(this)
    }

    state = {
        booksList: [],
        modal: false,
        isLoader: true,
        error:null,
        item:''
    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        fetch('http://localhost:3100/books')
        .then( resp => resp.json())
        .then( (result)=> {
            console.log("result", result)
            this.setState({
                booksList:result.data,
                isLoader: false
            })
        }, error => {
            this.setState({
                isLoader:false, 
                error
            })
            console.log("error::", error);
        })
    }

    componentWillReceiveProps (props) {
        console.log(props)
        if (!props.profileEdit) {
            this.setState({
                modal : false
            })
        }
    }

    modalHandler (item) {
        this.setState({
            modal : true
        });
    }

    handleCallback(dataFromEdit) {
        console.log("call back::", dataFromEdit);
    }

    editBook(item) {
        console.log(item)
        this.setState({
            modal : true,
            item:item
        })
    }

    deleteBook = (item, index) => {
        console.log("delete", item);
        const array = this.state.booksList;
        array.splice(index, 1)
        this.setState({
            booksList : array
        })
        this.deleteBookService(item._id);
    }

    deleteBookService(data) {
        let sendData = {_id:data}
        fetch('http://localhost:3100/book/delete', {
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .then( resp => resp.json())
        .then( result => {
            this.setState({
                isLoader : false
            }, error => {
                this.setState({
                    isLoader:false,
                    error:error
                })
            })
        })
    }

    render () {
        const  booksList  = this.state.booksList;
        const { isLoader, error } = this.state;
        if (error) {
            return <div>error</div>
        }else if (isLoader) {
            return <div>loading...</div>
        }else{
            return (
                <div>
                    {booksList.map( (item, index)=> (
                    <div key={item._id} className="profile-box">
                        <div className="book-img">
                            <img src={avatar} />
                        </div>
                        <div className="inner-block">
                            <h4>{item.title}</h4>
                            <p>{item.subTitle}</p>
                            <span>Description:</span><p>{item.description}</p>
                        </div>
                        <div className="inner-block">
                            <h4>Author</h4>
                            <p>{item.author}</p>
                            <p>{item.publisher}</p>
                            <p>ISBN:{item.ISBN}</p>
                        </div>
                        <div className="inner-block actions-block">
                            <p><img src={view} /><span>view</span></p>
                            <p onClick={ () => this.editBook(item, index)}><img src={edit} onClick={this.modalHandler} /><span>edit</span></p>
                            <p onClick={() => this.deleteBook(item, index)}><img src={deletelogo} /><span>delete</span></p>
                        </div>
                    </div>
                )
                )}
                <BookEdit bookEditData={this.state} bookEditallback={this.handleCallback} />
                </div>
            )
        }
    }
}

export default BookList;
