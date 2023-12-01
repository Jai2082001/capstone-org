import { Form, Button, Modal } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import CaseDelete from '../Components/CaseRelated/CaseDelete';
import CaseEdit from '../Components/CaseRelated/CaseEdit.js';

const VolunteerOpportunites = () => {

    const eName = useRef('eName');
    const eReg = useRef('eName');
    const eLoc = useRef('eName');
    const eDis = useRef('eDis')
    const imageRef = useRef('Vimage');

    const [msg, setAdded] = useState({});
    const [loading, changeLoading] = useState(false);
    const [page, changePage] = useState('add');
    const [cases, changeCases] = useState([]);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/displayCases`, {
            method: 'GET',
            mode: 'cors'
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            changeCases(response)
            changeLoading(false)
        })
    }, [])

    const volunteerController = (e) => {
        e.preventDefault();
        const files = imageRef.current.files;
        if (files.length > 0) {
            const delay = (file) => {
                return new Promise((resolve) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file)
                    fileReader.onload = function (event) {
                        resolve(event.target.result);
                    };
                })
            }
            const doNextPromise = (d) => {
                delay(files[d])
                    .then(x => {
                        // array.push(x);
                        d++;
                        if (d < files.length) {
                            doNextPromise(d)
                        }
                        else {
                            const fileReader = new FileReader();
                            const file = imageRef.current.files[0];

                            fileReader.readAsDataURL(file);
                            fileReader.onload = function (event) {
                                let date = new Date();
                                let dateText = date.toLocaleDateString();
                                let dataObj;

                                console.log(event.target.result);

                                dataObj = {
                                    CaseName: eName.current.value,
                                    CaseRegisteredBy: eReg.current.value,
                                    CaseLocation: eLoc.current.value,
                                    CaseDescription: eDis.current.value,
                                    image: event.target.result,
                                    dateadded: dateText,
                                }
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/caseSave`, {
                                    method: "POST",
                                    cache: 'no-cache',
                                    credentials: 'same-origin',
                                    headers: {
                                        'Accept': 'application/json',
                                        "Content-Type": 'application/json',
                                        'addedby': 'Admin'
                                    },
                                    body: JSON.stringify(dataObj)
                                }).then((response) => {
                                    return response.json()
                                }).then((response) => {
                                    changeLoading(false)
                                    console.log(response);
                                    alert("Action Done")
                                    window.location.reload()
                                    if (response.status) {
                                        setAdded({ nature: 'error', msg: 'Already in the database' });
                                    } else {
                                        setAdded({ nature: 'success', msg: 'Added In The Database' });
                                    }
                                })
                            }
                        }

                    })

            }

            doNextPromise(0);

        }
        const data = JSON.stringify({
            CaseName: eName.current.value,
            CaseRegisteredBy: eReg.current.value,
            CaseLocation: eLoc.current.value,
            CaseDescription: eDis.current.value,
            image: null,
        })
        fetch(`${process.env.REACT_APP_FETCH_LINK}/caseSave`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: data
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <div>

            <Modal
            backdrop='static'
            show={loading}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don not even try to press
                    escape key. 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
            <input type='text' onChange={(e)=>{changePage(e.target.value)}}></input>

            {page == 'add' &&
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Case Name</Form.Label>
                        <Form.Control ref={eName} type="text" placeholder="Event Name" />
                    </Form.Group>
                   <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Case Registered By</Form.Label>
                        <Form.Control type="text" ref={eReg} placeholder="Descripition" />
                    </Form.Group>                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Case Location</Form.Label>
                        <Form.Control type="text" ref={eLoc} placeholder="Descripition" />
                    </Form.Group>                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Case Descripition</Form.Label>
                        <Form.Control type="text" ref={eDis} placeholder="Descripition" />
                    </Form.Group>                    

                    <Form.Group className='mb-3'>
                        <Form.Label>Insert the Image</Form.Label>
                        <Form.Control type='file' accept={".jpeg, .gif, .png, .avif"} ref={imageRef} placeholder='Enter the image'></Form.Control>
                    </Form.Group>
                    <Button onClick={volunteerController} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            }



            {page == 'edit' &&

                <CaseEdit cases={cases}></CaseEdit>
            }

            {page == 'delete' && 
                <CaseDelete cases = {cases}></CaseDelete>
            }



        </div>
    )
}

export default VolunteerOpportunites