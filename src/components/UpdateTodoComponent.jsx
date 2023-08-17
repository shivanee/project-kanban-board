import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { Formik,Form, Field, ErrorMessage } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { retieveTaskById,updateTaskById } from "../redux/action";
import { updateTodoApi } from "../api/TodoApiService";

export default function UpdateTodoComponent(){

    const {id}=useParams()
    
    const {status}=useParams()

    const navigate=useNavigate()

    const dispatch = useDispatch();  
  
    useEffect(()=>{
        dispatch(retieveTaskById(status,id))
    },[])

    let result = useSelector((state)=>state.todoDataById);

    let title = result.title;

    let statusToUpdate = result.status;

    function onSubmit(values){
        const todo={
            id: id,
            title: values.title,
            status:values.statusToUpdate
        }

        updateTodoApi(statusToUpdate,id,todo)
            .then(() =>{navigate('/kanban') })
            .catch((error)=>console.log(error))
    }

    function validate(values){
        let errors ={
        
        }

        if(values.title.length<1){
            errors.title='Enter a title!'
        }

        switch(values.statusToUpdate){
            case "To_Do": 
            case "In_Progress": 
            case "Done": break;
            default: errors.statusToUpdate='Status should be \'To_Do\' or \'In_Progress\' or \'Done\'!'
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