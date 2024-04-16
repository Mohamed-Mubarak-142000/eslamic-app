import { Col, Container, Form, Row } from "react-bootstrap";
import Lottie from "lottie-react";
import loginAnimation from "@assets/lottiFiles/LoginAnimation.json";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InputValidation from "@components/validations/InputValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TinputsForm,
  registerSchema,
} from "@components/validations/RegisterSchema";

const FormStyle = styled(motion(Form))`
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.block};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const ContentAnimation = styled(motion.div)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TinputsForm>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });
  const submitForm: SubmitHandler<TinputsForm> = () => {};

  return (
    <Container className="mt-3">
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={6}>
          <ContentAnimation
            initial={{ opacity: 0, y: "-5rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Lottie animationData={loginAnimation} loop={true} />
          </ContentAnimation>
        </Col>
        <Col md={6}>
          <FormStyle
            onSubmit={handleSubmit(submitForm)}
            initial={{ opacity: 0, y: "5rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              style={{
                textAlign: "center",
                margin: "1rem 0",
                fontWeight: "800",
              }}
            >
              تسجيل الدخول
            </h1>

            <InputValidation
              label=" البريد الالكتروني"
              error={errors.email?.message}
              register={register}
              name="email"
              type="email"
            />
            <InputValidation
              label="كلمة السر"
              error={errors.password?.message}
              register={register}
              name="password"
              type="password"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Link
                to={"/"}
                type="submit"
                className="w-50 fs-5 bg-primary text-light p-1 "
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  borderRadius: "5px",
                }}
              >
                تسجيل
              </Link>

              <span>
                ليس لدي حساب مسجل{" "}
                <Link to={"/register"}> انشاء حساب جديد </Link>
              </span>
            </div>
          </FormStyle>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
