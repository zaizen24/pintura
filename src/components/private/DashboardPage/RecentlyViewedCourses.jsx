import React from 'react';

// Data Kursus
const courses = [
  {
    title: "Data Analysis Fundamentals",
    description: "Master the basics of data analysis with practical industry application",
    category: "Data & Analytics",
    university: "University of Indonesia",
    imageUrl: "https://placehold.co/600x400?text=Data+Analysis+Image",
    universityLogo: "https://placehold.co/50x50?text=UI+Logo"
  },
  {
    title: "Advance React Development",
    description: "The React Framework – created and maintained",
    category: "Web Development",
    university: "Telkom Indonesia",
    imageUrl: "https://placehold.co/600x400?text=React+Development+Image",
    universityLogo: "https://placehold.co/50x50?text=Telkom+Logo"
  }
];

// Komponen CourseCard
function CourseCard({ course }) {
  return (
    <div className="flex border rounded-lg shadow-lg overflow-hidden w-full md:w-1/2 mb-4 md:mb-0">
      <img src={course.imageUrl} alt={course.title} className="w-1/3 object-cover" />
      <div className="p-4 w-2/3">
        <h2 className="text-blue-600 font-bold text-lg">{course.title}</h2>
        <p className="text-gray-600">{course.description}</p>
        <p className="text-sm text-blue-400 mt-2">{course.category}</p>
        <div className="flex items-center mt-4">
          <img src={course.universityLogo} alt={course.university} className="w-6 h-6 mr-2" />
          <p className="text-gray-800">{course.university}</p>
        </div>
      </div>
    </div>
  );
}

// Komponen Utama
function RecentlyViewedCourses() {
  return (
    <div className='p-4'>
      <h1 className="text-2xl font-bold text-blue-800 mb-6 pt-2">Recently Viewed Courses</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewedCourses;
