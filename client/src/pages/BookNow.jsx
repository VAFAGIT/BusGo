import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Row, Col, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { Helmet } from "react-helmet";

function BookNow() {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);

  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get(`/api/buses/${params.id}`);
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        `/api/bookings/book-seat/${localStorage.getItem("user_id")}`,
        {
          bus: bus._id,
          seats: selectedSeats,
          transactionId,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/make-payment", {
        token,
        amount: selectedSeats.length * bus.price,
      });

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, 
  // []
  );
  return (
    <>
      <Helmet>
        <title>Book Now</title>
      </Helmet>
      <div>
        {bus && (
          <Row className="m-3 p-5" gutter={[30, 30]}>
            <Col lg={12} xs={24} sm={24}>
              <h1 className="text-2xl text-amber-600">
                {bus.name}
              </h1>
              <h1 className="text-xl ">
                {bus.from} - {bus.to}
              </h1>

              <div className="flex flex-col gap-1 ">
             

                <h1 className="text-lg">
                  <b className="text-black ">Price : </b>{bus.price}{" "}  $ 
                </h1>
             
              </div>

              <div className="flex w-60 flex-col ">
               
              </div>

              <div className="flex flex-col w-48 ">
                <h1 className="text-xl">
                  <b className="text-black">Seats choised  : </b>{" "}
                  {selectedSeats.join(", ")}
                </h1>
                <h1 className="text-xl mt-2 mb-3">
                  <b className="text-black"> Price :</b> DH{" "}
                  {bus.price * selectedSeats.length}
                </h1>

                 
                  <button
                    className={`${
                      selectedSeats.length === 0
                        ? "animate-none cursor-not-allowed btn btn-primary py-2 px-5 rounded-full btn-disabled text-white"
                        : " btn btn-primary py-2 px-5 rounded-full bg-purple-700 hover:bg-purple-900 hover:duration-300 text-white"
                    }`}
                    disabled={selectedSeats.length === 0}
                    onClick={() => {
                      bookNow();
                    }}
                  >
                    Book
                  </button>
              </div>
            </Col>
            <Col lg={12} xs={24} sm={24}>
              <SeatSelection
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                bus={bus}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default BookNow;
