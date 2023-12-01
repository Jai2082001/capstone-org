import { Form, Button, Modal } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import LegalDelete from '../Components/LegalRelated/LegalDelete';
import LegalEdit from '../Components/LegalRelated/LegalEdit';

const LegalAid  = ({state}) => {

    const eName = useRef('eName');
    const eDis = useRef('eDis');
    const eContact = useRef('eContact');
    const eOrg = useRef('eOrg');
    const ePro = useRef('ePro');
    const imageRef = useRef('Vimage');

    const [msg, setAdded] = useState({});
    const [loading, changeLoading] = useState(false);
    const [page, changePage] = useState('add');
    const [orgs, changeOrgs] = useState([]);


    useEffect(() => {
        changeLoading(false);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/displayLegalOrgs`, {
            method: 'GET',
            mode: 'cors'
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            changeOrgs(response)
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
                                    legalOrgName: eName.current.value,
                                    legalProName:   ePro.current.value,
                                    legalProDescription: eDis.current.value,
                                    legalOrgDescription: eOrg.current.value,
                                    image: event.target.result,
                                    contact: eContact.current.value,
                                    dateadded: dateText,
                                    AddedBy: state._id,
                                    UniqueKey: Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000
                                }
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/saveLegalOrg`, {
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

        }else{
            console.log('asd')
        }
        
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
                        <Form.Label>Legal Program Name</Form.Label>
                        <Form.Control ref={ePro} type="text" placeholder="Event Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Legal Organization Name</Form.Label>
                        <Form.Control ref={eName} type="text" placeholder="Event Name" />
                    </Form.Group>
                    <Form.Group className='mb-3'> 
                    <Form.Label>Legal Program Descripition</Form.Label>
                        <Form.Control ref={eDis} type="text" placeholder="Event Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Legal Organization Description</Form.Label>
                        <Form.Control type="text" ref={eOrg} placeholder="Descripition" />
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

                <LegalEdit orgs={orgs}></LegalEdit>
            }

            {page == 'delete' && 
                <LegalDelete orgs = {orgs}></LegalDelete>
            }



        </div>
    )
}

export default LegalAid