import { Button, Dropdown } from "react-bootstrap"
import { useState } from "react"


const VolunteerDelete = ({shelters}) => {
    
    const [singleVolunteer, changeSingleShelter ] = useState(false);
    
    const deleteBtn = () => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/deleteShelter`, {
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

                    {shelters.map((singleElement) => {
                        return (
                            <Dropdown.Item onClick={() => {changeSingleShelter(singleElement) }}>{singleElement.ShelterName}</Dropdown.Item>
                        )
                    })}

                </Dropdown.Menu>
        </Dropdown>

        {singleVolunteer && <Button onClick={deleteBtn}>Delete the Shelter</Button>}


        </>
    )
}

export default VolunteerDelete