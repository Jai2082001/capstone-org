import { Button, Dropdown } from "react-bootstrap"
import { useState } from "react"


const VolunteerDelete = ({pages}) => {
    
    const [singleVolunteer, changeSingleVolunteer ] = useState(false);
    
    const deleteBtn = () => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/deleteCase`, {
            method: 'POST',
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

                    {pages.map((singleElement) => {
                        return (
                            <Dropdown.Item onClick={() => {changeSingleVolunteer(singleElement) }}>{singleElement.CaseName}</Dropdown.Item>
                        )
                    })}

                </Dropdown.Menu>
        </Dropdown>

        {singleVolunteer && <Button onClick={deleteBtn}>Delete the Event</Button>}


        </>
    )
}

export default VolunteerDelete