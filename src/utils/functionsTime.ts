// Function to get formatted date and time
function getFormattedDateTime() {
  const currentDateTime = new Date();
  const dayFormatter = new Intl.DateTimeFormat("ar", {
    weekday: "long", // Display the full name of the weekday
  });

  const dateFormatter = new Intl.DateTimeFormat("ar", {
    month: "long", // Display the full name of the month
    day: "numeric", // Display the day of the month
  });

  const timeFormatter = new Intl.DateTimeFormat("ar", {
    hour: "numeric", // Display the hour (24-hour format)
    minute: "numeric", // Display the minute
    second: "numeric", // Display the second
    timeZone: "Africa/Cairo", // Set the time zone to Egypt's time zone
  });

  const time = timeFormatter.format(currentDateTime);
  const day = dayFormatter.format(currentDateTime);
  const date = dateFormatter.format(currentDateTime);
  return { day, date, time };
}

const translateKey = (key: string): string => {
  switch (key) {
    case "Fajr":
      return "الفجر";
    case "Sunrise":
      return "شروق الشمس";
    case "Sunset":
      return "غروب الشمس";
    case "Dhuhr":
      return "الظهر";
    case "Asr":
      return "العصر";
    case "Maghrib":
      return "المغرب";
    case "Isha":
      return "العشاء";
    case "Imsak":
      return "الامساك";
    case "Midnight":
      return "منتصف الليل";
    case "Firstthird":
      return "الثلت الاول";
    case "Lastthird":
      return "الثلت الاخير";
    default:
      return key;
  }
};

const translateHadithKey = (key: string): string => {
  switch (key) {
    case "HR. Abu Daud":
      return "الامام ابو داود";
    case "HR. Ahmad":
      return " الامام أحمد ابن حنبل";
    case "HR. Bukhari":
      return " الامام البخاري";
    case "HR. Darimi":
      return " الامام الدرايمي";
    case "HR. Ibnu Majah":
      return " الامام ابن ماجه";
    case "HR. Malik":
      return " الامام مالك";
    case "HR. Muslim":
      return " الامام مسلم";
    case "HR. Nasai":
      return " الامام انس";
    case "HR. Tirmidzi":
      return " الامام الترميذي";
    default:
      return key;
  }
};
export { getFormattedDateTime, translateKey, translateHadithKey };
