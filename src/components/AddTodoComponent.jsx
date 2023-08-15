import { Formik,Form, ErrorMessage,Field} from "formik";
import { createTodoApi } from "./api/TodoApiService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddTodoComponent(){

    const [title]=useState('')

    const navigate=useNavigate()
    
    function onSubmit(values){
        const status='To_Do'

        const todo={
            id: -1,
            title: values.title,
            status:status
        }

        createTodoApi(status,todo)
            .then((response) =>{navigate('/kanban')})
            .catch((error)=>console.log(error))
    }

    function validate(values){
        let errors ={
        
        }

        if(values.title.length<1){
            errors.title='Enter a title!'
        }

        return errors
    }

    return (
        <div className="container">
            <div>
            <Formik initialValues={{title}} 
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnBlur={false}
                    validateOnChange={false} >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage 
                                    name="title"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Title</label>
                                    <Field type="text" className="form-control" name="title"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Add</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}