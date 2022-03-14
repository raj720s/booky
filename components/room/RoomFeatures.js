import React from "react";

function RoomFeatures({ room }) {
  return (
    <>
      <div className="features mt-5">
        <h3 className="mb-4">Features:</h3>
        <div className="room-feature">
          <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
          <p>{room.guestCapacity}</p>
        </div>

        <div className="room-feature">
          <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
          <p> {room.numOfBeds} </p>
        </div>

        <div className="room-feature">
          <i
            className={
              room.breakfast
                ? "fa fa-check text-success"
                : "fa fa-times text-danger"
            }
            aria-hidden="true"
          ></i>
          <p>Breakfast</p>
        </div>
        <div className="room-feature">
          <i
            className={
              room.internet
                ? "fa fa-check text-success"
                : "fa fa-times text-danger"
            }
            aria-hidden="true"
          ></i>
          <p>internet</p>
        </div>
        <div className="room-feature">
          <i
            className={
              room.airConditioned
                ? "fa fa-check text-success"
                : "fa fa-times text-danger"
            }
            aria-hidden="true"
          ></i>
          <p>air conditioned</p>
        </div>
        <div className="room-feature">
          <i
            className={
              room.petsAllowed
                ? "fa fa-check text-success"
                : "fa fa-times text-danger"
            }
            aria-hidden="true"
          ></i>
          <p>pets Allowed</p>
        </div>
        <div className="room-feature">
          <i
            className={
              room.roomCleaning
                ? "fa fa-check text-success"
                : "fa fa-times text-danger"
            }
            aria-hidden="true"
          ></i>
          <p>roomCleaning</p>
        </div>
      </div>
    </>
  );
}

export default RoomFeatures;
