import Lottie from "lottie-react";
import lottiLoading from "@assets/lottiFiles/Loading.json";
const LoadingPage = () => {
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "300px",
          width: "300px",
          gap: "10px",
          borderRadius: "50%",
        }}
      >
        <Lottie animationData={lottiLoading} />
      </div>
      <h1 style={{ fontFamily: "Andalus", fontSize: "5rem" }}>المؤمن</h1>
    </section>
  );
};

export default LoadingPage;
