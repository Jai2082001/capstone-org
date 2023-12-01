import { Button, Dropdown } from "react-bootstrap"
import { useState } from "react"


const VolunteerDelete = ({volunteers}) => {
    
    const [singleVolunteer, changeSingleVolunteer ] = useState(false);
    
    const deleteBtn = () => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/deleteVolunteer`, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'id': singleVolunteer._id
            }   
        })
    }

    return (
        
        <>
        <Dropdown data-bs-theme="dark" >
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu onSelect={(e) => { console.log(e) }}>

                    {volunteers.map((singleElement) => {
                        return (
                            <Dropdown.Item onClick={() => {changeSingleVolunteer(singleElement) }}>{singleElement.EventName}</Dropdown.Item>
                        )
                    })}

                </Dropdown.Menu>
        </Dropdown>

        {singleVolunteer && <Button onClick={deleteBtn}>Delete the Event</Button>}


        </>
    )
}

export default VolunteerDelete