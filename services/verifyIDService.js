import fetch from "node-fetch";
import dotenv from "dotenv";
import uuid from "uuid";



dotenv.config();

export default class VerifyIDService {
 async verifyNIN(idNumber) {
    const body = {
      id_number: idNumber,
      sec_key: process.env.SEC_KEY,
      timestamp: process.env.TIMESTAMP,
      country: "NG",
      id_type: "NIN",
      partner_id: process.env.PARTNER_ID,
      partner_params: {
        user_id: uuid.v4(),
        job_id: uuid.v4(),
        job_type: 5,
      },
    };
    try {
      const response = await fetch(process.env.SMILE_ID_ENDPOINT, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data.ResultCode);
      if(data.ResultCode == "1012"){
        const idPhoto = data.FullData.photo;
        if(idPhoto){
          return idPhoto
        }
        else{
          return data.Photo
        }
      }
      else {
        return data;
      }
    } catch (error) {
      return error;
    }
  }

  async verifyBVN(idNumber, firstname, lastname) {
    const body = {
      id_number: idNumber,
      first_name: firstname,
      last_name: lastname,
      sec_key: process.env.SEC_KEY,
      timestamp: process.env.TIMESTAMP,
      country: "NG",
      id_type: "BVN",
      partner_id: process.env.PARTNER_ID,
      partner_params: {
        user_id: uuid.v4(),
        job_id: uuid.v4(),
        job_type: 5,
      },
    };
    try {
      const response = await fetch(process.env.SMILE_ID_ENDPOINT, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data.ResultCode);
      if(data.ResultCode == "1012"){
        const idPhoto = data.FullData.photo;
        if(idPhoto){
          return idPhoto
        }
        else{
          return data.Photo
        }
      }
      else {
        return data;
      }
    } catch (error) {
      return error;
    }
  }

}
