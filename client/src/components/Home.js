import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allposts", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setData(result.posts)
        })
    
  }, []);
  return <div>
      <div>
          {data.map((item) => {
              return (
                  <div key={item._id}>
                      <div>
                      {item.postedBy.name}
                          </div>
                          <div>
                     <img src={item.photo} alt="photo" />
                          </div>
                          <div>
                      {item.body}
                          </div>
                      </div>
              )
          })}
      </div>
  </div>;
}
