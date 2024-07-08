import React, { useState } from "react";
import CommonHeading from "../common/commonHeading/CommonHeading";
import { facility, roomItems } from "../data/room";

export default function Rooms() {
  const [rooms, setRooms] = useState(roomItems);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    roomType: "all",
    priceRange: "all",
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const sortRooms = (criteria) => {
    let sortedData = [...rooms];
    if (criteria === "name") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "price") {
      sortedData.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^\d.-]/g, "")) -
          parseFloat(b.price.replace(/[^\d.-]/g, ""))
      );
    }
    setRooms(sortedData);
    setSortCriteria(criteria);
    setDropdownOpen(false);
  };

  const filterRooms = () => {
    let filteredData = roomItems;

    if (filterCriteria.roomType !== "all") {
      filteredData = filteredData.filter(
        (room) => room.type === filterCriteria.roomType
      );
    }

    if (filterCriteria.priceRange !== "all") {
      const [minPrice, maxPrice] = filterCriteria.priceRange.split("-");
      filteredData = filteredData.filter((room) => {
        const roomPrice = parseFloat(room.price.replace(/[^\d.-]/g, ""));
        return roomPrice >= minPrice && roomPrice <= maxPrice;
      });
    }

    setRooms(filteredData);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <CommonHeading
            heading="Our Rooms"
            title="Rooms"
            subtitle="Explore Our"
            sortRooms={sortRooms}
            sortCriteria={sortCriteria}
          />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <label htmlFor="roomType" className="me-2">
                Room Type:
              </label>
              <select
                id="roomType"
                name="roomType"
                className="form-select"
                value={filterCriteria.roomType}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div>
              <label htmlFor="priceRange" className="me-2">
                Price Range:
              </label>
              <select
                id="priceRange"
                name="priceRange"
                className="form-select"
                value={filterCriteria.priceRange}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="0-100">₾0 - ₾100</option>
                <option value="100-150">₾100 - ₾150</option>
                <option value="150-200">₾150 - ₾200</option>
                <option value="200-300">₾200 - ₾300</option>
              </select>
            </div>
            <button className="btn btn-primary me-3" onClick={filterRooms}>
              Apply Filter
            </button>
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
              >
                Sort by{" "}
                {sortCriteria.charAt(0).toUpperCase() + sortCriteria.slice(1)}
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu show">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => sortRooms("name")}
                    >
                      Name
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => sortRooms("price")}
                    >
                      Price
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="row g-4">
            {rooms.map((item) => (
              <div
                key={item.name}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img className="img-fluid" src={item.img} alt="img" />
                    <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                      {item.price}
                    </small>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{item.name}</h5>
                      <div className="ps-2">{item.star}</div>
                    </div>
                    <div className="d-flex mb-3">
                      {facility.map((facilityItem, index) => (
                        <small className="border-end me-3 pe-3" key={index}>
                          {facilityItem.icon}
                          {facilityItem.quantity} {facilityItem.facility}
                        </small>
                      ))}
                    </div>
                    <p className="text-body mb-3">{item.description}</p>
                    <div className="d-flex justify-content-between">
                      <a
                        className="btn btn-sm btn-custom-primary rounded py-2 px-4"
                        href=""
                      >
                        {item.yellowbtn}
                      </a>
                      <a
                        className="btn btn-sm btn-custom-dark rounded py-2 px-4"
                        href=""
                      >
                        {item.darkbtn}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
