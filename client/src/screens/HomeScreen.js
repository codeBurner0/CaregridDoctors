import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import "antd/dist/reset.css";
import { DatePicker, Space, message } from "antd";

const { RangePicker } = DatePicker;

const HomeScreen = () => {
  const [rooms, setData] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (
          await axios.get("https://caregrid-doctors-ashen.vercel.app/api/rooms/getallrooms")
        ).data;

        setData(data.rooms);
        setduplicaterooms(data.rooms);
        //console.log(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  

  function filterBySearch() {
    const temprooms = duplicaterooms.filter((rooms) =>
      rooms.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setData(temprooms);
  }

  function filterByHospital(e) {
    settype(e);
    console.log(rooms[0].hospital.split(" ")[0].toLowerCase());
    console.log(e.toLowerCase());
    if (e !== "all") {
      const temprooms = duplicaterooms.filter(
        (rooms) => rooms.hospital.split(" ")[0].toLowerCase() === e.toLowerCase()
      );
      
      setData(temprooms);
    } else {
      setData(duplicaterooms);
    }
  }

  function filterBySpec(e) {
    settype(e);
    console.log(rooms[0].designation.split(" ")[0].toLowerCase());
    console.log(e.toLowerCase());
    if (e !== "all") {
      const temprooms = duplicaterooms.filter(
        (rooms) => 
          rooms.designation.split(" ")[rooms.designation.split(" ").length - 1].toLowerCase() === e.toLowerCase()
      );
      
      setData(temprooms);
    } else {
      setData(duplicaterooms);
    }
  }

  return (
    <div className="landing1 m-0">
      <div className="row  pt-4 ">
        {/* <div className='col-md-3'>
          <RangePicker format={'DD-MM-YYYY'} onChange={filterByDate} />
        </div> */}
        

        <div className="col-md-5">
        
          <input
            type="search"
            className="form-control"
            placeholder="&#x1F50D; search doctors"
            style={{ marginTop: "1px" , marginLeft:"35px" , marginRight:"30px"}}
            value={searchkey}
            onChange={(e) => setsearchkey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            style={{ marginTop: "1px", marginLeft:"30px" }}
            onChange={(e) => {
              filterByHospital(e.target.value);
            }}
          >
            <option value="all">Filter By Hospital</option>
            <option value="mathura">Mathura Multispeciality Hospital</option>
            <option value="gopi">Gopi Krishna Hospital</option>
            <option value="nayati">Nayati Medicity</option>
            <option value="bhaskar">Bhaskar Super Speciality Hospital</option>
            <option value="relief">Relief hospital trauma & critical care</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            style={{ marginTop: "1px",marginLeft:"30px"}}
            onChange={(e) => {
              filterBySpec(e.target.value);
            }}
          >
            <option value="all">Filter By Specification</option>
            <option value="oncology">Oncology</option>
            <option value="cardiology">Cardiology</option>
            <option value="gynaecology">Gynaecology</option>
            <option value="ophthalmology">Ophthalmology</option>
            <option value="dental">Dental</option>
            <option value="dermatology">Dermatology</option>
            <option value="gastroenterology">Gastroenterology</option>
            <option value="neurology">Neurology</option>
            <option value="pulmonology">Pulmonology</option>
            <option value="ent">ENT</option>
            <option value="dietetics">Dietetics</option>
            <option value="neurology">Neurology</option>
          </select>
        </div>
      </div>

      <div className="row ml-5 mr-5 mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((rooms) => {
            return (
              <div className="col-4 mt-2" >
                <Room rooms={rooms} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
