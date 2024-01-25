// import axios from "axios";

// export function SignUpApi(body){
//     return axios.post('/api/v1/users/add', body);
// }
import axios from "axios";

export async function SignUpApi(body) {
  var result = await axios.post("/api/v1/users/add", body).catch((error) => {
    var errorsResponse = {};
    var businessError = {};

    if (error.response && error.response?.data) {
      if (error.response.status === 400) {
        // ValidationProblemDetails için 400 durum kodu
        if (error.response.data.validationErrors) {
          Object.keys(error.response.data.validationErrors).forEach((key) => {
            errorsResponse[key] = error.response.data.validationErrors[key];
          });
          // console.log(" hata denemesi ", errorsResponse);
          return errorsResponse;
        }
      } else {
      }
      throw error;
    } else {
      throw error; // Diğer hataları fırlat
    }
  });
  // console.log("deneme");
  return result;
}

//   const JsonRenderer = ({ jsonData }) => {
//     return (
//       <div>
//         {Object.entries(jsonData).map(([key, value]) => (
//           <div key={key}>
//             <strong>{key}:</strong> {value}
//           </div>
//         ))}
//       </div>
//     );
//   };
