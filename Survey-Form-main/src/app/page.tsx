"use client";
import Footer from "@/components/footer";
import FooterPhone from "@/components/footerphone";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import FooterF from "@/components/responsivef";



export default function Home() {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };



  const [isFormVisible, setIsFormVisible] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState<string>("");
  const handleBack = (): void => setCurrentQuestion((prev) => prev - 1);
  const [xValue, setXValue] = useState("900px");
  const [intial, setInitial] = useState("-800px");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // State to track selected button

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [message, setMessage] = useState("error");
  const [errorform, setErrorform] = useState("");
  const [successform, setSuccessform] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hover, setHover] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    age: "",
    pincode: "",
    phoneNumber: "",
  });
  const questions = [
    {
      question:
        "Is your online fashion shopping experience ruined by 1-5 day delivery delays followed by 5 days+ return or replacement?",
      options: ["Yes", "No"],
    },
    {
      question:
        "Will you choose Ubbaco if we deliver you quality products and customised scheduled delivery in just 10 minutes?",
      options: ["Yes", "No"],
    },
    {
      question:
        "Would you choose Ubbaco for a revolutionary shopping experience with unique features to find your perfect outfit?",
      options: ["Yes", "No"],
    },
    {
      question: "How often do you shop for clothes in a year?",
      options: [
        "Once a month",
        "2-3 times a month",
        "Once every 2-3 months",
        "Once every 4-6 months",
        "Once a year or less",
      ],
    },
    {
      question: "What is your favourite clothing brand?",
      type: "text",
    },
    {
      question: "How much do you usually spend on clothing in a year?",
      options: ["< ₹3000", "₹3000 - ₹5000", "₹5000 - ₹7000", "> ₹7000"],
    },
    { question: "Your Name?", type: "text" },
    { question: "Your email?", type: "email" },
    {
      question: "Your phone number? Promise we will not spam you",
      type: "tel",
    },
  ];

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorform("");
    setSuccessform("");

    // Destructure formData for better readability
    const { name, email, phoneNumber, age, pincode } = formData;

    // Validation logic
    if (!name || !email || !phoneNumber) {
      setErrorform("Name, email, and phone number are required.");
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setErrorform("Phone number must be exactly 10 digits.");
      return;
    }
    if (!/^\d+$/.test(phoneNumber)) {
      setErrorform("Phone number must contain only numeric digits.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorform("Invalid email format.");
      return;
    }
    if (!age || isNaN(Number(age)) || Number(age) <= 0) {
      setErrorform("Age must be a positive number and non-zero.");
      return;
    }
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      setErrorform("Pincode must be a valid 6-digit number.");
      return;
    }

    // Use AbortController for timeout handling
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/userForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const result = await response.json();
      if (response.ok) {
        setSuccessform("Form submitted successfully!");
        setFormData({
          name: "",
          gender: "",
          email: "",
          age: "",
          pincode: "",
          phoneNumber: "",
        });
      } else {
        setErrorform(result.message || "Error submitting form.");
      }
    } catch (error) {
      clearTimeout(timeout);
      if (error instanceof Error) {
        setErrorform(
          error.message || "An error occurred. Please try again later."
        );
      } else {
        setErrorform("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinClick = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const handleHover = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const handleNext = (): void => {
    if (validateAnswer()) {
      setError("");
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        handleSubmit();
      }
    }
  };

  const validateAnswer = (): boolean => {
    const question = questions[currentQuestion];
    const answer = answers[currentQuestion];
    if (!answer) {
      setError("This field is required.");
      return false;
    }

    if (
      question.type === "tel" &&
      (!/^\d{10}$/.test(answer) || isNaN(Number(answer)))
    ) {
      setError("Phone number must be 10 digits.");
      return false;
    }

    if (
      question.type === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answer)
    ) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleChange = (value: string): void => {
    setAnswers({ ...answers, [currentQuestion]: value });
    setError("");
  };


  const handleSubmit = async (): Promise<void> => {
   
    try {
      // Send answers array directly
      const payload = answers;
      
  
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        setIsSubmitted(true); // Set success state
        setMessage("Survey submitted successfully!"); // Update message if needed
      } else {
       
        alert(message || "Error submitting survey.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
 

  useEffect(() => {
  
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 400);
    };

    // Initial check and add listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup the listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    const updateIsLargeScreen = () => {
      if (window.innerWidth > 1580) {
        setIsLargeScreen(true); // Small screens
      } else {
        setIsLargeScreen(false); // Large screens
      }
    };

    // Set initial value and add resize listener
    updateIsLargeScreen();
    window.addEventListener("resize", updateIsLargeScreen);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", updateIsLargeScreen);
  }, []);
  useEffect(() => {
    const updateXValue = () => {
      if (window.innerWidth < 640 && window.innerWidth > 400) {
        setXValue("990px"); // Small screens
      } else if (window.innerWidth < 1024&& window.innerWidth > 640) {
        setXValue("600px"); // Medium screens
      } else if (window.innerWidth <= 400) {
        setXValue("973px"); // Medium screens
      } else {
        setXValue("900px"); // Large screens
      }
    };

    // Set initial value and add resize listener
    updateXValue();
    window.addEventListener("resize", updateXValue);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", updateXValue);
  }, []);
  useEffect(() => {
    const updateIntialValue = () => {
      if (window.innerWidth < 640) {
        setInitial("-20px"); // Small screens
      } else if (window.innerWidth < 1024) {
        setInitial("-400px"); // Medium screens
      } else {
        setInitial("-800px"); // Large screens
      }
    };

    // Set initial value and add resize listener
    updateIntialValue();
    window.addEventListener("resize", updateIntialValue);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", updateIntialValue);
  }, []);
  // Scroll to top on initial render
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
   <>
   <div className="relative w-full  flex flex-col items-center overflow-hidden ">
      <div className="w-full  h-[400px]  lg:h-[815px] bg-gradient-to-b from-[#ff2626] to-[#ff6730]">
        {/* Bike Animation */}
        <motion.div
          className="absolute top-[160px] lg:top-[270px] left-[-800px] sm:top-[100px] sm:left-[-300px]"
          key={intial}
          initial={{ x: intial }}
          animate={{ x: xValue }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <Image
            src="/bike5.png"
            alt="Delivery bike moving across the screen"
            width={isSmallScreen ? 219 : 260}
            height={300}
            className="lg:w-[680px] lg:h-[650px]"
            priority
          />
        </motion.div>

        {/* Text Animation */}
        {/* Vertically Stacked Text */}
        <motion.div
          className="absolute top-[60px] lg:top-16 left-4 md:top-32 md:left-8 max-w-xs md:max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <h1 className="font-bold text-white leading-[1.2] lg:gap-3">
            <span
              className={`block ${
                isSmallScreen
                  ? "text-[35px]"
                  : "text-[40px] md:text-[80px] lg:text-[100px]"
              } mt-[70px]`}
            >
              Fast. Fashion.
            </span>
            <span
              className={`block mt-2 ${
                isSmallScreen
                  ? "text-[35px]"
                  : "text-[40px] md:text-[80px] lg:text-[100px]"
              }`}
            >
              Delivered In
            </span>
            <span
              className={`block mt-2 ${
                isSmallScreen
                  ? "text-[35px]"
                  : "text-[40px] md:text-[80px] lg:text-[100px]"
              } font-extrabold`}
            >
              10 Minutes
            </span>
          </h1>
          <button
            onClick={handleJoinClick}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseOut}
            className={`inline-flex items-center justify-center px-6 py-3 mt-6 ${
              hover ? "bg-black" : "bg-white"
            } rounded-full shadow-lg text-sm md:px-8 md:py-4 md:mt-10 transition-all duration-300`}
            aria-label="Join Waitlist"
          >
            <p
              className={`${
                hover ? "text-[#ff2626]" : "text-[#193238]"
              } text-sm font-medium md:text-xl transition-all duration-300`}
            >
              Join Waitlist
            </p>
          </button>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="absolute top-6 left-6 md:top-8 md:left-8 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <h2 className="font-bold text-white text-2xl md:text-3xl">
            <span className="tracking-wide">Ubbaco</span>
          </h2>
        </motion.div>
      </div>
      {isFormVisible && (
        <div
          className="form-overlay"
          onClick={(e) => {
            const target = e.target as HTMLElement; // Type assertion to HTMLElement
            if (target.classList.contains("form-overlay")) {
              closeForm();
            }
          }}
        >
          <div className="floating-form">
            <Image
              src="/123.png"
              alt="X"
              width={22}
              height={22}
              className="absolute top-2 right-2 cursor-pointer font-sans mt-2 mr-2"
              onClick={closeForm}
            />
            <h2 className="form-heading">Join the Fashion</h2>
            <h1 className="form-heading-bold">Revolution!</h1>
            <p className="form-description">
              Be a part of the revolution <br /> fashion delivered in 10
              minutes!
            </p>
            <form className="form-content" onSubmit={handleUserFormSubmit}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="XYZ..."
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="xyz@gmail.com"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="22"
                  value={formData.age}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="411xx1"
                  value={formData.pincode}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="987xxx3210"
                  value={formData.phoneNumber}
                  onChange={handleFormChange}
                />
              </div>
              {errorform && <p className="error-message">{errorform}</p>}
              {successform && (
                <div className="success-message-container">
                  <p className="success-message">{successform}</p>
                  <button className="go-back-button" onClick={closeForm}>
                    Go Back
                  </button>
                </div>
              )}
              {!successform && (
                <button
                  type="submit"
                  className={`submit-button ${
                    isSubmitting ? "submitting" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit →"}
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          pointer-events: all;
          background: rgba(0, 0, 0, 0.5);
        }

        .floating-form {
          background-color: #ffefe2;
          padding: 10px;
          border-radius: 12px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 320px;
          text-align: center;
          position: relative;
          margin: 10px;
        }

        /* Responsive design for small screens */
        @media screen and (max-width: 480px) {
          .floating-form {
            padding: 8px;
            border-radius: 10px;
            width: 95%;
            max-width: 300px;
          }
          .form-heading {
            font-size: 16px;
          }
          .form-heading-bold {
            font-size: 24px;
          }
          .form-description {
            font-size: 10px;
            margin: 10px 0 12px;
          }
          label {
            font-size: 10px;
          }
          input,
          select {
            padding: 6px;
            font-size: 10px;
          }
          .submit-button {
            background: linear-gradient(to right, #ff2626, #ff6730);
            padding: 8px;
            font-size: 12px;
          }
          .success-message {
            font-size: 0.9rem;
          }
          .go-back-button {
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
          }
          .error-message {
            font-size: 0.7rem;
          }
        }

        /* Responsive design for medium screens */
        @media screen and (min-width: 768px) {
          .floating-form {
            width: 65%;
            max-width: 400px;
            padding: 15px;
          }
        }

        /* Responsive design for large screens */
        @media screen and (min-width: 1024px) {
          .floating-form {
            width: 50%;
            max-width: 500px;
            padding: 20px;
          }
        }

        .form-heading {
          font-size: 18px;
          font-weight: 500;
          margin: 0;
          background: linear-gradient(to right, #ff2626, #ff6730);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: -5px; /* Reduce gap between headings */
        }

        .form-heading-bold {
          font-size: 30px;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 8px; /* Decrease gap between heading and description */
          background: linear-gradient(to right, #ff2626, #ff6730);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .form-description {
          font-size: 12px;
          margin: 8px 0 16px; /* Reduce gap between description and input fields */
          color: #000000;
        }

        .form-content {
          display: flex;
          flex-direction: column;
        }

        label {
          display: block;
          font-size: 12px;
          margin-bottom: 5px;
          color: #ff5d2e;
          text-align: left;
        }

        input,
        select {
          width: 100%;
          padding: 8px;
          margin-bottom: 12px;
          border-radius: 6px;
          border: none;
          background-color: #ffffff;
          color: #333;
          font-size: 12px;
        }

        .submit-button {
          width: 100%;
          background: linear-gradient(to right, #ff2626, #ff6730);

          color: white;
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s ease-in-out;
        }

        .submit-button.submitting {
          background-color: #ff4500;
          color: #333;
          cursor: not-allowed;
          font-style: italic;
        }

        .submit-button:hover:not(.submitting) {
          background: linear-gradient(to right, #ff2626, #ff6730);
        }
        .success-message-container {
          text-align: center;
          margin-top: 1rem;
        }

        .success-message {
          color: #ff4500;
          font-size: 1rem;
          font-weight: 600;
          background: linear-gradient(
            to right,
            #ff2626,
            #ff6730
          ); /* Gradient for success message */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .go-back-button {
          background: linear-gradient(to right, #ff2626, #ff6730);
          color: white;
          padding: 0.4rem 0.8rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        .go-back-button:hover {
          background: linear-gradient(to right, #ff2626, #ff6730);
        }

        .error-message {
          background: linear-gradient(
            to right,
            #ff2626,
            #ff6730
          ); /* Gradient for success message */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #d9534f;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
      `}</style>

      {/* Benefits Section */}
      <section className="flex flex-col items-center gap-10 py-16 bg-[#FFEFE2] px-4 md:px-20 lg:px-32">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#0f1d21]">
          Benefits of Joining the Waitlist
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Cards */}
          {[
            {
              title: "First in Line, First in Style",
              description:
                "Get exclusive early access to Ubbaco 10-minute fashion delivery revolution.",
              image: "/access.png",
            },
            {
              title: "Priority Treatment, Always",
              description:
                "Enjoy VIP perks with exclusive access to premium collections and faster service.",
              image: "/vip.png",
            },
            {
              title: "Fashion, Just for You",
              description:
                "Receive handpicked styles tailored to elevate your wardrobe.",
              image: "/fashion.png",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-[#FFCCBD] rounded-2xl shadow-lg text-center"
            >
              {/* Title */}
              <h3 className="text-lg font-bold text-[#ff2626] capitalize">
                {benefit.title}
              </h3>
              {/* Image */}
              <Image
                src={benefit.image}
                alt={benefit.title}
                width={120}
                height={120}
                className="rounded-full my-4"
              />
              {/* Description */}
              <p className="text-[#ff2626] mt-2 capitalize">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-[#FFEFE2] flex flex-col items-center relative z-[31] md:hidden">
        {/* About Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 px-4 py-16 md:px-20 lg:px-32 w-full max-w-[1440px] mx-auto">
          <div className="relative w-full max-w-sm mx-auto md:max-w-md">
            <Image
              src="/about.png"
              alt="About Us"
              layout="responsive"
              width={560}
              height={621}
              className="rounded-lg"
            />
          </div>
          <div className="text-left max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0f1d21]">
              About Ubbaco
            </h2>
            <p className="text-[#757575] mt-4 leading-relaxed text-justify">
              Ubbaco is a fashion-exclusive platform that brings together a
              curated selection of global and local brands, offering a
              personalized and seamless shopping experience tailored to your
              unique style. With our groundbreaking 10-minute delivery—faster
              than any brand out there—we bring fashion to your doorstep in no
              time. Committed to quality, innovation, and inclusivity, Ubbaco is
              the future of fashion, delivered today.
            </p>
          </div>
        </div>

        {/* Survey Form Heading */}

        {/* Large Gap */}
        <div className="w-full h-[100px] bg-[#FFEFE2] hidden md:flex" />
      </section>

      <section className="w-full bg-[#FFEFE2] flex flex-col items-center relative z-[31] hidden md:flex">
        {/* About Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 px-4 py-16 md:px-20 lg:px-32 w-full max-w-[1440px] mx-auto">
          <div className="relative w-full max-w-sm mx-auto md:max-w-md">
            <Image
              src="/about.png"
              alt="About Us"
              layout="responsive"
              width={560}
              height={621}
              className="rounded-lg"
            />
          </div>
          <div className="text-left max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0f1d21]">
              About Ubbaco
            </h2>
            <p className="text-[#757575] mt-4 leading-relaxed text-justify">
              Ubbaco is a fashion-exclusive platform that brings together a
              curated selection of global and local brands, offering a
              personalized and seamless shopping experience tailored to your
              unique style. With our groundbreaking 10-minute delivery—faster
              than any brand out there—we bring fashion to your doorstep in no
              time. Committed to quality, innovation, and inclusivity, Ubbaco is
              the future of fashion, delivered today.
            </p>
          </div>
        </div>
        {/* Survey Form Heading */}
        <div className="w-full text-center mt-20 ">
          <h2 className="h-[60px]  text-[40px] font-semibold leading-[60px] text-[#0f1d21] hidden md:flex justify-center">
            Survey Form
          </h2>
        </div>
        <div className="w-full h-[300px] bg-[#FFEFE2]" />
        <div className="w-[1350px] flex h-screen items-center bg-[#FFF8EE] top-[800px] absolute rounded-t-[20px] shadow-lg z-3">
          <div className="h-[658px] relative bg-[#FFF8EE] rounded-[20px] overflow-hidden w-full">
            {isSubmitted ? (
              <div className="text-center">
                <h1 className="text-[24px] font-semibold text-[#0F1D21] mb-8 mt-[180px] text-transparent bg-clip-text bg-gradient-to-r from-[#ff2626] to-[#ff6730]">
                  Thank You!
                </h1>
                <p className="text-[30px] text-[#0F1D21] mb-6 text text-transparent bg-clip-text bg-gradient-to-r from-[#ff2626] to-[#ff6730]">
                  Thank you for sharing your thoughts!* As a token of
                  appreciation, <br />
                  you will be the first to know when Ubbaco launches, along with{" "}
                  <br /> exclusive discounts and early access to premium
                  collection
                </p>
                <button
                  className="bg-[#FF6347] text-white py-2 px-6 rounded-[26px] text-[30px] hover:bg-[#FF4500] transition-colors  rounded-[26px] "
                  onClick={() => {
                    setIsSubmitted(false); // Reset submission state
                    setCurrentQuestion(0); // Reset to the first question
                  }}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleMouseOut}
                >
                  <span
                    className={`relative ${
                      hover ? "text-[#ff2626]" : "text-white"
                    } text-xl font-medium capitalize leading-[30px] transition-all duration-300`}
                  >
                    Start Over
                  </span>
                </button>
              </div>
            ) : (
              <>
                {/* Question Number */}
                <div className="left-[555px] top-[57px] absolute text-center text-[#0F1D21] text-[40px] font-medium  leading-[60.01px]">
                  Question {currentQuestion + 1} of {questions.length}
                </div>

                {/* Question Text */}
                <div className="w-[628px] left-[343px] top-[149px] absolute text-center text-[#0F1D21] text-xl font-normal  leading-[30px]">
                  {questions[currentQuestion]?.question || "Loading..."}
                </div>

                {/* Options or Input Field */}
                {questions[currentQuestion]?.options ? (
                  questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={`w-[602px] h-[58px] left-[369px] absolute bg-white`}
                      style={{
                        top: `${309 + index * 60}px`, // Dynamically position each option
                      }}
                    >
                      <button
                        className={`w-full h-full text-left pl-4 rounded-[10px] ${
                          selectedOption === index
                            ? "bg-[#FF6347] text-white"
                            : "bg-[#FFFFFF] text-black border-2 border-[#FF6347]"
                        }`}
                        onClick={() => {
                          handleChange(option);
                          setSelectedOption(index);
                        }}
                      >
                        {option}
                      </button>
                    </div>
                  ))
                ) : (
                  <div
                    className="w-[602px] left-[369px] absolute"
                    style={{
                      top: "309px",
                    }}
                  >
                    <input
                      type={questions[currentQuestion]?.type || "text"}
                      placeholder="Favaurite Brand..."
                      className=" w-7 rounded-[20px] border border-[#FF6347] focus:outline-none focus:border-[#FF4500] h-[60px]"
                      value={answers[currentQuestion] || ""}
                      onChange={(e) => handleChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleNext();
                      }}
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="w-[142px] h-[58px] left-[200px] top-[559px] absolute bg-[#FFF8EE]">
                  {currentQuestion > 0 && (
                    <button
                      className="w-full h-full bg-[#FFFFFF] text-black rounded-[26px] border-[#FF6347] border-2"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}
                </div>
                <div className="w-[142px] h-[58px] left-[995px] top-[559px] absolute bg-[#FFF8EE]">
                  <button
                    className={`w-full h-full rounded-[26px] ${
                      error ? "pointer-events-none opacity-50" : ""
                    } bg-[#FF6347] text-white hover:bg-[#FF4500]`}
                    onClick={
                      currentQuestion === questions.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                  >
                    {currentQuestion === questions.length - 1
                      ? "Submit"
                      : "Next"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Large Gap */}
      </section>

      {/* How in 10 Section */}

      <section className="flex flex-col gap-[8px] lg:gap-[52px] items-center bg-white relative mb-14 hidden md:flex">
        <div className="lg:h-[800px] h-[600px] left-0 w-[360px] lg:w-full bg-[#FFF8EE]  rounded-t-[20px] shadow-lg mb-8 flex justify-center items-center md:hidden">
          <div className="w-[90%] lg:w-[60%] p-4">
            {isSubmitted ? (
              <div className="text-center">
                <h2 className="text-[24px] font-semibold text-[#0F1D21] mb-4">
                  Thank You!
                </h2>
                <p className="text-[16px] text-[#0F1D21] mb-6 text-justify">
                  Your survey has been submitted successfully. We appreciate
                  your time and effort!
                </p>
                <button
                  className="bg-[#FF6347] text-white py-2 px-6 rounded-[26px] text-[13px] hover:bg-[#FF4500] transition-colors"
                  onClick={() => window.location.reload()} // Optional: Reload page or navigate elsewhere
                >
                  Go Back
                </button>
              </div>
            ) : (
              <div className="transition-all duration-500 ease-in-out">
                <h2 className="text-[20px] font-semibold text-center text-[#0F1D21] mb-6">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <h3 className="text-[18px] font-medium text-[#0F1D21] text-center mb-4">
                  {questions[currentQuestion].question}
                </h3>
                <div className="flex flex-col items-center gap-4">
                  {questions[currentQuestion].options ? (
                    questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        className={`w-full py-3 px-4 rounded-[10px] shadow-md text-[16px] transition-colors 
          ${
            selectedOption === index
              ? "bg-[#FF6347] text-white border-2 border-[#FF6347]"
              : "bg-[#FFFFFF] text-black border-2 border-[#FF6347]"
          }`}
                        onClick={() => {
                          handleChange(option);
                          setSelectedOption(index); // Update the selected option index
                        }}
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <input
                      type={questions[currentQuestion].type || "text"}
                      placeholder="Type your answer here..."
                      className="w-full py-3 px-4 rounded-[10px] border border-[#FF6347] focus:outline-none focus:border-[#FF4500]"
                      value={answers[currentQuestion] || ""}
                      onChange={(e) => handleChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleNext();
                      }}
                    />
                  )}
                </div>

                {error && (
                  <p className="text-red-500 text-[13px] mt-2">{error}</p>
                )}
                <div className="flex justify-between mt-6">
                  {currentQuestion > 0 && (
                    <button
                      className="bg-[#FFFFFF] text-black py-2 px-6 rounded-[26px] text-[13px] transition-colors border-[#FF6347] border-2"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}
                  <button
                    className={`${
                      error ? "pointer-events-none opacity-50" : ""
                    } bg-[#FF6347] text-white py-2 px-6 rounded-[26px] text-[13px] hover:bg-[#FF4500] transition-colors`}
                    onClick={
                      currentQuestion === questions.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                  >
                    {currentQuestion === questions.length - 1
                      ? "Submit"
                      : "Next"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How in 10 Heading */}
        <h2 className="h-[60px] font-['Poppins'] text-[45px] font-semibold leading-[60px] text-[#0f1d21] text-center lg:mt-[830px]">
          How in 10?
        </h2>

        {/* How in 10 Content */}
        <div className="flex gap-[72px] justify-center items-center flex-wrap">
          {["fromdark.png", "way.png", "toyou.png"].map((img, index) => (
            <div
              key={index}
              className="flex w-[388px] flex-col gap-[16px] justify-center items-center relative"
            >
              <div className=" w-[388px] h-[500px] lg:w-[388px] lg:h-[396px] bg-[#FFEFE2] rounded-[20px] relative overflow-hidden">
                <Image
                  src={`/${img}`}
                  alt={
                    index === 0
                      ? "From our darkstore"
                      : index === 1
                      ? "To on the way"
                      : "To you"
                  }
                  layout="fill"
                />
              </div>
              <h3 className="text-[20px] font-medium text-[#0f1d21] text-center">
                {index === 0
                  ? "From our darkstore"
                  : index === 1
                  ? "To on the way"
                  : "To you"}
              </h3>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-[8px] lg:gap-[52px] items-center bg-white relative z-[35] mb-14 md:hidden">
        {/* Large Gap Before How in 10 Section */}
        <div className="w-full lg:h-[1000px] bg-white md:hidden" />
        {/* Survey Section */}
        <h1 className="md:hidden mt-[0px] font-semibold"> Survey Form</h1>

        <div className="lg:h-[800px] h-[600px] left-0 w-[360px] lg:w-full bg-[#FFF8EE] z-[10] rounded-t-[20px] shadow-lg mb-8 flex justify-center items-center md:hidden">
          <div className="w-[90%] lg:w-[60%] p-4">
            {isSubmitted ? (
              <div className="text-center">
                <h2 className="text-[40px] font-semibold text-[#0F1D21] mb-4">
                  Thank You!
                </h2>
                <p className="text-[24px] text-[#0F1D21] mb-6">
                  Your survey has been submitted successfully. We appreciate
                  your time and effort!
                </p>
                <button
                  className="bg-[#FF6347] text-white py-3 px-8 rounded-[26px] text-[18px] hover:bg-[#FF4500] transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Start Over
                </button>
              </div>
            ) : (
              <div className="transition-all duration-500 ease-in-out">
                <h2 className="text-[20px] font-semibold text-center text-[#0F1D21] mb-6">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <h3 className="text-[18px] font-medium text-[#0F1D21] text-center mb-4">
                  {questions[currentQuestion].question}
                </h3>
                <div className="flex flex-col items-center gap-4">
                  {questions[currentQuestion].options ? (
                    questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        className={`w-full py-3 px-4 rounded-[10px] shadow-md text-[16px] transition-colors 
        ${
          selectedOption === index
            ? "bg-[#FF6347] text-white border-2 border-[#FF6347]"
            : "bg-[#FFFFFF] text-black border-2 border-[#FF6347]"
        }`}
                        onClick={() => {
                          handleChange(option);
                          setSelectedOption(index); // Update the selected option index
                        }}
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <input
                      type={questions[currentQuestion].type || "text"}
                      placeholder="Type your answer here..."
                      className="w-full py-3 px-4 rounded-[10px] border border-[#FF6347] focus:outline-none focus:border-[#FF4500]"
                      value={answers[currentQuestion] || ""}
                      onChange={(e) => handleChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleNext();
                      }}
                    />
                  )}
                </div>

                {error && (
                  <p className="text-red-500 text-[13px] mt-2">{error}</p>
                )}
                <div className="flex justify-between mt-6">
                  {currentQuestion > 0 && (
                    <button
                      className="bg-[#FFFFFF] text-black py-2 px-6 rounded-[26px] text-[13px] transition-colors border-[#FF6347] border-2"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}
                  <button
                    className={`${
                      error ? "pointer-events-none opacity-50" : ""
                    } bg-[#FF6347] text-white py-2 px-6 rounded-[26px] text-[13px] hover:bg-[#FF4500] transition-colors`}
                    onClick={
                      currentQuestion === questions.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                  >
                    {currentQuestion === questions.length - 1
                      ? "Submit"
                      : "Next"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How in 10 Heading */}
        <h2 className="h-[60px] font-['Poppins'] text-[45px] font-semibold leading-[60px] text-[#0f1d21] text-center lg:mt-[830px]">
          How in 10?
        </h2>

        {/* How in 10 Content */}
        <div className="flex gap-[72px] justify-center items-center flex-wrap">
          {["fromdark.png", "way.png", "toyou.png"].map((img, index) => (
            <div
              key={index}
              className="flex w-[388px] flex-col gap-[16px] justify-center items-center relative"
            >
              <div className=" w-[388px] h-[500px] lg:w-[388px] lg:h-[396px] bg-[#FFEFE2] rounded-[20px] relative overflow-hidden">
                <Image
                  src={`/${img}`}
                  alt={
                    index === 0
                      ? "From our darkstore"
                      : index === 1
                      ? "To on the way"
                      : "To you"
                  }
                  layout="fill"
                />
              </div>
              <h3 className="text-[20px] font-medium text-[#0f1d21] text-center">
                {index === 0
                  ? "From our darkstore"
                  : index === 1
                  ? "To on the way"
                  : "To you"}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center bg-white py-20 px-4 hidden md:flex ">
        <h2 className="text-[40px] font-semibold leading-[60px] text-[#0f1d21] text-center mb-16">
          How are we different?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[70px] max-w-7xl w-full mb-10">
          {[0, 1, 2].map((index) => {
            const feature = [
              {
                img: "diff1.png",
                title: (
                  <>
                    Why Did not Anyone Tell You This <br />
                    Before?
                  </>
                ),
                description:
                  "Your perfect outfit, delivered faster than ever because waiting is not stylish.",
              },
              {
                img: "diff2.png",
                title: (
                  <>
                    Fashion at the Speed of <br />
                    Now
                  </>
                ),
                description:
                  "From browsing to checkout, we make fashion as effortless as it should be.",
              },
              {
                img: "diff3.png",
                title: "Try Before You Buy",
                description:
                  "Experience trying your favorites at home before committing.",
              },
            ][index];
            return (
              <div
                key={index}
                className="flex flex-col items-center bg-[#FFD7D4] p-6 rounded-3xl shadow-lg"
              >
                <h3 className="text-[16px] font-bold text-[#193238] text-center mb-6 capitalize leading-[1.5]">
                  {feature.title}
                </h3>

                {/* White Rounded Border with Fixed Height */}
                <div className="w-48 h-48 flex justify-center items-center bg-white rounded-tl-[124px] rounded-tr-[124px] rounded-bl-xl rounded-br-xl overflow-hidden">
                  <div className="w-[110px] h-[110px] relative">
                    <picture>
                      <img
                        src={feature.img}
                        alt="Feature"
                        className="w-full h-full object-contain"
                      />
                    </picture>
                  </div>
                </div>

                <p className="text-[16px] text-[#193238] text-center mt-4">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-[70px] mt-10 max-w-7xl w-full mb-[70px]">
          {[3, 4].map((index) => {
            const feature = [
              {
                img: "diff4.png",
                title: (
                  <>
                    Try on Virtually, <br />
                    Love Immediately
                  </>
                ),
                description: "Visualize your style with augmented reality.",
              },
              {
                img: "diff5.png",
                title: (
                  <>
                    Eco-Conscious <br />
                    Deliveries
                  </>
                ),
                description:
                  "We are committed to a sustainable future with eco-friendly delivery practices.",
              },
            ][index - 3];
            return (
              <div
                key={index}
                className="flex flex-col items-center bg-[#FFD8D5] p-6 rounded-2xl shadow-lg w-full sm:w-[calc(50%-20px)] lg:w-[calc(33%-20px)]"
              >
                <h3 className="text-[20px] font-bold text-[#193238] text-center mb-4 leading-[1.5]">
                  {feature.title}
                </h3>

                {/* White Rounded Border with Fixed Height */}
                <div className="w-48 h-48 flex justify-center items-center bg-white rounded-tl-[124px] rounded-tr-[124px] rounded-bl-xl rounded-br-xl overflow-hidden">
                  <div className="w-[110px] h-[110px] relative">
                    <picture>
                      <img
                        src={feature.img}
                        alt="Feature"
                        className="w-full h-full object-contain"
                      />
                    </picture>
                  </div>
                </div>

                <p className="text-[16px] text-[#193238] text-center mt-4">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col items-center bg-white py-20 px-4 md:hidden">
        <h2 className="text-[40px] font-semibold leading-[60px] text-[#0f1d21] text-center mb-16">
          How are we different?
        </h2>

        <div className="grid grid-cols-2 gap-[20px] max-w-7xl w-full">
          {[0, 1, 2, 3].map((index) => {
            const feature = [
              {
                img: "diff1.png",
                title: (
                  <>
                    Why Did not Anyone Tell You <br />
                    This Before?
                  </>
                ),
                description:
                  "Your perfect outfit, delivered faster than ever because waiting is not stylish.",
              },
              {
                img: "diff2.png",
                title: (
                  <>
                    Fashion at the Speed of <br />
                    Now
                  </>
                ),
                description:
                  "From browsing to checkout, we make fashion as effortless as it should be.",
              },
              {
                img: "diff3.png",
                title: "Try Before You Buy",
                description:
                  "Experience trying your favorites at home before committing.",
              },
              {
                img: "diff4.png",
                title: <>Try on Virtually</>,
                description: "Visualize your style with augmented reality.",
              },
            ][index];
            return (
              <div
                key={index}
                className="flex flex-col items-center bg-[#FFD7D4] p-6 rounded-3xl shadow-lg"
              >
                <h3 className="text-[10px] md:text-[16px]  font-semibold font-poppins text-[#193238] text-center mb-4 capitalize leading-[1.2]">
                  {feature.title}
                </h3>

                <div className="w-36 h-36 sm:w-48 sm:h-48 flex justify-center items-center bg-white rounded-tl-[124px] rounded-tr-[124px] rounded-bl-xl rounded-br-xl overflow-hidden">
                  <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] relative">
                    <picture>
                      <img
                        src={feature.img}
                        alt="Feature"
                        className="w-full h-full object-contain"
                      />
                    </picture>
                  </div>
                </div>

                <p className="text-[14px]  text-[#193238] text-center mt-2 sm:mt-4 capitalize">
                  {feature.description}
                </p>
              </div>
            );
          })}

          {/* Separate div for the fifth box with elongated dimensions */}
          <div
            className="flex flex-col items-center bg-[#FFD7D4] p-6 rounded-3xl shadow-lg w-full"
            style={{ gridColumn: "span 2" }} // Elongate and center
          >
            <h3 className="text-[16px] font-bold text-[#193238] text-center mb-4 capitalize leading-[1.2]">
              Eco-Conscious Deliveries
            </h3>

            <div className="w-36 h-36 sm:w-48 sm:h-48 flex justify-center items-center bg-white rounded-tl-[124px] rounded-tr-[124px] rounded-bl-xl rounded-br-xl overflow-hidden">
              <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] relative">
                <picture>
                  <img
                    src="diff5.png"
                    alt="Feature"
                    className="w-full h-full object-contain"
                  />
                </picture>
              </div>
            </div>

            <p className="text-[14px] sm:text-[16px] text-[#193238] text-center mt-2 sm:mt-4">
              We are committed to a sustainable future with eco-friendly
              delivery practices.
            </p>
          </div>
        </div>
      </section>

      <div className="h-[350px] py-[46px] flex-col justify-start items-center gap-3  mb-[90px] hidden md:flex">
        {/* Title */}
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2626] to-[#ff6730] text-[28px] lg:text-5xl font-extrabold capitalize leading-[1.2px]">
          Launching soon in Pune!
        </div>

        {/* Subtitle */}
        <div className="w-[1285px] text-center text-[#193238] lg:text-[40px]  text-[25px] font-semibold  capitalize leading-[60.01px]">
          Be a part of the Ubbaco revolution
        </div>

        {/* Description */}
        <div className="w-[1199px] text-center">
          <span className="text-[#193238] lg:text-2xl font-normal  capitalize leading-9">
            We are
          </span>
          <span className="text-[#193238] lg:text-2xl font-normal  lowercase leading-9">
            {" "}
            just getting started.{" "}
          </span>
          <span className="text-[#193238] lg:text-2xl font-normal  capitalize leading-9">
            Be
          </span>
          <span className="text-[#193238] lg:text-2xl font-normal  lowercase leading-9">
            {" "}
            one of the first to experience the future of fashion.
          </span>
        </div>

        <div className="inline-block rounded-[64px] overflow-hidden">
          <button
            onClick={handleJoinClick}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseOut}
            className={`relative px-11 py-3 w-full h-full ${
              hover
                ? "bg-black"
                : "bg-gradient-to-r from-[#ff522c] to-[#ff2626]"
            } transition-all duration-300 rounded-[64px] flex justify-center items-center`}
          >
            <span
              className={`${
                hover ? "text-[#ff2626]" : "text-white"
              } text-xl font-medium capitalize leading-[30px] transition-all duration-300`}
            >
              Join Waitlist
            </span>
          </button>
        </div>
      </div>
      <div className="h-[350px] py-[46px] flex-col justify-start items-center inline-flex mb-[90px] md:hidden">
        {/* Title */}
        <div className="text-[#ff2626] text-[28px] lg:text-5xl font-extrabold capitalize leading-[72.01px] relative">
          Launching soon in Pune!
        </div>

        {/* Subtitle */}
        <div className="w-[1285px] flex flex-col items-center text-center text-[#193238]  text-[29px] font-semibold capitalize mb-[20px]">
          Be a part of the Ubbaco
          <p>Revolution</p>
        </div>

        {/* Description */}
        <div className="w-[1285px] flex flex-col items-center text-center text-[#193238]  text-[20px] capitalize mb-[20px]">
          We are just getting started.Be one of the
          <p>first to experience the future of fashion.</p>
        </div>
        <div className="rounded-[64px]">
          <button
            onClick={handleJoinClick}
            className="relative px-11 py-3 w-full h-full bg-gradient-to-r from-[#ff522c] to-[#ff2626] transition-all duration-300 rounded-[64px] hover:bg-gradient-to-r hover:from-[#ff2626] hover:to-[#ff6730] flex justify-center items-center"
          >
            <span className="text-white text-xl font-medium capitalize leading-[30px] transition-all duration-300">
              Join Waitlist
            </span>
          </button>
        </div>
      </div>

      

      <FooterPhone />
      

     {!isLargeScreen? <Footer /> : null}
       
    </div>

     
    {isLargeScreen? <FooterF /> : null}
    </>
  
  );
}
