import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrorsAction,
  newReviewAction,
} from "../../redux/actions/roomsAction";
import { roomTypes } from "../../redux/Actiontypes";
import { FaStar } from "react-icons/fa";

function NewReview() {
  const { reviewAvaliable } = useSelector((state) => state.checkReview);
  const [rating, setRating] = useState(null);
  const [rat, setRat] = useState(null);
  const [hov, setHov] = useState(null);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, success } = useSelector((state) => state.newReview);
  const { id } = router.query;

  //
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function setUserRatings() {
    setShow(true);
    // const stars = document.querySelectorAll(".star");
    // console.log(stars);
    // stars.forEach((star, index) => {
    //   star.starValue = index + 1;

    //   ["click", "mouseover", "mouseout"].forEach(function (e) {
    //     star.addEventListener(e, showRatings);
    //   });
    // });
    // function showRatings(e) {
    //   stars.forEach((star, index) => {
    //     if (e.type === "click") {
    //       if (index < this.starValue) {
    //         star.classList.add("red");

    //         setRating(this.starValue);
    //       } else {
    //         star.classList.remove("red");
    //       }
    //     }

    //     if (e.type === "mouseover") {
    //       if (index < this.starValue) {
    //         star.classList.add("light-red");
    //       } else {
    //         star.classList.remove("light-red");
    //       }
    //     }

    //     if (e.type === "mouseout") {
    //       star.classList.remove("light-red");
    //     }
    //   });
    // }
    // setRating(rat);
  }

  const submitFunction = () => {
    const reviewData = {
      rating: rat,
      comment,
      roomId: id,
    };
    dispatch(newReviewAction(reviewData));
    console.log(reviewData);
    // setShow(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorsAction());
    }
    if (success) {
      toast.success("review posted");
      dispatch({ type: roomTypes.NEW_REVIEW_RESET });
    }
  }, [dispatch, success, error]);

  return (
    <>
      <Button variant="primary" onClick={setUserRatings}>
        submit your review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>submit a review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>please leave a rating too :)</p>
          {[...Array(5)].map((star, ind) => {
            const ratingValue = ind + 1;

            return (
              <label key={ind}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onChange={() => setRat(ratingValue)}
                />
                <FaStar
                  className="star"
                  onMouseEnter={() => setHov(ratingValue)}
                  onMouseLeave={() => setHov(0)}
                  color={ratingValue <= (hov || rat) ? "#ffc107" : "#eee"}
                />
              </label>
            );
          })}
          <span>{rat ? rat : "no ratings yet"}</span>
          {/* <ul className="stars">
            <li className="star">
              <i className="fa fa-star"></i>
            </li>
            <li className="star">
              <i className="fa fa-star"></i>
            </li>
            <li className="star">
              <i className="fa fa-star"></i>
            </li>
            <li className="star">
              <i className="fa fa-star"></i>
            </li>
            <li className="star">
              <i className="fa fa-star"></i>
            </li>
          </ul> */}
          <textarea
            name="review"
            id="review"
            className="form-control mt-3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={submitFunction}>
            submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <button
        id="review_btn"
        type="button"
        className="btn btn-primary mt-4 mb-5"
        data-toggle="modal"
        data-target="#ratingModal"
        onClick={setUserRatings}
      >
        Submit Your Review
      </button>

      <div
        className="modal fade"
        id="ratingModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="stars">
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
              </ul>

              <textarea
                name="review"
                id="review"
                className="form-control mt-3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <button
                className="btn my-3 float-right review-btn px-4 text-white"
                data-dismiss="modal"
                aria-label="Close"
                onClick={submitFunction}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default NewReview;
