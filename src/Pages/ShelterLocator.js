import { Form, Button, Modal } from 'react-bootstrap'
import { useRef, useEffect, useState } from 'react';
import ShelterEdit from '../Components/ShelterRelated/ShelterEdit'
import ShelterDelete from '../Components/ShelterRelated/ShelterDelete'


const ShelterLocator = ({state}) => {
    const eName = useRef('eName');
    const eOrganization = useRef('eName');
    const vNeed = useRef('eName');
    const vPresent = useRef('eName');
    const eDis = useRef('eDis');
    const imageRef = useRef('imageRef')

    const [shelter, changeShelter] = useState([]);
    const [loading, changeLoading] = useState([]);
    const [page, changePage] = useState([]);
    const [msg, setAdded] = useState({});


    useEffect(() => {
        changeLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/displayShelter`, {
            method: 'GET',
            mode: 'cors'
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            changeShelter(response)
            changeLoading(false)
        })
    }, [])


    const shelterSaveController = (e) => {
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
                                    shelterName: eName.current.value,
                                    shelterCompany: eOrganization.current.value,
                                    shelterDescription: eDis.current.value,
                                    sNeed: vNeed.current.value,
                                    addedBy: state._id,
                                    sPresent: vPresent.current.value,
                                    image: event.target.result,
                                    UniqueKey: Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000
                                }
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/shelterSave`, {
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

        }else{
            
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
            <input type='text' onChange={(e) => { changePage(e.target.value) }}></input>

            {page == 'add' &&



                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Shelter Name</Form.Label>
                        <Form.Control ref={eName} type="text" placeholder="Event Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company Backing Shelter: -</Form.Label>
                        <Form.Control type="text" ref={eOrganization} placeholder="Event Organized By" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Maximum Capacity</Form.Label>
                        <Form.Control type="text" ref={vNeed} placeholder="Maximium Capacity " />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Present Members</Form.Label>
                        <Form.Control type="text" ref={vPresent} placeholder="Present Members in the Shelter" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Shelter Description</Form.Label>
                        <Form.Control type="text" ref={eDis} placeholder="Descripition" />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Insert the Image</Form.Label>
                        <Form.Control type='file' accept={".jpeg, .gif, .png, .avif"} ref={imageRef} placeholder='Enter the image'></Form.Control>
                    </Form.Group>

                    <Button onClick={shelterSaveController} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>



            }

            {page === 'edit' && 
                <ShelterEdit shelters={shelter}></ShelterEdit>
            }
            {page === 'delete' && 
                <ShelterDelete shelters={shelter} ></ShelterDelete>
            }
        </div>
    )
}

export default ShelterLocator