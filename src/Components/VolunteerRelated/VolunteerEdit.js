import { Dropdown, Form, Card, Button } from "react-bootstrap"
import { useState, useRef } from "react"

const VolunteerEdit = ({ volunteers }) => {

    const [ singleVolunteer, changeSingleVolunteer ] = useState(false);
    const [added, setAdded] = useState(false); 
    const [loading, changeLoading ] = useState(false)

    const imageRef = useRef()
    const eventNameRef = useRef();
    const eventOrganization = useRef();
    const eventDescription = useRef();
    const volunteersNeeded = useRef();
    const volunteersPresent = useRef();

    const selectEdit = (prop) => {
        console.log(prop)
        changeSingleVolunteer(prop);
    }

    const formUpdateController = (e) => {
        e.preventDefault();
        console.log("FormUPdateVolunteer")
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
                                let dataObj = {};

                                console.log(event.target.result);

                                if(eventNameRef.current.value == ''){
                                    dataObj.eventName = singleVolunteer.EventName;
                                }
                                if(eventOrganization.current.value == ''){
                                    dataObj.eventOrganization = singleVolunteer.EventOrganization;
                                }
                                if(eventDescription.current.value == ''){
                                    dataObj.eventDescription = singleVolunteer.EventDescription;
                                }
                                if(volunteersNeeded.current.value == ''){
                                    dataObj.volunteersNeeded = singleVolunteer.VolunteersNeed;
                                }
                                if(volunteersPresent.current.value == ''){
                                    dataObj.volunteersPresent = singleVolunteer.VolunteersPresent;
                                }
                                dataObj.image = event.target.result;
                        
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/updateVolunteer`, {
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
                dataObj.eventName = singleVolunteer.EventName;
            }else{
                dataObj.eventName = eventNameRef.current.value
            }
            if(eventOrganization.current.value == ''){
                dataObj.eventOrganization = singleVolunteer.EventOrganization;
            }else{
                dataObj.eventOrganization = eventOrganization.current.value;

            }
            if(eventDescription.current.value == ''){
                dataObj.eventDescription = singleVolunteer.EventDescription;
            }else{
                dataObj.eventDescription = eventDescription.current.value;

            }
            if(volunteersNeeded.current.value == ''){
                dataObj.volunteersNeeded = singleVolunteer.VolunteersNeed;
            }else{
                dataObj.volunteersNeeded = volunteersNeeded.current.value;

            }
            if(volunteersPresent.current.value == ''){
                dataObj.volunteersPresent = singleVolunteer.VolunteersPresent;
            }else{
                dataObj.volunteersPresent = volunteersPresent.current.value;

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
                    'addedby': 'Admin',
                    'id': singleVolunteer._id
                },
                body: JSON.stringify(dataObj)
            }).then((response)=>{
                return response.json();
            }).then((response)=>{
                console.log(response);
            })

        }


        // fetch(`${process.env.REACT_APP_FETCH_LINK}/updateVolunteer`, {
        //     method: 'POST',
        //     mode: 'cors',
        //     cache: 'no-cache',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origins': '*',
        //         'id': singleVolunteer._id
        //     },
        //     body: JSON.stringify(dataObj)
        // })


    }


    return (
        <div>
            Edit


            <Dropdown data-bs-theme="dark" >
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu onSelect={(e) => { console.log(e) }}>

                    {volunteers.map((singleElement) => {
                        return (
                            <Dropdown.Item onClick={() => { selectEdit(singleElement) }}>{singleElement.EventName}</Dropdown.Item>
                        )
                    })}

                </Dropdown.Menu>
            </Dropdown>

            {singleVolunteer &&

                <Form>
                    <Form.Group>
                        <Form.Label>Event Name </Form.Label>
                        
                        <Form.Control type='text' readonly value={singleVolunteer.EventName}></Form.Control>
                        <Form.Control type='text' ref={eventNameRef}></Form.Control>

                        <Form.Label>Event Organization </Form.Label>
                        
                        <Form.Control type='text' readOnly value={singleVolunteer.EventOrganization}></Form.Control>
                        <Form.Control type='text' ref={eventOrganization}></Form.Control>

                        <Form.Label>Event Descripition </Form.Label>
                        
                        <Form.Control type='text' readOnly value={singleVolunteer.EventDescription}></Form.Control>
                        <Form.Control type='text' ref={eventDescription}></Form.Control>

                        <Form.Label>Volunteers Needed</Form.Label>
                        
                        <Form.Control type='text' readOnly value={singleVolunteer.VolunteersNeed}></Form.Control>
                        <Form.Control type='text' ref={volunteersNeeded}></Form.Control>

                        <Form.Label>Volunteers Present </Form.Label>
                        
                        <Form.Control type='text' readonly value={singleVolunteer.VolunteersPresent}></Form.Control>
                        <Form.Control type='text' ref={volunteersPresent}></Form.Control>
                        
                        
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
                    <Button onClick={formUpdateController}>BTN</Button>
                </Form>
            }


        </div>
    )
}

export default VolunteerEdit