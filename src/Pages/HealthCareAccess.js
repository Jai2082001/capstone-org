import { Form, Button, Modal } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import HealthCareDelete from '../Components/HealthCareRelated/HealthCareDelete';
import HealthCareEdit from '../Components/HealthCareRelated/HealthCareEdit';


const VolunteerOpportunites = ({state}) => {

    const eName = useRef('eName');
    const eDis = useRef('edis')
    const eOrganization = useRef('eName');
    const eContact = useRef('eDis')
    const ePr = useRef('ePr');
    const imageRef = useRef('Vimage');

    const [msg, setAdded] = useState({});
    const [loading, changeLoading] = useState(false);
    const [page, changePage] = useState('add');
    const [healthOrgs, changeHealthOrgs] = useState([]);


    useEffect(() => {
        changeLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/displayHealthCare`, {
            method: 'GET',
            mode: 'cors'
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            changeHealthOrgs(response)
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
                                    HealthName : eName.current.value,
                                    HealthOrganization: eOrganization.current.value,
                                    HealthDescription: eDis.current.value,
                                    HealthPr: ePr.current.value,
                                    contact: eContact.current.value,
                                    image: event.target.result,
                                    dateadded: dateText,
                                    AddedBy: state._id,
                                    UniqueKey: Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000
                                }
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/HealthCareSave`, {
                                    method: "POST",
                                    cache: 'no-cache',
                                    credentials: 'same-origin',
                                    headers: {
                                        'Accept': 'application/json',
                                        "Content-Type": 'application/json',
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

        })
        fetch(`${process.env.REACT_APP_FETCH_LINK}/HealthCareSave`, {
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
                        <Form.Label>Event Name </Form.Label>
                        <Form.Control ref={eName} type="text" placeholder="Event Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Health Organization</Form.Label>
                        <Form.Control type="text" ref={eOrganization} placeholder="Event Organized By" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Organization Description</Form.Label>
                        <Form.Control type="text" ref={eDis} placeholder="Descripition" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Health Program Description</Form.Label>
                        <Form.Control type="text" ref={ePr} placeholder="Descripition" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contact Info</Form.Label>
                        <Form.Control type="text" ref={eContact} placeholder="Descripition" />
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

                <HealthCareEdit  healthOrgs={healthOrgs}></HealthCareEdit>
            }

            {page == 'delete' && 
                <HealthCareDelete healthOrgs = {healthOrgs}></HealthCareDelete>
            }



        </div>
    )
}

export default VolunteerOpportunites