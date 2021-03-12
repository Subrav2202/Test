import React, { useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import Studymaterial from "./Studymaterial";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [isloggedin, setisloggedin] = useState(true)
  const [view,setView]=useState("primary")
  const [hour,setHour]=useState()
  const [minute,setMinute]=useState()
  const [seconds,setSeconds]=useState()
  let [c,setc]=useState(localStorage.getItem("time")===null? 3610:localStorage.getItem("time"))//Initially set to 1 hour

  useEffect(() => {
    window.onbeforeunload = function(){
       localStorage.setItem("time",c);
    setisloggedin(false)
   }
  }, [c])

  const clickHandler = () => {
    setShow(true);
    let myTimer = setInterval(myClock, 1000);
    function myClock() {
      --c
      var seconds = c % 60;
      setSeconds(seconds); // Seconds that cannot be written in minutes
      var secondsInMinutes = (c - seconds) / 60;
      var minutes = secondsInMinutes % 60; // Gives the seconds that COULD be given in minutes
      setMinute(minutes); // Minutes that cannot be written in hours
      setHour((secondsInMinutes - minutes) / 60);
      // Now in hours, minutes and seconds, you have the time you need.
      if (c===0) {
          clearInterval(myTimer);
          setView("success")
      }
  }

  };
  return (
    <div style={{ border: "1px solid gray"}} className="m-3">
      <div className="d-flex justify-content-between m-2">
        <Button
          variant="outline-primary"
          size="lg"
          onClick={() => clickHandler()}
        >
          Study Material 1
        </Button>
        <Button variant="outline-success" size="lg" disabled>
          Time Remaining {hour + ":" + minute + ":" + seconds}
        </Button>
      </div>
      {show && <Studymaterial close={() => setShow(!show)} />}
      <div className="d-flex justify-content-end m-2">
        <Button variant={view} size="lg" disabled>
          Finish
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
