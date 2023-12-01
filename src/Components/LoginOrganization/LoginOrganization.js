import { useRef } from "react"
import {Form, Button} from "react-bootstrap"


const LoginOrganization = ({changeState}) => {

    const eName = useRef();
    const eReg = useRef();


    const btn = () => {
        console.log(eName.current.value);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orgLogin`, {
            method: 'GET',  
            mode: 'cors',

            headers: {
                orName: eName.current.value,
                secret: eReg.current.value
            }  
        }).then((response)=>{
            return response.json();
        }).then((response)=>{
            console.log(response);
            if(response.status == `log`){
                changeState(response.response);
            }else{
                changeState(false);
            }
        })
    }

    return (
        <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control ref={eName} type="text" placeholder="Organization Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Secret key</Form.Label>
                <Form.Control type="text" ref={eReg} placeholder="Secret key" />
            </Form.Group>

            <Button onClick={btn}>Login</Button>

        </div>

    )
}

export default LoginOrganization    