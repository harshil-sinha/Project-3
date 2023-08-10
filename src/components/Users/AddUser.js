import React,{useState,useRef} from 'react'
import Card from "../UI/Card.js"
import classes from "./AddUser.module.css"
import Button from "../UI/Button.js"
import ErrorModal from '../UI/ErrorModal.js'
import Wrapper from "../Helper/Wrapper.js";

const AddUser = props =>{
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    const collegeInputRef = useRef();
    const [error,setError] = useState();
    const addUserHandler = (event)=>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        const enteredCollege = collegeInputRef.current.value;

        if(enteredName.trim().length===0 || enteredUserAge.trim().length===0 || enteredCollege.trim().length===0){
            setError({
                title : 'Invalid input',
                message :'Please enter a valid name and age (non-empty values) :-('
            });
            return;
        }
        if(+enteredUserAge<1){
            setError({
                title : 'Invalid age',
                message :'Please enter a valid  age (>0) :-('
            });
            return;
        }
      props.onAddUser(enteredName,enteredUserAge,enteredCollege);
      nameInputRef.current.value='';
      ageInputRef.current.value ='';
      collegeInputRef.current.value='';
        
    }
   

    const errorHandler = ()=>{
        setError(null)
    }
    return(
        <Wrapper>
        {error && (<ErrorModal title={error.title} message ={error.message} onConfirm={errorHandler}/>)}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
        <label htmlFor='username'>Username</label>
        <input type="text"  id='username' ref={nameInputRef}/>
        <label htmlFor='age'>Age (Years)</label>
        <input type="number"  id='age' ref={ageInputRef}/>
        <label htmlFor='college'>College Name</label>
        <input type="text"  id='college' ref={collegeInputRef}/>
        <Button type='submit'>Add User</Button>
    </form>
    </Card>
    </Wrapper>
    );
}

export default AddUser;
