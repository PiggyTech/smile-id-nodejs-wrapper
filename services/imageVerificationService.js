import fetch from "node-fetch";
import dotenv from "dotenv";
import uuid from "uuid";
import SIDCore from 'smile-identity-core';

import VerifyIDService from "./verifyIDService";

dotenv.config();
const SIDWebAPI = SIDCore.WebApi;

export default class ImageVerificationService {
  constructor() {
    this.verifyIdService = new VerifyIDService();
  }

  verifyImage(request) {
    const { images, id_number, id_type } = request;
    return new Promise((resolve, reject) => {
      if(id_type == "NIN"){
        this.verifyIdService.verifyNIN(id_number).then(response => {
          if (response != "Not Available") {
            resolve(this.verifySelfieJob(images,response))
            }
       else {
         resolve(response)
       }
       })
       .catch(err => {
         reject(err)
       })
      }
      if(id_type == "BVN"){
        this.verifyIdService.verifyBVN(id_number).then(response => {
          if (response != "Not Available") {
            resolve(this.verifySelfieJob(images,response))
            }
       else {
         resolve(response)
       }
       })
       .catch(err => {
         reject(err)
       })
      }
      if(!id_type){
        reject("Specify ID Type");
      }
    })
  }

  async verifySelfieJob(selfies, idImage) {
    try {
      const { PARTNER_ID, API_KEY, SID_SERVER } = process.env;
      const connection = new SIDWebAPI(
        PARTNER_ID,
        "",
        API_KEY,
        SID_SERVER
      );

      const partner_params_from_server = {
        user_id: `user-${uuid.v4()}`,
        job_id: `job-id-${uuid.v4()}`,
        job_type: 1, // job_type is the simplest job we have which enrolls a user using their selfie
      };

      const options = {
        return_job_status: true,
      };

      const id_card_image_detail = {
        image_type_id: 3,
        image: idImage
      }
  

      const imageDetails = [
        selfies[0], id_card_image_detail
      ]

      const partner_params = partner_params_from_server;
      const result = await connection.submit_job(
        partner_params,
        imageDetails,
        {},
        options
      );
      return result;
    } catch (e) {
      console.error(e);
      return e ;
    }

  }
}
