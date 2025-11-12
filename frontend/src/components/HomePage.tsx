import Proteachers from "./Proteachers";
import StudyField from "./StudyField";
import StudentsReview from "./StudentsReview";
import Banner from "./Banner";
import Menufooter from "./Menufooter";

function HomePage() {
  return (
    <div>
      <Banner/>
      <Menufooter/>
      <Proteachers />
      <StudyField />
      <StudentsReview />
    </div>
  );
}

export default HomePage;
