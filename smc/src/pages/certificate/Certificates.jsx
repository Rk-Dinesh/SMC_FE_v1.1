import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import PaginationBar from "../../components/PaginationBar";
import { API } from "../../Host";
import axios from "axios";

const Certificate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const response = await axios.get(
          `${API}/api/completedcourses?userId=${userId}`
        );

        setCompletedCourses(response.data);
      } catch (error) {}
    };
    fetchCompletedCourses();
  }, []);

  const filteredCourses = completedCourses.filter((course) =>
    course.mainTopic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = filteredCourses.length;

  return (
    <div>
      <div className="text-white flex justify-between border-b pb-2 pl-7 border-white">
        <p>My Certificate</p>
      </div>
      <span className="flex  justify-end py-3  items-center">
        <input
          type="text"
          placeholder="Search by topic name"
          className="text-white placeholder:text-white rounded-l-full px-4 py-2 bg-darkgray outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page when search changes
          }}
        />
        <button className="text-white font-bold bg-darkgray rounded-r-full pr-4 py-2">
          <Search />
        </button>
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-4 py-4 ">
        {paginatedCourses.map((course, index) => (
          <div className=" col-span-3 bg-darkgray pb-3 text-white rounded-4xl ">
            <img src={IMG} alt="Course" className="rounded-4xl w-full p-2" />
            <div className="text-sm px-6 leading-relaxed">
              <p className="font-semibold text-lg">{course.mainTopic}</p>
              <p>
                <span>Type:</span> {course.type}
              </p>
              {/* <p>
                <span>No of Subtopics:</span> {course.subtopics}
              </p> */}
              <p>
                <span>Language:</span> {course.lang}
              </p>
              <p>
                <span>Date:</span>{" "}
                {new Date(course.date)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .toUpperCase()
                  .replace(/\s/g, "-")}
              </p>
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              <button className="bg-teal-400 text-black px-4 py-1 rounded-md text-sm ">
                View Certificate
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className=" text-end fixed bottom-2 right-0">
        <PaginationBar
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onItemsPerPageChange={setItemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Certificate;
