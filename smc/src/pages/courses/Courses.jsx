import React, { useEffect, useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import PaginationBar from "../../components/PaginationBar";
import { API } from "../../Host";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API}/api/courseslimit`, {
          params: {
            userId: userId,
            page: currentPage,
            limit: itemsPerPage,
            search: searchQuery, 
          },
        });
        const responseData = response.data.data;

        setCurrentItems(responseData); // Set current items directly
        setTotalPages(response.data.metadata.totalPages); // Update total pages
        setTotalItems(response.data.metadata.totalItems); // Update total items
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Optionally, you can set an error state here to inform the user
      }
    };

    fetchCourses();
  }, [userId, currentPage, itemsPerPage, searchQuery]);

  const handleCourse = (content, mainTopic, type, courseId, completed, end) => {
    const jsonData = JSON.parse(content);
    localStorage.setItem("courseId", courseId);
    localStorage.setItem("first", completed);
    localStorage.setItem("jsonData", JSON.stringify(jsonData));
    let ending = "";
    if (completed) {
      ending = end;
    }
    navigate("/content", {
      state: {
        jsonData: jsonData,
        mainTopic: mainTopic.toUpperCase(),
        type: type.toLowerCase(),
        courseId: courseId,
        end: ending,
      },
    });
  };

  const handleCertificate = (mainTopic, end) => {
    const ending = new Date(end).toLocaleDateString();
    navigate("/viewcertificate", {
      state: { courseTitle: mainTopic, end: ending },
    });
  };

  const filteredCourses = currentItems
    .filter((course) =>
      course.mainTopic.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((course) => {
      if (filterStatus === "active") return !course.completed;
      if (filterStatus === "completed") return course.completed;
      return true;
    });

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
    <div className="pb-8">
      <div className="text-white items-center flex justify-between gap-1 border-b pb-2 pl-4  border-white">
        <p>My Courses</p>
        <div className="relative">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="flex items-center gap-2  py-1 text-white"
          >
            {filterStatus === "all"
              ? "All Courses"
              : filterStatus === "active"
              ? "Active"
              : "Completed"}
            <SlidersHorizontal className="cursor-pointer" />
          </button>

          {showFilter && (
            <div className="absolute -right-4 mt-3 py-2 bg-darkgray w-40  text-white rounded-md shadow-lg z-50">
              <p
                className="px-4 py-2 cursor-pointer hover:bg-teal-400"
                onClick={() => {
                  setFilterStatus("all");
                  setShowFilter(false);
                  setCurrentPage(1);
                }}
              >
                All Courses
              </p>
              <p
                className="px-4 py-2 cursor-pointer hover:bg-teal-400"
                onClick={() => {
                  setFilterStatus("active");
                  setShowFilter(false);
                  setCurrentPage(1);
                }}
              >
                Active
              </p>
              <p
                className="px-4 py-2 cursor-pointer hover:bg-teal-400"
                onClick={() => {
                  setFilterStatus("completed");
                  setShowFilter(false);
                  setCurrentPage(1);
                }}
              >
                Completed
              </p>
            </div>
          )}
        </div>
      </div>

      <span className="flex justify-end py-3 items-center">
        <input
          type="text"
          placeholder="Search by topicName"
          className="text-white placeholder:text-white rounded-l-full px-4 py-2 bg-black outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="text-white font-bold bg-black rounded-r-full pr-4 py-2">
          <Search />
        </button>
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-4 py-4 ">
        {filteredCourses.map((course, index) => (
          <div
            key={index}
            className="col-span-3 bg-darkgray pb-2 text-white rounded-4xl"
          >
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
              <p
                onClick={() =>
                  handleCourse(
                    course.content,
                    course.mainTopic,
                    course.type,
                    course._id,
                    course.completed,
                    course.end
                  )
                }
                className=" cursor-pointer bg-teal-400 text-black px-4 py-1 rounded-md text-sm"
              >
                Continue
              </p>
              {course.completed === true && (
                <p
                  onClick={() =>
                    handleCertificate(course.mainTopic, course.end)
                  }
                  className="cursor-pointer bg-white text-black px-4 py-1 rounded-md text-sm"
                >
                  Certificate
                </p>
              )}
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

export default Courses;
