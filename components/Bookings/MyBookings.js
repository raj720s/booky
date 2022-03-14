import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clear_booking_errors } from "../../redux/actions/bookingsActions";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import easyinvoice from "easyinvoice";
function MyBookings() {
  const dispatch = useDispatch();

  const { bookings, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clear_booking_errors());
    }
  }, [dispatch]);

  const setBookings = () => {
    // console.log("booker");
    const data = {
      columns: [
        {
          label: "booking ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "check In",
          field: "checkIn",
          sort: "asc",
        },
        {
          label: "check Out",
          field: "checkOut",
          sort: "asc",
        },
        {
          label: "Amount paid",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    bookings &&
      bookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-us"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-us"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>
              <button
                className="btn btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fa fa-download"></i>
              </button>
            </>
          ),
        });
      });
    return data;
  };
  const downloadInvoice = async (booking) => {
    const data = {
      documentTitle: "Booking INVOICE", //Defaults to INVOICE
      currency: "USD",
      taxNotation: "vat", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png",
      sender: {
        company: "Book IT",
        address: "13th Street. 47 W 13th St",
        zip: "10001",
        city: "New York",
        country: "United States",
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: "",
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          "en-US"
        )}`,
        country: `Check In: ${new Date(booking.checkOutDate).toLocaleString(
          "en-US"
        )}`,
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString("en-US")}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: 0,
          price: booking.room.pricePerNight,
        },
      ],
      bottomNotice:
        "This is auto generated Invoice of your booking on Book IT.",
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
  };
  return (
    <div>
      <Container fluid>
        <h1 className="my-5">my bookings</h1>
        <MDBDataTable
          data={setBookings()}
          className="pz-3"
          bordered
          striped
          hover
        ></MDBDataTable>
      </Container>
    </div>
  );
}

export default MyBookings;
