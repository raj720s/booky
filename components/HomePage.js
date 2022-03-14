import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrorsAction } from "../redux/actions/roomsAction";
import { roomTypes } from "../redux/Actiontypes";
import RoomItem from "./room/RoomItem";
import Pagination from "react-js-pagination";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

function HomePage() {
  const { rooms, error, elpp, roomsCount, filteredRoomsCount } = useSelector(
    (state) => state.allRooms
  );
  const dispatch = useDispatch();
  console.log(rooms);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorsAction);
    }
  }, []);

  const router = useRouter();

  let { page = 1, location } = router.query;
  page = Number(page);

  const paginateFunction = (pageNumber) => {
    window.location.href = `/?page=${pageNumber}`;
  };

  let count = roomsCount;
  if (location) {
    count = filteredRoomsCount;
  }

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `rooms in ${location} ` : "all rooms"}
        </h2>

        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
        </Link>
        <div className="row">
          {rooms && rooms.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">
              <b>no rooms found</b>
            </div>
          ) : (
            rooms.map((room) => <RoomItem room={room} key={room._id} />)
          )}
        </div>
      </section>
      {elpp && elpp < count ? (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={elpp}
            totalItemsCount={roomsCount}
            onChange={paginateFunction}
            nextPageText={"next"}
            prevPageText={"previous"}
            firstPageText={"first"}
            lastPageText={"last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      ) : (
        <div>no more items to render</div>
      )}
    </>
  );
}

export default HomePage;
