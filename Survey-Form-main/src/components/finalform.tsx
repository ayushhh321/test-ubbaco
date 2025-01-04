"use client";


interface CurtainProps {
  isVisible: boolean;
  onClose: () => void;
}

const Curtain: React.FC<CurtainProps> = ({ isVisible, onClose }) => {
  return (
    <div className={`curtain-container ${isVisible ? "visible" : ""}`}>
      <button onClick={onClose} className="close-button">X</button>
      <div className="content">
        <h2 className="heading">Join the Fashion Revolution</h2>
        <p className="description">
          Be a part of the revolution <br /> fashion delivered in 10 minutes!
        </p>
        <form className="form-content">
          <div>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" />
          </div>
          <button type="submit">Submit</button>
          <button onClick={onClose} type="button" className="close-form-button">Close</button>
        </form>
      </div>
      <style jsx>{`
        .curtain-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.5s ease-out;
          z-index: 101;
        }

        .curtain-container.visible {
          opacity: 1;
        }

        .close-button,
        .close-form-button {
          padding: 8px 16px;
          background-color: #ff5a5a;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          position: absolute;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button {
          top: 20px;
          right: 20px;
        }

        .close-form-button {
          margin-top: 10px;
          width: auto;
          padding: 10px 20px;
          border-radius: 8px;
        }

        .close-button:hover,
        .close-form-button:hover {
          background-color: #ff3d3d;
        }

        .content {
          text-align: center;
          max-width: 400px;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .heading {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #ff6e6e;
        }

        .description {
          font-size: 16px;
          margin-bottom: 20px;
          color: #ddd;
        }

        .form-content {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 14px;
          margin-bottom: 5px;
          color: #ff6e6e;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: none;
          background-color: #333;
          color: white;
        }

        button {
          background-color: #ff6347;
          color: white;
          padding: 12px 20px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s ease-in-out;
        }

        button:hover {
          background-color: #ff4500;
        }
      `}</style>
    </div>
  );
};

export default Curtain;
