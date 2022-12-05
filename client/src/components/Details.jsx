import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

const detailsStyle = {
    border: "2px solid black",
    width: "20vw",
    height: "550px",
    position: "relative",
    left: "650px",
    bottom: "600px"
}
const addComment = () => {
    //check if logged in, if so, allow them to add comment
    //if not logged in, route to login page
}
const adjustLike = () => {
    //check if logged in, if not send them to login
    //else, check if already liked - remove the like, else add the like
}


const Details = (props) => {

// const [showDetails, setShowDetails] = useState(false)
// const handleShow = () => setShowDetails(true);
// const handleClose = () => setShowDetails(false)
// onHide={handleClose}
// onClick={handleClose}
// show={showDetails}

// console.log(props.currentActivity.user.username)

return(
    <div>
        <Modal show= {props.show} style={detailsStyle}>
            <Modal.Header>
                <Modal.Title>{props.currentActivity.name}</Modal.Title>
                <h5>Hosted By {props.currentActivity.user.username} </h5>
            </Modal.Header>
            <Modal.Body>
                <h6 style={{margin:"0"}}>Liked by XX Members</h6> <br/>
                <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{props.date}</h5>
                <p>{props.currentActivity.description}</p>
                <h5>Comments <Button onClick={addComment}>+</Button></h5>
                Map Comments Here<br/>
                <Button onClick={adjustLike}>Like</Button>
            </Modal.Body>
        </Modal>
    </div>
)
}

export default Details