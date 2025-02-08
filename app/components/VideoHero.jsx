"use client"
import { useState, useRef } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: black;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center; // This centers the content vertically
`;

const VideoSection = styled.div`
  position: relative;
  width: 100%;
  margin: clamp(10px, 2vw, 20px) 0;

  /* Default height for mobile screens */
  height: 40vh;

  /* Media queries for different screen sizes */
  @media (min-width: 640px) {
    /* sm */
    height: 50vh;
  }

  @media (min-width: 768px) {
    /* md */
    height: 60vh;
  }

  @media (min-width: 1024px) {
    /* lg */
    height: 80vh;
  }

  @media (min-width: 1280px) {
    /* xl */
    height: 80vh;
  }

  @media (min-width: 1536px) {
    /* 2xl */
    height: 80vh;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end; // Aligns items to bottom
  justify-content: flex-start; // Aligns items to left

  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const WatchButton = styled.button`
  background-color: white;
  border: none;
  padding: clamp(10px, 2vw, 12px) clamp(16px, 3vw, 24px);
  font-size: clamp(12px, 2vw, 14px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  margin-bottom: 20px; // Add bottom margin
  margin-left: 20px; // Default margin for mobile

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  @media (min-width: 768px) {
    /* md */
    margin-left: 40px;
  }

  @media (min-width: 1024px) {
    /* lg */
    margin-left: 60px;
  }

  @media (min-width: 1280px) {
    /* xl */
    margin-left: 80px;
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 300px;
  }
`;

const VideoHero = () => {
  const videoRef = useRef(null);

  return (
    <PageContainer>
      <VideoSection>
        <Video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://www.tempus.com/wp-content/uploads/2021/11/Anthem-Previewcompressed.mp4"
            type="video/mp4"
          />
        </Video>
        <Overlay>
          <WatchButton>
            WATCH OUR STORY
          </WatchButton>
        </Overlay>
      </VideoSection>
    </PageContainer>
  );
};

export default VideoHero;