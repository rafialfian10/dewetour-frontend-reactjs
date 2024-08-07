/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
// component
import { useQuery } from "react-query";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/userContext";

// component react bootstrap
import { Table, Image, Form, Alert } from "react-bootstrap";
import Moment from "react-moment";

// api
import { API } from "../../../config/api";

// css
import "./History.scss";

// images
import icon from "../../../assets/img/icon.png";
import qr_code from "../../../assets/img/qr-code.png";

const History = () => {
  let no = 1;

  const [state] = useContext(UserContext);

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  // get transaction
  let { data: transactions, refetch: refetschAllTransaction } = useQuery(
    "transactionsCaches",
    async () => {
      const response = await API.get(`/transactions`, config);
      return response.data.data;
    }
  );

  useEffect(() => {
    transactions && refetschAllTransaction();
  });

  return (
    <>
      {/* history trip */}
      <h1 className="title-history-trip">History Trip</h1>
      <>
        {transactions?.map((transaction, i) => {
          {
            if (transaction?.user.name === state?.user.name) {
              {
                if (
                  transaction?.status === "approve" ||
                  transaction?.status === "reject" ||
                  transaction?.status === "success" ||
                  transaction?.status === "failed"
                ) {
                  return (
                    <>
                      <div className="history-container" key={i}>
                        <div className="content1">
                          <Image src={icon} alt="" />
                          <div className="sub-content1">
                            <h3 className="status">Booking</h3>
                            <Form.Text className="date">
                              <Moment format="DD MMM YYYY, h:mm:ss A">
                                {transaction?.booking_date}
                              </Moment>
                            </Form.Text>
                          </div>
                        </div>

                        <div className="content2">
                          <div className="history-payment">
                            <h3 className="title">{transaction?.trip.title}</h3>
                            <Form.Text className="country">
                              {transaction?.trip.country.name}
                            </Form.Text>
                            {transaction?.status === "success" && (
                              <Alert className="d-inline-block p-1 px-3 fw-bold text-light bg-success">
                                Waiting Approved
                              </Alert>
                            )}
                            {transaction?.status === "approve" && (
                              <Alert className="d-inline-block p-1 px-3 fw-bold text-light bg-success">
                                Transaction Approved
                              </Alert>
                            )}
                            {transaction?.status === "failed" && (
                              <Alert className="d-inline-block p-1 px-3 fw-bold text-light bg-danger">
                                Transaction Failed
                              </Alert>
                            )}
                            {transaction?.status === "reject" && (
                              <Alert className="d-inline-block p-1 px-3 fw-bold text-light bg-danger">
                                Transaction Rejected
                              </Alert>
                            )}
                          </div>

                          <div className="history-tour">
                            <div className="sub-history-tour">
                              <div className="date">
                                <h5>Date Trip</h5>
                                <Form.Text>
                                  <Moment format="YYYY-MM-DD">
                                    {transaction?.trip.datetrip}
                                  </Moment>
                                </Form.Text>
                              </div>
                              <div className="accomodation">
                                <h5>Accomodation</h5>
                                <Form.Text>
                                  {transaction?.trip.accomodation}
                                </Form.Text>
                              </div>
                            </div>
                            <div className="sub-info-tour">
                              <div className="duration">
                                <h5>Duration</h5>
                                <Form.Text>
                                  {transaction?.trip.day} Day{" "}
                                  {transaction?.trip.night} Night
                                </Form.Text>
                              </div>
                              <div className="transportation">
                                <h5>Transportation</h5>
                                <Form.Text>
                                  {transaction?.trip.transportation}
                                </Form.Text>
                              </div>
                            </div>
                          </div>

                          <div className="qr-code">
                            <img src={qr_code} alt="" />
                            <Form.Text>TCK0101</Form.Text>
                          </div>
                        </div>

                        <Table striped bordered hover className="tables">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Full Name</th>
                              <th>Gender</th>
                              <th>Phone</th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{no++}</td>
                              <td>{transaction?.user.name}</td>
                              <td>{transaction?.user.gender}</td>
                              <td>{transaction?.user.phone}</td>
                              <td className="fw-bold">Qty</td>
                              <td className="fw-bold">
                                : {transaction?.counter_qty}
                              </td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className="fw-bold">Total</td>
                              <td className="fw-bold text-danger">
                                : IDR. {transaction?.total.toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </>
                  );
                }
              }
            }
          }
        })}
      </>
      {/* end hsitory trip */}
    </>
  );
};

export default History;
