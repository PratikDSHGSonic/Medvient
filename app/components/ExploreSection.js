


"use client"
import { useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  .desktop-view {
    display: block;
  }
  .mobile-view {
    display: none;
  }

  @media (max-width: 768px) {
    .desktop-view {
      display: none;
    }
    .mobile-view {
      display: block;
    }
  }
`;

const Section = styled.section`
  display: flex;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  padding: 8rem 12rem;
  gap: 8rem;

  @media (max-width: 1024px) {
    padding: 4rem 6rem;
    gap: 4rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 4rem 2rem;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;

const MobileSection = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-top: 4rem;

  @media (max-width: 768px) {
    padding-top: 2rem;
    gap: 0;
  }
`;

const MainTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${props => props['data-active'] ? '#007bff' : '#fff'};
  font-size: 1.5rem;
  text-align: left;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.3s ease;
  letter-spacing: 2px;
  font-weight: ${props => props['data-active'] ? '400' : '600'};
  
  &:hover {
    color: ${props => !props['data-active'] && '#007bff'};
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    color: #007bff;
    font-weight: 600;
  }
`;

const RightSection = styled.div`
  flex: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 4rem;
  border: 1px solid white;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    border: none;
    padding: 0;
    background: none;
    position: relative;
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: 45%;
  padding-right: 2rem;

  @media (max-width: 768px) {
    max-width: 100%;
    padding-right: 0;
    order: 1;
  }
`;

const ContentTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 3rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
`;

const VideoWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    order: 2;
    position: relative;
  }
`;

const LearnMoreButton = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 0.5rem 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    color: #000;
  }

  @media (max-width: 768px) {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 2;
    padding: 0.5rem 2rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1.5rem;
  }
`;

const Video = styled.video`
  max-width: 100%;
  height: auto;
`;

const ExploreSection = () => {
  const [activeSection, setActiveSection] = useState('providers');

  const sections = [
    {
      id: 'providers',
      title: 'PROVIDERS',
      content: "We can help physicians make more informed treatment decisions.",
      videoUrl: "https://www.tempus.com/wp-content/uploads/2021/11/PROVIDERS_TO-REPORT_LOOP_quickest_compressed.mp4"
    },
    {
      id: 'life-sciences',
      title: 'LIFE SCIENCES',
      content: "We can assist pharmaceutical and biotech companies with better drug development.",
      videoUrl: "https://www.tempus.com/wp-content/uploads/2021/11/LIFE-SCIENCES_LENS_LOOP_quickest_compressed.mp4"
    },
    {
      id: 'patients',
      title: 'PATIENTS',
      content: "We can help patients find their own unique and optimal therapy options.",
      videoUrl: "https://www.tempus.com/wp-content/uploads/2021/11/PATIENTS_MOBILE_LOOP_quickest_compressed.mp4"
    }
  ];

  const DesktopView = () => (
    <Section>
      <LeftSection>
        <MainTitle>Explore Tempus</MainTitle>
        <Navigation>
          {sections.map(section => (
            <NavButton
              key={section.id}
              data-active={activeSection === section.id}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </NavButton>
          ))}
        </Navigation>
      </LeftSection>

      <RightSection>
        <Content>
          <ContentTitle>
            {sections.find(section => section.id === activeSection).content}
          </ContentTitle>
          <LearnMoreButton>LEARN MORE</LearnMoreButton>
        </Content>
        <VideoWrapper>
          <Video
            autoPlay
            loop
            muted
            playsInline
            key={sections.find(section => section.id === activeSection).videoUrl}
          >
            <source
              src={sections.find(section => section.id === activeSection).videoUrl}
              type="video/mp4"
            />
          </Video>
        </VideoWrapper>
      </RightSection>
    </Section>
  );

  const MobileView = () => (
    <Section>
      <MainTitle>Explore Medvient</MainTitle>
      {sections.map(section => (
        <MobileSection key={section.id}>
          <NavButton data-active={true}>
            {section.title}
          </NavButton>
          <RightSection>
            <Content>
              <ContentTitle>{section.content}</ContentTitle>
            </Content>
            <VideoWrapper>
              <Video autoPlay loop muted playsInline>
                <source src={section.videoUrl} type="video/mp4" />
              </Video>
              <LearnMoreButton>LEARN MORE</LearnMoreButton>
            </VideoWrapper>
          </RightSection>
        </MobileSection>
      ))}
    </Section>
  );

  return (
    <MainContainer>
      <div className="desktop-view">
        <DesktopView />
      </div>
      <div className="mobile-view">
        <MobileView />
      </div>
    </MainContainer>
  );
};

export default ExploreSection;




// "use client";
// import { useState } from "react";
// import styles from "./ExploreSection.module.css"; // Import the CSS file

// const ExploreSection = () => {
//   const [activeSection, setActiveSection] = useState("providers");

//   const sections = [
//     {
//       id: "providers",
//       title: "PROVIDERS",
//       content: "We can help physicians make more informed treatment decisions.",
//       videoUrl:
//         "https://www.tempus.com/wp-content/uploads/2021/11/PROVIDERS_TO-REPORT_LOOP_quickest_compressed.mp4",
//     },
//     {
//       id: "life-sciences",
//       title: "LIFE SCIENCES",
//       content:
//         "We can assist pharmaceutical and biotech companies with better drug development.",
//       videoUrl:
//         "https://www.tempus.com/wp-content/uploads/2021/11/LIFE-SCIENCES_LENS_LOOP_quickest_compressed.mp4",
//     },
//     {
//       id: "patients",
//       title: "PATIENTS",
//       content: "We can help patients find their own unique and optimal therapy options.",
//       videoUrl:
//         "https://www.tempus.com/wp-content/uploads/2021/11/PATIENTS_MOBILE_LOOP_quickest_compressed.mp4",
//     },
//   ];

//   const DesktopView = () => (
//     <div className={styles.Section}>
//       <div className={styles.LeftSection}>
//         <h2 className={styles.MainTitle}>Explore Tempus</h2>
//         <nav className={styles.Navigation}>
//           {sections.map((section) => (
//             <button
//               key={section.id}
//               className={`${styles.NavButton} ${activeSection === section.id ? styles.active : ""}`}
//               onClick={() => setActiveSection(section.id)}
//             >
//               {section.title}
//             </button>
//           ))}
//         </nav>
//       </div>

//       <div className={styles.RightSection}>
//         <div className={styles.Content}>
//           <h3 className={styles.ContentTitle}>
//             {sections.find((section) => section.id === activeSection).content}
//           </h3>
//           <button className={styles.LearnMoreButton}>LEARN MORE</button>
//         </div>
//         <div className={styles.VideoWrapper}>
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             key={sections.find((section) => section.id === activeSection).videoUrl}
//             className={styles.Video}
//           >
//             <source
//               src={sections.find((section) => section.id === activeSection).videoUrl}
//               type="video/mp4"
//             />
//           </video>
//         </div>
//       </div>
//     </div>
//   );

//   const MobileView = () => (
//     <div className={styles.Section}>
//       <h2 className={styles.MainTitle}>Explore Medvient</h2>
//       {sections.map((section) => (
//         <div key={section.id} className={styles.MobileSection}>
//           <button className={styles.NavButton}>{section.title}</button>
//           <div className={styles.RightSection}>
//             <div className={styles.Content}>
//               <h3 className={styles.ContentTitle}>{section.content}</h3>
//             </div>
//             <div className={styles.VideoWrapper}>
//               <video autoPlay loop muted playsInline className={styles.Video}>
//                 <source src={section.videoUrl} type="video/mp4" />
//               </video>
//               <button className={styles.LearnMoreButton}>LEARN MORE</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className={styles.MainContainer}>
//       <div className={styles["desktop-view"]}>
//         <DesktopView />
//       </div>
//       <div className={styles["mobile-view"]}>
//         <MobileView />
//       </div>
//     </div>
//   );
// };

// export default ExploreSection;
