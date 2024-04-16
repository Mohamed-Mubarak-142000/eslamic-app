import { Col, Container, Form, Row } from "react-bootstrap";
import Lottie from "lottie-react";
import registerAnimation from "@assets/lottiFiles/registerAnimation.json";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TinputsForm,
  registerSchema,
} from "@components/validations/RegisterSchema";
import InputValidation from "@components/validations/InputValidation";
const FormStyle = styled(motion(Form))`
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.block};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
`;
const ContentAnimation = styled(motion.div)`
  @media (max-width: 767px) {
    display: none;
  }
`;
const Register = () => {
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
        <Col md={6} sm={12}>
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
              إنشاء حساب جديد
            </h1>

            <InputValidation
              label="الاسم الاول"
              error={errors.fName?.message}
              register={register}
              name="fName"
              type="text"
            />

            <InputValidation
              label="الاسم الثاني"
              error={errors.lName?.message}
              register={register}
              name="lName"
              type="text"
            />

            <InputValidation
              label=" البريد الالكتروني"
              error={errors.email?.message}
              register={register}
              name="email"
              type="email"
            />

            <InputValidation
              label=" كلمة السر "
              error={errors.password?.message}
              register={register}
              name="password"
              type="password"
            />

            <InputValidation
              label="تأكيد كلمة السر "
              error={errors.confirmPassword?.message}
              register={register}
              name="confirmPassword"
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
                to={"/login"}
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
                لدي حساب مسجل في الموقع <Link to={"/login"}>تسجيل الدخول</Link>
              </span>
            </div>
          </FormStyle>
        </Col>{" "}
        <Col md={6} sm={12}>
          <ContentAnimation
            initial={{ opacity: 0, y: "-5rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Lottie animationData={registerAnimation} loop={true} />
          </ContentAnimation>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
