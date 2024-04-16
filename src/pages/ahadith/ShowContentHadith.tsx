import { useGetAllBooksOfRangeQuery } from "@app/apis/ahadith/apiSliceHadith";
import Loading from "@common/Loading";
import OneHadith from "./OneHadith";

interface Person {
  person: string;
}

const ShowContentHadith: React.FC<Person> = ({ person }) => {
  const { data, isLoading, error, isError } = useGetAllBooksOfRangeQuery({
    book: `${person}`,
    start: 1,
    end: 20,
  });

  const nameList = [
    {
      id: 1,
      nameEng: "abu-daud",
      nameArb: "ابو داود",
    },
    {
      id: 2,
      nameEng: " ahmad",
      nameArb: " أحمد ابن حنبل",
    },

    {
      id: 3,
      nameEng: "bukhari",
      nameArb: " البخاري",
    },
    {
      id: 4,
      nameEng: "darimi",
      nameArb: " داريمي",
    },
    {
      id: 5,
      nameEng: "ibnu-majah ",
      nameArb: "  ابن ماجه ",
    },
    {
      id: 6,
      nameEng: "malik ",
      nameArb: "  مالك  ",
    },
    {
      id: 7,
      nameEng: " muslim",
      nameArb: "  مسلم ",
    },
    {
      id: 8,
      nameEng: "nasai ",
      nameArb: "  انس  ",
    },
    {
      id: 9,
      nameEng: "tirmidzi ",
      nameArb: "الترميذي ",
    },
  ];
  const arabicName = nameList
    .filter((name) => name.nameEng.trim().toLowerCase() === person)
    .map((name) => name.nameArb);

  console.log("first", person);
  return (
    <>
      {isLoading && (
        <Loading
          error={error as string}
          isError={isError}
          isLoading={isLoading}
          type="hadith"
        />
      )}{" "}
      {arabicName.length > 0 && (
        <h2
          className="bg-primary"
          style={{
            padding: "5px 10px",
            borderRadius: "10px 10px 0 0",
            textAlign: "center",
          }}
        >
          {" "}
          رواه:{arabicName[0]}
        </h2>
      )}
      {data?.data.hadiths?.map((hadith, i) => {
        return <OneHadith key={i} {...hadith} />;
      })}
      {!isLoading && (!data || !data.data.hadiths) && (
        <p>No data found for {person}</p>
      )}
    </>
  );
};

export default ShowContentHadith;
