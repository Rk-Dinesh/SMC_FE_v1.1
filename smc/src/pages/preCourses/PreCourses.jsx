import React, { useEffect, useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import IMG from "../../assets/images/courses.jpeg";
import PaginationBar from "../../components/PaginationBar";
import { API } from "../../Host";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PreCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [subcategory1, setSubCategory1] = useState("");
  const [subcategory2, setSubCategory2] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [options, setOptions] = useState([]);

 useEffect(() => {
    if (category === "") {
      setSubCategory1("");
      setSubCategory2("");
    }
  }, [category]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API}/api/precourseslimit`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchQuery,
            category: category,
            subCategory1: subcategory1,
            subCategory2: subcategory2,
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
  }, [
    userId,
    currentPage,
    itemsPerPage,
    searchQuery,
    category,
    subcategory1,
    subcategory2,
  ]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get(`${API}/api/getcategorycourse`);

      if (Array.isArray(response.data.cate)) {
        setOptions(response.data.cate);
      } else {
        console.error("Expected an array of  options, but got:", response.data);
        setOptions([]);
      }
    } catch (error) {
      console.error("Error fetching taxes:", error);
    }
  };

  const handleCourse = async (
    content,
    mainTopic,
    type,
    courseId,
    completed,
    end,
    userId
  ) => {
    const jsonData = JSON.parse(content);
    localStorage.setItem("courseId", courseId);
    localStorage.setItem("first", completed);
    localStorage.setItem("jsonData", JSON.stringify(jsonData));
    let ending = "";
    if (completed) {
      ending = end;
    }

    try {
      const response = await axios.post(`${API}/api/addprecourse`, {
        userId: userId,
        courseId: courseId,
      });
      navigate("/precontent", {
        state: {
          jsonData: jsonData,
          mainTopic: mainTopic.toUpperCase(),
          type: type.toLowerCase(),
          courseId: courseId,
          end: ending,
        },
      });
      // console.log("User added to course successfully:", response);
    } catch (error) {
      console.error("Error adding user to course:", error);
    }
  };

  const handleCertificate = (mainTopic, end) => {
    const ending = new Date(end).toLocaleDateString();
    navigate("/viewcertificate", {
      state: { courseTitle: mainTopic, end: ending },
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
    <div className="pb-8">
      <div className="text-white items-center flex justify-between gap-1 border-b pb-2 pl-4  border-white">
        <p>Pre Courses</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-around">
        <p className="py-2 flex items-center  ">
          <input
            type="text"
            placeholder="Search by topicName"
            className="text-white placeholder:text-white rounded-l-full px-4 py-2 bg-darkest-blue outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="text-white font-bold bg-darkest-blue rounded-r-full pr-4 py-2">
            <Search />
          </button>
        </p>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="text-white placeholder:text-white rounded-full px-4 py-2 bg-darkest-blue outline-none"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="">All</option>
          {options.map((cat) => (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>

        <select
          value={subcategory1}
          onChange={(e) => {
            setSubCategory1(e.target.value);
            setCurrentPage(1);
          }}
          className="text-white placeholder:text-white rounded-full px-4 py-2 bg-darkest-blue outline-none"
        >
          <option value="" disabled>
            Select Sub Category 1
          </option>
          {options.map((cat) => (
            <option key={cat.subCategory1} value={cat.subCategory1}>
              {cat.subCategory1}
            </option>
          ))}
        </select>

        <select
          value={subcategory2}
          onChange={(e) => {
            setSubCategory2(e.target.value);
            setCurrentPage(1);
          }}
          className="text-white placeholder:text-white rounded-full px-4 py-2 bg-darkest-blue outline-none"
        >
          <option value="" disabled>
            Select Sub Category 2
          </option>
          {options.map((cat) => (
            <option key={cat.subCategory2} value={cat.subCategory2}>
              {cat.subCategory2}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-4 py-4 ">
        {currentItems.map((course, index) => (
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
                <span>Category:</span> {course.category}
              </p>
              <p>
                <span>Date:</span>{" "}
                {(() => {
                  // Find the user in course.user array
                  const userEntry = course.user.find(
                    (user) => user.userId.toString() === userId.toString()
                  );
                  if (userEntry) {
                    return (
                      <span className="">
                        {new Date(userEntry.startDate)
                          .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          .toUpperCase()
                          .replace(/\s/g, "-")}
                      </span>
                    );
                  } else {
                    return (
                      <span className="text-gray-400 text-sm italic">
                        Not started yet
                      </span>
                    );
                  }
                })()}
              </p>
            </div>
            {course.user.some(
              (user) => user.userId.toString() === userId.toString()
            ) ? (
              <div className="flex gap-2 mt-4 justify-center">
                <p
                  className="cursor-pointer bg-teal-400 text-black px-4 py-1 rounded-md text-sm"
                  onClick={() =>
                    handleCourse(
                      course.content,
                      course.mainTopic,
                      course.type,
                      course._id,
                      course.completed,
                      course.end,
                      userId
                    )
                  }
                >
                  Continue
                </p>
              </div>
            ) : (
              <div className="flex gap-2 mt-4 justify-center">
                <p
                  onClick={() =>
                    handleCourse(
                      course.content,
                      course.mainTopic,
                      course.type,
                      course._id,
                      course.completed,
                      course.end,
                      userId
                    )
                  }
                  className=" cursor-pointer bg-teal-400 text-black px-4 py-1 rounded-md text-sm"
                >
                  Start
                </p>
                {/* {course.completed === true && (
                <p
                  onClick={() =>
                    handleCertificate(course.mainTopic, course.end)
                  }
                  className="cursor-pointer bg-white text-black px-4 py-1 rounded-md text-sm"
                >
                  Certificate
                </p>
              )} */}
              </div>
            )}
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

export default PreCourses;
