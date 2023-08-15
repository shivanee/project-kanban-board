import { useParams } from "react-router-dom"
import { retrieveTodoApi } from "./api/TodoApiService"
import { useEffect, useState } from "react"
import { Formik,Form, Field, ErrorMessage } from "formik"

export default function UpdateTodoComponent(){

    const {id}=useParams()
    
    const {status}=useParams()

    const [titleToUpdate, setTitle]=useState('')

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
    }

    return (
        <div className="container">
            <div>
                <Formik initialValues={{titleToUpdate,statusToUpdate}} 
                    enableReinitialize={true} >
                    {
                        (props)=>(
                            <Form>
                                <fieldset className="form-group">
                                    <label>Title</label>
                                    <Field type="text" className="form-control" name="titleToUpdate"/>
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