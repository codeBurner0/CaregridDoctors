import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ rooms, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs" style={{ height: "280px" }}>
      <div className="col-md-3">
        <img src={rooms.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-8">
        <h2>
          <b>{rooms.name}</b>
        </h2>
        <p>
          <b>{rooms.designation}</b>
        </p>
        <b>
          <p>{rooms.hospital}</p>
          <p>{rooms.speciality}</p>
          <div className="span">
            <span>&#x1F4C5;{rooms.experience}</span>
            <span>&#x20B9; {rooms.opdfee}</span>
          </div>
          <br />
        </b>

       
      </div>

      <hr />
      <div className="col" style={{display:'flex' , alignItems:'center' , justifyContent:'center'}}>
        {
          <Link to={`/book/${rooms._id}`}>
            <button className="btn btn-primary"> Book Now</button>
          </Link>
        }

        {/* <button className="btn btn-primary" onClick={handleShow}>
          View Details
        </button> */}
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{rooms.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {rooms.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 " src={url} alt="First slide" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{rooms.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
