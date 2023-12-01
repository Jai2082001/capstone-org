import { Dropdown, Form, Card, Button } from "react-bootstrap"
import { useState, useRef } from "react"

const CaseEdit = ({ cases }) => {

    const [added, setAdded] = useState(false); 
    const [loading, changeLoading ] = useState(false)

    const imageRef = useRef()
    const eventNameRef = useRef();
    const eventDescription = useRef();
    
    const [singleVolunteer, changeSingleVolunteer] = useState(false);

    const selectEdit = (prop) => {
        console.log(prop)
        changeSingleVolunteer(prop);
    }

    const formUpdateController = (e) => {
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

                                if(eventNameRef.current.value == ''){
                                    dataObj.eventName = singleVolunteer.CaseName;
                                }
                                
                                if(eventDescription.current.value == ''){
                                    dataObj.eventDescription = singleVolunteer.CaseDescription;
                                }
                                
                                dataObj.image = event.target.result;
                        
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/updateCase  `, {
                                    method: "POST",
                                    cache: 'no-cache',
                                    credentials: 'same-origin',
                                    headers: {
                                        'Accept': 'application/json',
                                        "Content-Type": 'application/json',
                                        'addedby': 'Admin',
                                        'id': singleVolunteer._id
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
            let dataObj = {};
            
            if(eventNameRef.current.value == ''){
                dataObj.eventName = singleVolunteer.CaseName;
            }
           if(eventDescription.current.value == ''){
                dataObj.eventDescription = singleVolunteer.CaseDescription;
            }
         
            dataObj.image = singleVolunteer.ImageUrl;


            fetch(`${process.env.REACT_APP_FETCH_LINK}/updateVolunteer`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'addedby': 'Admin'
                },
                body: JSON.stringify(dataObj)
            })

        }

    }


    return (
        <div>
            Edit


            <Dropdown data-bs-theme="dark" >
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu onSelect={(e) => { console.log(e) }}>

                    {cases.map((singleElement) => {
                        return (
                            <Dropdown.Item onClick={() => { selectEdit(singleElement) }}>{singleElement.CaseName}</Dropdown.Item>
                        )
                    })}

                </Dropdown.Menu>
            </Dropdown>

            {singleVolunteer &&

                <Form>
                    <Form.Group>
                        <Form.Label>Case Name </Form.Label>
                        
                        <Form.Control type='text' value={singleVolunteer.CaseName}></Form.Control>
                        <Form.Control type='text' ref={eventNameRef}></Form.Control>

                        
                        <Form.Label>Event Descripition </Form.Label>
                        
                        <Form.Control type='text' value={singleVolunteer.CaseDescription}></Form.Control>
                        <Form.Control type='text' ref={eventDescription}></Form.Control>

                        
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top"  />
                            <Card.Body>
                                <Card.Img src={singleVolunteer.ImageUrl}></Card.Img>
                            </Card.Body>
                        </Card> 
                        <Form.Group className='mb-3'>
                            <Form.Label>Update the Image if you want</Form.Label>
                            <Form.Control type='file' accept={".jpeg, .gif, .png, .avif"} ref={imageRef} placeholder='Enter the image'></Form.Control>
                        </Form.Group>
                    </Form.Group>
                    <Button onSubmit={formUpdateController}></Button>
                </Form>
            }


        </div>
    )
}

export default CaseEdit