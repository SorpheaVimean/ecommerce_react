import React from "react";
import logo from "./logo.png";
import logos from "./background.png";
import about from "./aboutus.png";
const AboutPage = () => {
  return (
    <div>
      <h1
        className="text-5xl md:text-8xl font-extrabold bg-cover bg-center relative h-28 md:h-40 flex justify-center items-center "
        style={{ backgroundImage: `url(${logos})` }}
      >
        ABOUT US
      </h1>
      <div className="mx-[20px] xs:mx-[30px] xl:mx-[70px] flex justify-center mt-20">
        <div className="flex justify-between items-center flex-col lg:flex-row gap-10 mt-5   lg:mx-60">
          <div>
            <img src={about} alt="logo" className="object-contain" />
          </div>
          <div className="">
            <p className="text-4xl md:text-6xl mb-5"> Welcome to our e-commerce have</p>
            <p className="text-justify text-lg  ">
              {" "}
              where cutting-edge technology meets your computing needs
              seamlessly.At [Your E-commerce Store Name], we take pride in
              offering a diverse range of high-performance PCs that cater to
              both casual users and tech enthusiasts alike. Our carefully
              curated selection includes gaming PCs, workstations, and sleek
              laptops, each crafted with precision and powered by the latest
              innovations. Whether you're seeking a powerhouse for gaming
              adventures, a reliable workhorse for professional tasks, or a
              portable companion for on-the-go productivity, we have the perfect
              PC for you. Explore our extensive catalog, where quality meets
              affordability, and experience the convenience of upgrading your
              computing lifestyle with just a few clicks. At [Your E-commerce
              Store Name], we don't just sell PCs; we deliver an immersive and
              tailored technology experience right to your doorstep. Upgrade
              your digital journey with us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
