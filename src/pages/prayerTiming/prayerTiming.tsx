import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { useGetCityAndCountryQuery } from "@app/apis/prayerTiming/prayerTiming";
import HeadingBackImage from "@common/HeadingBackImage";
import ImageBackground from "@assets/cars1.jpg";
import styled from "styled-components";
import { Card, Col, Container, Row } from "react-bootstrap";
import { translateKey } from "@utils/functionsTime";
interface PrayerTimingProps {}

const CardStyle = styled(Card)`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.block};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.colors.text};

  select {
    border: 1px solid;
    padding: 5px;
    color: ${(props) => props.theme.colors.secondary};
    background-color: ${(props) => props.theme.colors.background};
    border-color: ${(props) => props.theme.colors.border};
    border-radius: 7px;
  }
  h2 {
    text-align: center;
    font-weight: 700;
  }
`;

const OneDay = styled(Col)`
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.block};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.colors.text};

  h5 {
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.primary};
    padding: 5px;
    border-radius: 10px 10px 0 0;
    text-align: center;
    font-weight: 700;
  }
`;

const PrayerTiming: React.FC<PrayerTimingProps> = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Egypt");
  const [selectedCity, setSelectedCity] = useState<string>("Cairo");
  const { data, isLoading, isError } = useGetCityAndCountryQuery({
    city: selectedCity,
    country: selectedCountry,
  });

  const handleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedCountry(e.target.value);
    setSelectedCity(""); // Reset city when country changes
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCity(e.target.value);
  };

  const countries = Country.getAllCountries();

  return (
    <>
      <HeadingBackImage
        image={ImageBackground}
        text={
          "اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ ۗ وَاللَّهُ يَعْلَمُ مَا تَصْنَعُونَ"
        }
      />
      <Container className="mt-2">
        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <CardStyle>
              <h2>توقيتات الصلاة طوال الشهر</h2>
              <label htmlFor="country">اختر الدولة:</label>
              <select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                <option value="">مصر</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>

              <label htmlFor="city">اختر المدينة:</label>
              <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">القاهرة</option>
                {selectedCountry &&
                  State.getStatesOfCountry(selectedCountry).map((state) => (
                    <optgroup key={state.isoCode} label={state.name}>
                      {City.getCitiesOfState(
                        selectedCountry,
                        state.isoCode
                      ).map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
              </select>
            </CardStyle>
          </Col>
        </Row>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-danger">
            Error fetching data. Please try again later.
          </p>
        ) : selectedCountry && selectedCity && data ? (
          <Row className="g-2 mt-3">
            {data.data?.map((prayer: any, index: number) => (
              <Col lg={3} key={index}>
                <OneDay>
                  <h5>التاريخ: {prayer.date?.gregorian?.date}</h5>
                  <Card.Body className="p-2">
                    {Object.entries(prayer.timings).map(([key, value]) => (
                      <h6 key={key} className="mb-2">
                        <strong>{translateKey(key)}:</strong> {String(value)}
                      </h6>
                    ))}
                  </Card.Body>
                </OneDay>
              </Col>
            ))}
          </Row>
        ) : (
          <p>Please select a country and city to view prayer timings.</p>
        )}
      </Container>
    </>
  );
};

export default PrayerTiming;
