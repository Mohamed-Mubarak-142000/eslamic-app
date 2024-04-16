import React from "react";
import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const SkeletonLive: React.FC = () => {
  const renderSkeleton = Array(4)
    .fill(0)
    .map((_, index) => {
      return (
        <Col lg={3} key={index}>
          <ContentLoader
            speed={2}
            width={500}
            height={500}
            viewBox="0 0 500 500"
            backgroundColor="#e6e6e6"
            foregroundColor="#ffffff"
          >
            <rect x="32" y="108" rx="0" ry="0" width="332" height="171" />
          </ContentLoader>
        </Col>
      );
    });
  return <Row>{renderSkeleton}</Row>;
};

export default SkeletonLive;
