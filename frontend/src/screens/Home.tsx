import CategoryFilter from "../components/categoryFilter";
import Booklist from "../components/booklist";
import Header from "../components/Header";
import { useState } from "react";

function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); 

  return (
    <>
      <div className="container">
        <div className="row">
          <Header />
          <div className="col-md-3">
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
          </div>
          <div className="col-md-9">
            <Booklist selectedCategories={selectedCategories}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

