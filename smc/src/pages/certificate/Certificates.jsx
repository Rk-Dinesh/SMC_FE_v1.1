import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import PaginationBar from "../../components/PaginationBar";
import { API } from "../../Host";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Certificate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const response = await axios.get(
          `${API}/api/certificatebyuserPagelimit`
        ,{
          params: {
            userId: userId,
            page: currentPage,
            limit: itemsPerPage,
            search: searchQuery, // Send search query to backend
          },
        });
        const responseData = response.data.data;
        setCurrentItems(responseData); // Set current items directly
        setTotalPages(response.data.metadata.totalPages); // Update total pages
        setTotalItems(response.data.metadata.totalItems); // Update total items
      } catch (error) {}
    };
    fetchCompletedCourses();
  }, [userId, currentPage, itemsPerPage, searchQuery]);

  const handleCertificate = (courseId, userId) => {
    
    
    navigate("/viewcertificate", {
      state: { courseId: courseId, userIds: userId },
    });
  };

    useEffect(() => {
      if (searchQuery.trim() !== "") {
          setCurrentPage(1); // Reset to the first page 
      }
  }, [searchQuery]);
  
    // Handle pagination
    const paginate = (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    };

  return (
    <div>
      <div className="text-white flex justify-between border-b pb-2 pl-5 border-white">
        <p>My Certificate</p>
      </div>
      <span className="flex  justify-end py-3  items-center">
        <input
          type="text"
          placeholder="Search by topicName"
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
        {currentItems.map((course, index) => (
          <div className=" col-span-3 bg-darkgray pb-3 text-white rounded-4xl " key={index}>
            <img src={IMG} alt="Course" className="rounded-4xl w-full p-2" />
            <div className="text-sm px-6 leading-relaxed">
              <p className="font-semibold text-lg">{course.courseName}</p>
              <p>
                <span>Type:</span> {course.type}
              </p>
              {/* <p>
                <span>No of Subtopics:</span> {course.subtopics}
              </p> */}
              <p>
                <span>Language:</span> {course.language}
              </p>
              <p>
                <span>Date:</span>{" "}
                {new Date(course.issueDate)
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
              <button
                className="bg-teal-400 text-black px-4 py-1 rounded-md text-sm "
                onClick={() => handleCertificate(course.courseId, course.userId)}
              >
                View Certificate
              </button>
            </div>
          </div>
        ))}
      </div>
      <PaginationBar
        Length={currentItems.length}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        paginate={paginate}
        hasNextPage={currentPage < totalPages}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
  
    </div>
  );
};

export default Certificate;
