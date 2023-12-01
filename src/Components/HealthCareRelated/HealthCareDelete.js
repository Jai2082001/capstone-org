import { Button, Dropdown } from "react-bootstrap"
import { useState } from "react"


const VolunteerDelete = ({healthOrgs}) => {
    
    const [singleVolunteer, changeSingleShelter ] = useState(false);
    
    console.log(healthOrgs)

    const deleteBtn = () => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/HealthCareDelete`, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'id': singleVolunteer._id
            }
        }).then((response)=>{
            console.log(response);
            return response.json();
        }).then((res)=>{
            console.log(res);
        })
    }

    return (
        
        <>
        <Dropdown data-bs-theme="dark" >
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu onSelect={(e) => { console.log(e) }}>

                    {healthOrgs.map((singleElement) => {
                        return (
                            <Dropdown.Item onClick={() => {changeSingleShelter(singleElement) }}>{singleElement.HealthName}</Dropdown.Item>
                        )
                    })}

                </Dropdown.Menu>
        </Dropdown>

        {singleVolunteer && <Button onClick={deleteBtn}>Delete the Shelter</Button>}


        </>
    )
}

export default VolunteerDelete