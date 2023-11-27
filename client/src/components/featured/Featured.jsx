import useFetch from "../../hooks/useFetch.js";
import "./featured.css";

const Featured = () => {

  const {data, loading,error} = useFetch("/api/hotels/countByCity?cities=hanoi,danang,hochiminh")

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://jackytravel.com/wp-content/uploads/2018/09/hanoi-old-quarter-1.jpg-1-1140x530.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hanoi</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://www.asiapropertyawards.com/wp-content/uploads/2020/09/shutterstock_1124340731.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Danang</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://lp-cms-production.imgix.net/2021-01/shutterstockRF_718619590.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ho Chi Minh</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
