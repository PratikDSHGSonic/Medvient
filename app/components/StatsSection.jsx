// StatsSection.jsx

"use client"
import React from 'react';

const stats = [
  {
    number: "~65%",
    description: "of all Academic Medical Centers in the US are connected to Tempus"
  },
  {
    number: "50%+",
    description: "of oncologists in the US connected to Tempus through sequencing, clinical trial matching, and research-enabled partnerships"
  },
  {
    number: "95%",
    description: "of the top 20 pharma oncology companies partner with Tempus"
  },
  {
    number: "200+",
    description: "biopharma partnerships"
  },
  {
    number: "~8,000,000",
    description: "de-identified research records to power scientific discovery to improve patient outcomes"
  },
  {
    number: "30,000+",
    description: "patients have been identified for potential enrollment into clinical trials in our network"
  },
  {
    number: "250+",
    description: "petabytes of data"
  }
];

const StatsSection = () => {
  return (
    <div className="relative w-full flex justify-center items-center">
      <style jsx>{`
        .outer-container {
          background-color: black;
          color: white;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
           padding: 4rem 0;
          
        }
        
        .inner-container {
          width: 70%;
          display: flex;
          flex-direction: row;
        }
        
        .left-section {
          width: 40%;
          padding: 2rem;
          display: flex;
          align-items: flex-start; 
        }
        
        .right-section {
          width: 60%;
          padding: 2rem;
          border-left: 1px solid #333;
        }
        
        .heading {
          font-size: 18px;
          font-weight: bold;
          line-height: 1.4;

        }
        
        .stat-item {
          margin-bottom: 2rem;
          transition: transform 0.3s ease;
        }
        
        .stat-item:hover {
          transform: translateX(8px);
        }
        
        .stat-number {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .stat-description {
          font-size: 14px;
          color: #e5e5e5;
          line-height: 1.4;
        }
        
        @media (max-width: 1200px) {
          .inner-container {
            width: 90%;
          }
        }
        
        @media (max-width: 768px) {
          .inner-container {
            width: 95%;
            flex-direction: column;
          }
          
          .left-section,
          .right-section {
            width: 100%;
            padding: 1.5rem;
          }
          
          .right-section {
            border-left: none;
            border-top: 1px solid #333;
          }
          
          .heading {
            font-size: 16px;
          }
          
          .stat-number {
            font-size: 18px;
          }
          
          .stat-description {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="outer-container">
        <div className="inner-container">
          <div className="left-section">
            <h2 className="heading">
              Improving patient care through high quality testing, clinical trial matching, and deep research data that powers scientific discovery
            </h2>
          </div>

          <div className="right-section">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;