import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import Moment from "moment";
import StripeCheckout from "react-stripe-checkout";

const BookingScreen = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [data,setData]=useState()
  const [room, setroom] = useState();
  const [bookingdate, setbookingdate] = useState("");
  const type = "doctor";

  let { roomsid } = useParams();
  // console.log(roomsid);
  // const fd = Moment(fromdate, 'DD-MM-YYYY')
  // const td = Moment(todate, 'DD-MM-YYYY')

  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  //  const totaldays = Moment.duration(td.diff(fd)).asDays() + 1
  const [totalamount, settotalamount] = useState();
  console.log("booking screen");

  useEffect(()=>{
    setData( JSON.parse(localStorage.getItem('myData')))
  
  },[])

  useEffect(() => {
    // if (!localStorage.getItem("currentUser")) {
    //   window.location.href = "/login";
    // }
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (
          await axios.post("https://caregrid-doctors-ashen.vercel.app/api/rooms/getallroomsbyid", {
            roomsid: roomsid,
          })
        ).data;
        setroom(data.room);
        settotalamount(data.room.opdfee);
        setbookingdate(date + "-" + month + "-" + year);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, [roomsid]);

  // async function bookRoom() {

  // }

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: data._id,
      bookingdate,
      totalamount,
      type,
      token,
    };

    console.log(bookingDetails);
    try {
      setloading(true);
      const result = await axios.post(
        "https://caregrid-doctors-ashen.vercel.app/api/booking/bookroom",
        bookingDetails
      );
      setloading(false);
      Swal.fire(
        "Congratulations",
        "Your doctor booked successfully",
        "success"
      ).then((result) => {
        if (result.value) {
          window.location.href = "/profile";
        }
      });
      console.log(result);
    } catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div className="landing2">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center bs1">
            <div className="col-md-3 ml-1">
              <img src={room.imageurls[0]} className="bigimg" />
            </div>

            <div className="col-md-4" >
              <b>
                <h1>{room.name}</h1>
                <div style={{color:'#000000bf'}}>
                <p>{room.designation} | {room.hospital} </p>
                <p>{room.speciality}</p>
                <p>{room.education}</p>
                <p>{room.description}</p>
                </div>
                
              </b>
            </div>

            <div className="col-md-3">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                  <p style={{fontSize:'14px'}}>
                    <b>Name :</b> {data.firstName}
                  </p>
                  {/* <p>From Date : {fromdate}</p> */}
                  <p style={{fontSize:'14px'}}><b>Booking Date :</b> {bookingdate}</p>
                  <p style={{fontSize:'14px'}}><b>OPD Timing :</b>  {room.opdtiming}</p>
                  <p style={{fontSize:'14px'}}><b>Total Amount :</b> {totalamount}</p>
                  {/* <p>Max Count : {room.maxcount}</p> */}
                
              </div>

              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51MxSFxSDImWCEH67GxHRodFinMqg6arUcXOZcoQjski6DEibHE6cAbaqnabOkgKQKNVJ8zp8FInbZqR5Wfw7Gl5A00iJXbEUSW"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default BookingScreen;
