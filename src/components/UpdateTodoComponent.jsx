import { useNavigate, useParams } from "react-router-dom"
import { retrieveTodoApi, updateTodoApi } from "../api/TodoApiService"
import { useEffect, useState } from "react"
import { Formik,Form, Field, ErrorMessage } from "formik"

export default function UpdateTodoComponent(){

    const {id}=useParams()
    
    const {status}=useParams()

    const navigate=useNavigate()

    const [title, setTitle]=useState('')

    const [statusToUpdate,setStatus]=useState('')

    useEffect(
        ()=>retrieveTodo()
    )

    function retrieveTodo(){
        retrieveTodoApi(status,id)
            .then(response =>{
                setTitle(response.data.title)
                setStatus(response.data.status)
            })
            .catch((error)=>console.log(error))
    }

    function onSubmit(values){
        const todo={
            id: id,
            title: values.title,
            status:values.statusToUpdate
        }

        updateTodoApi(statusToUpdate,id,todo)
            .then(response =>{navigate('/kanban') })
            .catch((error)=>console.log(error))
    }

    function validate(values){
        let errors ={
        
        }

        if(values.title.length<1){
            errors.title='Enter a title!'
        }

        if(values.statusToUpdate.length<1){
            errors.statusToUpdate='Status should be \'To_Do\' or \'In_Progress\' or \'Done\'!'
        }

        return errors
    }

    return (
        <div className="container">
            <div>
                <Formik initialValues={{title,statusToUpdate}} 
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
                                <ErrorMessage 
                                    name="statusToUpdate"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Title</label>
                                    <Field type="text" className="form-control" name="title"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Status</label>
                                    <Field type="text" className="form-control" name="statusToUpdate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Update</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}